import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const rootDir = resolve(__dirname, '..');
const distDir = resolve(rootDir, 'dist');

const LOCALES = ['en', 'es', 'pt', 'de', 'fr', 'ja', 'zh-cn', 'ru'];
const NON_DEFAULT_LOCALES = LOCALES.filter((l) => l !== 'en');
const HUB_SLUGS = ['video-tools', 'audio-tools', 'image-tools'];
const TOOL_SLUGS = [
  'video-to-mp3',
  'webm-to-mp4',
  'video-compressor',
  'video-trimmer',
  'audio-joiner',
  'mp3-cutter',
  'wav-to-mp3',
  'm4a-to-mp3',
  'image-compressor',
  'webp-to-jpg',
  'heic-to-jpg',
  'image-resizer',
];

function decodeHtmlEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function walkFiles(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      walkFiles(full, out);
    } else {
      out.push(full);
    }
  }
  return out;
}

function htmlPathToRoute(filePath) {
  let rel = relative(distDir, filePath).replace(/\\/g, '/');
  if (rel === 'index.html') return '/';
  rel = rel.replace(/\/index\.html$/, '').replace(/\.html$/, '');
  return `/${rel}`;
}

function classifyRoute(route) {
  if (route === '/' || NON_DEFAULT_LOCALES.map((l) => `/${l}`).includes(route)) {
    return { kind: 'home', locale: route === '/' ? 'en' : route.slice(1), slug: '' };
  }
  const parts = route.slice(1).split('/');
  const hasLocalePrefix = NON_DEFAULT_LOCALES.includes(parts[0]);
  const locale = hasLocalePrefix ? parts[0] : 'en';
  const slug = hasLocalePrefix ? parts.slice(1).join('/') : parts.join('/');

  if (HUB_SLUGS.includes(slug)) return { kind: 'category', locale, slug };
  if (slug === 'privacy') return { kind: 'privacy', locale, slug };
  if (TOOL_SLUGS.includes(slug)) return { kind: 'tool', locale, slug };
  return { kind: 'other', locale, slug };
}

function getMetaContent(html, attrName, attrValue) {
  const re = new RegExp(
    `<meta\\b[^>]*\\b${attrName}=(?:"${attrValue}"|'${attrValue}')[^>]*\\bcontent=(?:"([^"]*)"|'([^']*)')[^>]*>|<meta\\b[^>]*\\bcontent=(?:"([^"]*)"|'([^']*)')[^>]*\\b${attrName}=(?:"${attrValue}"|'${attrValue}')[^>]*>`,
    'i'
  );
  const m = html.match(re);
  if (!m) return null;
  return decodeHtmlEntities(m[1] ?? m[2] ?? m[3] ?? m[4] ?? '');
}

const errors = [];
const warnings = [];
const stats = {
  totalPages: 0,
  titleMin: Infinity,
  titleMax: 0,
  descMin: Infinity,
  descMax: 0,
  toolPages: 0,
  hubPages: 0,
  homePages: 0,
  privacyPages: 0,
  sitemapUrls: 0,
  initialIslandBundlesWithFfmpeg: 0,
};

if (!existsSync(distDir)) {
  console.error('ERROR: dist/ directory not found. Run "npm run build" first.');
  process.exit(1);
}

const allFiles = walkFiles(distDir);
const htmlFiles = allFiles.filter((f) => extname(f) === '.html');
stats.totalPages = htmlFiles.length;

const seenTitles = new Map();
const seenDescriptions = new Map();
const seenCanonicals = new Set();
const aboutParagraphsByLocale = new Map();

