// Production build (no dependencies): copies the site to dist/, inlines the CSS
// into index.html (no render-blocking requests) and fingerprints JS/CSS URLs
// so they can be cached forever. Run: node build.mjs
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';

const OUT = 'dist';
const hash = (s) => createHash('sha1').update(s).digest('hex').slice(0, 10);
const minCss = (s) => s
  .replace(/\/\*[\s\S]*?\*\//g, '')
  .replace(/\s+/g, ' ')
  .replace(/\s*([{}:;,>])\s*/g, '$1')
  .replace(/;}/g, '}')
  .trim();

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

for (const f of ['content.json', 'manifest.webmanifest', 'robots.txt', 'sitemap.xml']) cpSync(f, `${OUT}/${f}`);
cpSync('assets', `${OUT}/assets`, { recursive: true });
cpSync('assets/img/favicon-32.png', `${OUT}/favicon.ico`);

let html = readFileSync('index.html', 'utf8');

// inline both stylesheets (font urls become root-relative to the page)
const css = ['assets/css/fonts.css', 'assets/css/styles.css']
  .map((f) => readFileSync(f, 'utf8'))
  .join('\n')
  .replace(/url\(\.\.\/fonts\//g, 'url(assets/fonts/');
html = html
  .replace(/<link rel="stylesheet" href="assets\/css\/fonts\.css">\s*/, '')
  .replace(/<link rel="stylesheet" href="assets\/css\/styles\.css">/, `<style>${minCss(css)}</style>`);

// fingerprint scripts
html = html.replace(/<script src="(assets\/js\/[^"]+)"/g, (m, src) => {
  if (!existsSync(src)) throw new Error(`missing ${src}`);
  return `<script src="${src}?v=${hash(readFileSync(src))}"`;
});

writeFileSync(`${OUT}/index.html`, html);
console.log(`built ${OUT}/ — index.html ${(Buffer.byteLength(html) / 1024).toFixed(1)} KB`);
