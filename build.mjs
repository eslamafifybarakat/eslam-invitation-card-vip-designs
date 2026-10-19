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

// fingerprint scripts; the worker's importScripts and app.js's worker URL are
// versioned too, so the year-long immutable cache never serves a stale file
const v = (f) => hash(readFileSync(f));
let worker = readFileSync('assets/js/paint-worker.js', 'utf8')
  .replace("'vendor/qrcode.min.js'", `'vendor/qrcode.min.js?v=${v('assets/js/vendor/qrcode.min.js')}'`)
  .replace("'designs.js'", `'designs.js?v=${v('assets/js/designs.js')}'`);
writeFileSync(`${OUT}/assets/js/paint-worker.js`, worker);
let app = readFileSync('assets/js/app.js', 'utf8')
  .replace("'assets/js/paint-worker.js'", `'assets/js/paint-worker.js?v=${hash(worker)}'`);
if (!app.includes('paint-worker.js?v=')) throw new Error('worker URL not versioned');
writeFileSync(`${OUT}/assets/js/app.js`, app);
const built = { 'assets/js/app.js': app };
html = html.replace(/<script src="(assets\/js\/[^"]+)"/g, (m, src) => {
  if (!existsSync(src)) throw new Error(`missing ${src}`);
  return `<script src="${src}?v=${hash(built[src] || readFileSync(src))}"`;
});

writeFileSync(`${OUT}/index.html`, html);
console.log(`built ${OUT}/ — index.html ${(Buffer.byteLength(html) / 1024).toFixed(1)} KB`);