for (const file of htmlFiles) {
  const route = htmlPathToRoute(file);
  const info = classifyRoute(route);
  const html = readFileSync(file, 'utf-8');
  const expectedCanonical = `https://omecy.com${route}`;

  if (info.kind === 'home') stats.homePages++;
  else if (info.kind === 'category') stats.hubPages++;
  else if (info.kind === 'tool') stats.toolPages++;
  else if (info.kind === 'privacy') stats.privacyPages++;

  // 1. Title & Description strict length + uniqueness
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? decodeHtmlEntities(titleMatch[1].trim()) : '';
  if (!title) {
    errors.push(`[META] Missing <title> on ${route}`);
  } else {
    stats.titleMin = Math.min(stats.titleMin, title.length);
    stats.titleMax = Math.max(stats.titleMax, title.length);
    if (title.length < 50 || title.length > 60) {
      errors.push(`[META] Title length ${title.length} (must be 50–60) on ${route}: "${title}"`);
    }
    if (seenTitles.has(title)) {
      errors.push(`[META] Duplicate <title> on ${route} and ${seenTitles.get(title)}: "${title}"`);
    } else {
      seenTitles.set(title, route);
    }
  }

  const desc = getMetaContent(html, 'name', 'description') ?? '';
  if (!desc) {
    errors.push(`[META] Missing meta description on ${route}`);
  } else {
    stats.descMin = Math.min(stats.descMin, desc.length);
    stats.descMax = Math.max(stats.descMax, desc.length);
    if (desc.length < 130 || desc.length > 155) {
      errors.push(`[META] Description length ${desc.length} (must be 130–155) on ${route}: "${desc}"`);
    }
    if (seenDescriptions.has(desc)) {
      errors.push(`[META] Duplicate meta description on ${route} and ${seenDescriptions.get(desc)}`);
    } else {
      seenDescriptions.set(desc, route);
    }
  }

  // 2. Open Graph & Twitter Cards
  for (const prop of ['og:title', 'og:description', 'og:url', 'og:type', 'og:site_name', 'og:locale', 'og:image']) {
    const val = getMetaContent(html, 'property', prop);
    if (!val) errors.push(`[OG] Missing ${prop} on ${route}`);
  }
  const twCard = getMetaContent(html, 'name', 'twitter:card');
  if (twCard !== 'summary_large_image') {
    errors.push(`[TWITTER] Expected twitter:card="summary_large_image" on ${route}, got "${twCard}"`);
  }

  // Canonical & Hreflang
  const canonMatch = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i);
  const canonical = canonMatch ? canonMatch[1] : null;
  if (canonical !== expectedCanonical) {
    errors.push(`[CANONICAL] Expected "${expectedCanonical}" on ${route}, got "${canonical}"`);
  } else {
    seenCanonicals.add(canonical);
  }

  const hreflangMatches = [...html.matchAll(/<link\b[^>]*rel=["']alternate["'][^>]*hreflang=["']([^"']+)["'][^>]*href=["']([^"']+)["'][^>]*>/gi)];
  if (hreflangMatches.length !== 9) {
    errors.push(`[HREFLANG] Expected 9 hreflang tags (8 locales + x-default) on ${route}, found ${hreflangMatches.length}`);
  }
  const hasXDefault = hreflangMatches.some((m) => m[1] === 'x-default' && m[2] === `https://omecy.com${info.slug ? '/' + info.slug : '/'}`);
  if (!hasXDefault) {
    errors.push(`[HREFLANG] Missing or mismatched x-default on ${route}`);
  }

  // 3. JSON-LD Schema Validation
  const jsonLdMatches = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const schemaTypes = [];
  for (const m of jsonLdMatches) {
    const raw = m[1].trim();
    if (/AggregateRating|"@type"\s*:\s*"Review"/i.test(raw)) {
      errors.push(`[SCHEMA] Prohibited AggregateRating/Review detected on ${route}`);
    }
    try {
      const parsed = JSON.parse(raw);
      schemaTypes.push(parsed['@type']);
      if (parsed['@type'] === 'WebApplication') {
        if (parsed.applicationCategory !== 'MultimediaApplication') {
          errors.push(`[SCHEMA] WebApplication applicationCategory mismatch on ${route}`);
        }
        if (parsed.offers?.price !== '0') {
          errors.push(`[SCHEMA] WebApplication free offer price='0' missing on ${route}`);
        }
      }
      if (parsed['@type'] === 'FAQPage') {
        const questions = parsed.mainEntity ?? [];
        if (questions.length < 4) {
          errors.push(`[SCHEMA] FAQPage should have >= 4 questions on ${route}, found ${questions.length}`);
        }
        const decodedHtml = decodeHtmlEntities(html);
        for (const q of questions) {
          if (!decodedHtml.includes(q.name)) {
            errors.push(`[SCHEMA] FAQPage question missing from visible HTML on ${route}: "${q.name}"`);
          }
        }
      }
    } catch (e) {
      errors.push(`[SCHEMA] Invalid JSON-LD syntax on ${route}: ${e.message}`);
    }
  }

  // 4. Breadcrumbs Rule
  const hasHtmlBreadcrumb = /<nav\b[^>]*aria-label=["'][^"']*["'][^>]*>\s*<ol\b/i.test(html);
  const hasSchemaBreadcrumb = schemaTypes.includes('BreadcrumbList');

  if (info.kind === 'home') {
    if (!schemaTypes.includes('WebSite') || !schemaTypes.includes('Organization')) {
      errors.push(`[SCHEMA] Homepage ${route} missing WebSite or Organization schema`);
    }
    if (hasHtmlBreadcrumb || hasSchemaBreadcrumb) {
      errors.push(`[BREADCRUMB] Homepage ${route} MUST NOT contain HTML or JSON-LD breadcrumbs`);
    }
  } else if (info.kind === 'category') {
    if (!schemaTypes.includes('CollectionPage') || !hasSchemaBreadcrumb) {
      errors.push(`[SCHEMA] Category hub ${route} missing CollectionPage or BreadcrumbList`);
    }
    if (!hasHtmlBreadcrumb) {
      errors.push(`[BREADCRUMB] Category hub ${route} missing visible HTML breadcrumb <nav><ol>`);
    }
  } else if (info.kind === 'tool') {
    if (!schemaTypes.includes('WebApplication') || !schemaTypes.includes('FAQPage') || !hasSchemaBreadcrumb) {
      errors.push(`[SCHEMA] Tool page ${route} missing WebApplication, FAQPage, or BreadcrumbList`);
    }
    if (!hasHtmlBreadcrumb) {
      errors.push(`[BREADCRUMB] Tool page ${route} missing visible HTML breadcrumb <nav><ol>`);
    }
  } else if (info.kind === 'privacy') {
    if (!hasHtmlBreadcrumb || !hasSchemaBreadcrumb) {
      errors.push(`[BREADCRUMB] Privacy page ${route} missing HTML or JSON-LD breadcrumb`);
    }
  }

  // 6. Semantic HTML, Heading Hierarchy & Accessibility
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;
  if (h1Count !== 1) {
    errors.push(`[A11Y] Expected exactly 1 <h1> on ${route}, found ${h1Count}`);
  }

  const headings = [...html.matchAll(/<h([1-6])\b/gi)].map((m) => Number(m[1]));
  for (let i = 1; i < headings.length; i++) {
    if (headings[i] > headings[i - 1] + 1) {
      errors.push(`[A11Y] Skipped heading level h${headings[i - 1]} -> h${headings[i]} on ${route}`);
      break;
    }
  }

  for (const tag of ['<header', '<nav', '<main', '<footer']) {
    if (!html.includes(tag)) {
      errors.push(`[SEMANTIC] Missing landmark ${tag}> on ${route}`);
    }
  }

  // Verify explicit width/height on static <img> tags and aria-labels on icon-only buttons
  for (const imgMatch of html.matchAll(/<img\b([^>]*)>/gi)) {
    const attrs = imgMatch[1];
    if (!/\bwidth=/.test(attrs) || !/\bheight=/.test(attrs)) {
      errors.push(`[PERF] <img> missing explicit width/height on ${route}`);
    }
  }
  for (const btnMatch of html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)) {
    const attrs = btnMatch[1];
    const innerText = btnMatch[2].replace(/<[^>]+>/g, '').trim();
    if (!innerText && !/\baria-label=/.test(attrs)) {
      errors.push(`[A11Y] Icon-only <button> missing aria-label on ${route}`);
    }
  }

  // Verify GTM & GA4 tags
  if (!html.includes('GTM-T95QDVFZ') || !html.includes('ns.html?id=GTM-T95QDVFZ')) {
    errors.push(`[ANALYTICS] Missing GTM-T95QDVFZ script or noscript iframe on ${route}`);
  }
  if (!html.includes('G-RHEMY5PF88')) {
    errors.push(`[ANALYTICS] Missing GA4 G-RHEMY5PF88 on ${route}`);
  }

  // Verify zero Astro island hydration on Homepage and Category Hubs
  if ((info.kind === 'home' || info.kind === 'category') && html.includes('<astro-island')) {
    errors.push(`[PERF] Static page ${route} should not hydrate JS islands`);
  }

  // Verify tool pages use lazy hydration (client:idle or client:visible), never client:load
  if (info.kind === 'tool' && html.includes('client="load"')) {
    errors.push(`[PERF] Tool page ${route} uses eager client:load instead of lazy hydration`);
  }

  // 8. Check uniqueness of About paragraphs across tools in same locale
  if (info.kind === 'tool') {
    const articleMatch = html.match(/<article[^>]*>\s*<h2[^>]*>[\s\S]*?<\/h2>\s*<div[^>]*>([\s\S]*?)<\/div>\s*<\/article>/i);
    if (articleMatch) {
      const text = articleMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      const key = `${info.locale}`;
      if (!aboutParagraphsByLocale.has(key)) aboutParagraphsByLocale.set(key, new Map());
      const localeMap = aboutParagraphsByLocale.get(key);
      if (localeMap.has(text)) {
        errors.push(`[CONTENT] Duplicate About text between ${route} and ${localeMap.get(text)}`);
      } else {
        localeMap.set(text, route);
      }
    }
  }
}

// 5. Sitemap, Robots & Cloudflare _headers Verification
const sitemapIndexPath = join(distDir, 'sitemap-index.xml');
const sitemap0Path = join(distDir, 'sitemap-0.xml');
const robotsPath = join(distDir, 'robots.txt');
const headersPath = join(distDir, '_headers');
const ogImagePath = join(distDir, 'og-image.png');

if (!existsSync(sitemapIndexPath)) {
  errors.push('[SITEMAP] dist/sitemap-index.xml is missing');
} else {
  const xml = readFileSync(sitemapIndexPath, 'utf-8');
  if (!xml.includes('https://omecy.com/sitemap-0.xml')) {
    errors.push('[SITEMAP] dist/sitemap-index.xml does not reference https://omecy.com/sitemap-0.xml');
  }
}

if (!existsSync(sitemap0Path)) {
  errors.push('[SITEMAP] dist/sitemap-0.xml is missing');
} else {
  const xml = readFileSync(sitemap0Path, 'utf-8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  stats.sitemapUrls = locs.length;
  if (locs.length !== stats.totalPages) {
    errors.push(`[SITEMAP] Expected ${stats.totalPages} URLs in sitemap-0.xml, found ${locs.length}`);
  }
  for (const loc of locs) {
    if (!loc.startsWith('https://omecy.com/')) {
      errors.push(`[SITEMAP] URL does not use https://omecy.com origin: ${loc}`);
    }
    if (loc.endsWith('.html')) {
      errors.push(`[SITEMAP] URL leaks .html extension: ${loc}`);
    }
    if (loc !== 'https://omecy.com/' && loc.endsWith('/')) {
      errors.push(`[SITEMAP] URL violates trailingSlash: 'never': ${loc}`);
    }
    if (!seenCanonicals.has(loc)) {
      errors.push(`[SITEMAP] URL in sitemap does not match any page canonical: ${loc}`);
    }
  }
}

if (!existsSync(robotsPath)) {
  errors.push('[ROBOTS] dist/robots.txt is missing');
} else {
  const robots = readFileSync(robotsPath, 'utf-8');
  if (!robots.includes('Allow: /') || !robots.includes('Sitemap: https://omecy.com/sitemap-index.xml')) {
    errors.push('[ROBOTS] robots.txt missing Allow: / or Sitemap directive');
  }
}

if (!existsSync(headersPath)) {
  errors.push('[HEADERS] dist/_headers is missing');
} else {
  const headers = readFileSync(headersPath, 'utf-8');
  if (!headers.includes('/sitemap-index.xml') || !headers.includes('application/xml; charset=utf-8')) {
    errors.push('[HEADERS] _headers missing XML Content-Type rule for sitemaps');
  }
  if (/Cross-Origin-Opener-Policy|Cross-Origin-Embedder-Policy/i.test(headers)) {
    errors.push('[HEADERS] COOP/COEP headers MUST NOT be set (breaks AdSense compatibility)');
  }
}

if (!existsSync(ogImagePath)) {
  errors.push('[ASSETS] dist/og-image.png is missing');
}

// 7. Verify FFmpeg is NOT eagerly imported in any initial island entry bundle
const astroAssetsDir = join(distDir, '_astro');
if (existsSync(astroAssetsDir)) {
  const jsFiles = readdirSync(astroAssetsDir).filter((f) => f.endsWith('.js'));
  for (const f of jsFiles) {
    // Only check initial component island chunks (e.g. VideoToMp3.*.js)
    if (/^(VideoToMp3|WebmToMp4|VideoCompressor|VideoTrimmer|AudioJoiner|Mp3Cutter|WavToMp3|M4aToMp3|ImageCompressor|WebpToJpg|HeicToJpg|ImageResizer)\./i.test(f)) {
      const content = readFileSync(join(astroAssetsDir, f), 'utf-8');
      if (content.includes('ffmpeg-core.wasm')) {
        stats.initialIslandBundlesWithFfmpeg++;
        errors.push(`[PERF] Initial island bundle ${f} eagerly contains FFmpeg core!`);
      }
    }
  }
}

console.log('\n=======================================================');
console.log('       OMECY TOOLS — TECHNICAL SEO AUDIT REPORT        ');
console.log('=======================================================');
console.log(`Total Static HTML Pages Audited : ${stats.totalPages} (Home: ${stats.homePages}, Hubs: ${stats.hubPages}, Tools: ${stats.toolPages}, Privacy: ${stats.privacyPages})`);
console.log(`Title Character Range           : ${stats.titleMin}–${stats.titleMax} chars (Required: 50–60)`);
console.log(`Meta Description Length Range   : ${stats.descMin}–${stats.descMax} chars (Required: 130–155)`);
console.log(`Sitemap URLs Verified           : ${stats.sitemapUrls}`);
console.log(`Initial Bundles Loading FFmpeg  : ${stats.initialIslandBundlesWithFfmpeg} (Required: 0)`);
console.log(`Warnings                        : ${warnings.length}`);
console.log(`Failures                        : ${errors.length}`);
console.log('=======================================================\n');

if (warnings.length > 0) {
  console.log('Warnings:');
  for (const w of warnings) console.log(`  - ${w}`);
  console.log('');
}

if (errors.length > 0) {
  console.error('SEO AUDIT FAILED with the following issues:');
  for (const e of errors.slice(0, 60)) {
    console.error(`  ✗ ${e}`);
  }
  if (errors.length > 60) {
    console.error(`  ... and ${errors.length - 60} more errors.`);
  }
  process.exit(1);
}

console.log('✓ ALL 8 TECHNICAL SEO, ACCESSIBILITY & PERFORMANCE CHECKS PASSED (100% COMPLIANT)!\n');
