import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, '..', 'public');
mkdirSync(publicDir, { recursive: true });

// 1200x630 Open Graph / Twitter Card social preview image
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#121A26"/>
      <stop offset="55%" stop-color="#1D2A3B"/>
      <stop offset="100%" stop-color="#27374D"/>
    </linearGradient>
    <linearGradient id="card" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#27374D" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#1D2A3B" stop-opacity="0.9"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1060" cy="110" r="220" fill="#526D82" opacity="0.14"/>
  <circle cx="140" cy="540" r="190" fill="#9DB2BF" opacity="0.08"/>

  <!-- Brand Mark -->
  <g transform="translate(88, 86)">
    <rect width="72" height="72" rx="18" fill="#DDE6ED"/>
    <circle cx="36" cy="36" r="20" fill="none" stroke="#27374D" stroke-width="6"/>
    <path d="M30.5 27.5L44.5 36L30.5 44.5V27.5Z" fill="#526D82"/>
    <text x="94" y="48" font-family="system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-size="42" font-weight="800" letter-spacing="4" fill="#DDE6ED">OMECY</text>
    <text x="278" y="48" font-family="system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-size="22" font-weight="600" letter-spacing="1.5" fill="#9DB2BF">TOOLS</text>
  </g>

  <!-- Main Headline -->
  <text x="88" y="252" font-family="system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-size="56" font-weight="800" fill="#FFFFFF">Private Browser Media Tools</text>
  <text x="88" y="316" font-family="system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-size="30" font-weight="500" fill="#DDE6ED">Video, Audio &amp; Image converters that run 100% on your device.</text>
  <text x="88" y="362" font-family="system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-size="24" font-weight="400" fill="#9DB2BF">Zero file uploads. Zero server wait. Free forever in your browser.</text>

  <!-- Feature Pills -->
  <g transform="translate(88, 424)">
    <rect x="0" y="0" width="230" height="64" rx="14" fill="url(#card)" stroke="#526D82" stroke-width="2"/>
    <text x="115" y="40" text-anchor="middle" font-family="system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-size="22" font-weight="700" fill="#DDE6ED">Video Tools</text>

    <rect x="252" y="0" width="230" height="64" rx="14" fill="url(#card)" stroke="#526D82" stroke-width="2"/>
    <text x="367" y="40" text-anchor="middle" font-family="system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-size="22" font-weight="700" fill="#DDE6ED">Audio Tools</text>

    <rect x="504" y="0" width="230" height="64" rx="14" fill="url(#card)" stroke="#526D82" stroke-width="2"/>
    <text x="619" y="40" text-anchor="middle" font-family="system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-size="22" font-weight="700" fill="#DDE6ED">Image Tools</text>

    <rect x="756" y="0" width="268" height="64" rx="14" fill="#DDE6ED"/>
    <text x="890" y="40" text-anchor="middle" font-family="system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-size="22" font-weight="800" fill="#27374D">100% Zero-Upload</text>
  </g>

  <!-- Domain Footer -->
  <text x="88" y="566" font-family="system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif" font-size="22" font-weight="600" letter-spacing="1" fill="#9DB2BF">https://omecy.com</text>
</svg>`;

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180" width="180" height="180">
  <rect width="180" height="180" rx="40" fill="#27374D"/>
  <circle cx="90" cy="90" r="50" fill="none" stroke="#DDE6ED" stroke-width="15"/>
  <path d="M76 69L111 90L76 111V69Z" fill="#9DB2BF"/>
</svg>`;

await sharp(Buffer.from(ogSvg))
  .png({ compressionLevel: 9, palette: true })
  .toFile(resolve(publicDir, 'og-image.png'));

await sharp(Buffer.from(faviconSvg))
  .resize(180, 180)
  .png({ compressionLevel: 9 })
  .toFile(resolve(publicDir, 'apple-touch-icon.png'));

await sharp(Buffer.from(faviconSvg))
  .resize(32, 32)
  .png({ compressionLevel: 9 })
  .toFile(resolve(publicDir, 'favicon-32x32.png'));

console.log('Generated public/og-image.png (1200x630), public/apple-touch-icon.png (180x180), public/favicon-32x32.png (32x32)');
