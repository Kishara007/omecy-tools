import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/** Dev-only middleware so /sitemap-index.xml and /sitemap-0.xml are viewable during `npm run dev` (zero production build impact). */
function devSitemapPreview() {
  return {
    name: 'omecy-dev-sitemap-preview',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = (req.url || '').split('?')[0];
        if (pathname === '/sitemap-index.xml' || /^\/sitemap-\d+\.xml$/.test(pathname)) {
          const filePath = path.join(process.cwd(), 'dist', pathname.slice(1));
          if (fs.existsSync(filePath)) {
            res.setHeader('Content-Type', 'application/xml; charset=utf-8');
            res.end(fs.readFileSync(filePath));
            return;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  site: 'https://omecy.com',
  trailingSlash: 'never',
  output: 'static',
  build: {
    format: 'file',
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'pt', 'de', 'fr', 'ja', 'zh-cn', 'ru'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    preact(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          es: 'es',
          pt: 'pt',
          de: 'de',
          fr: 'fr',
          ja: 'ja',
          'zh-cn': 'zh-CN',
          ru: 'ru',
        },
      },
      serialize(item) {
        let url = item.url.replace(/\.html$/, '');
        if (url !== 'https://omecy.com/' && url.endsWith('/')) {
          url = url.slice(0, -1);
        }
        item.url = url;
        item.lastmod = new Date().toISOString();
        if (item.links) {
          item.links = item.links.map((link) => {
            let linkUrl = link.url.replace(/\.html$/, '');
            if (linkUrl !== 'https://omecy.com/' && linkUrl.endsWith('/')) {
              linkUrl = linkUrl.slice(0, -1);
            }
            return { ...link, url: linkUrl };
          });
          const enLink = item.links.find((l) => l.lang === 'en');
          const hasXDefault = item.links.some((l) => l.lang === 'x-default');
          if (enLink && !hasXDefault) {
            item.links.push({ lang: 'x-default', url: enLink.url });
          }
        }
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss(), devSitemapPreview()],
    optimizeDeps: {
      exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util'],
    },
  },
});
