// Renders the /assets library's downloadable files from the live pages:
//   - every .frame on /assets/social/frames  -> public/assets/social/<name>.png
//   - each printable page                    -> public/assets/downloads/<file>.pdf
//
// Usage (with the dev server running on :4321):
//   npx -y -p playwright node scripts/assets/render.mjs [baseUrl]
// Set PLAYWRIGHT_MODULE to a path if playwright isn't resolvable from here.
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.argv[2] || 'http://localhost:4321';
const root = resolve(import.meta.dirname, '../..');
const socialDir = resolve(root, 'public/assets/social');
const pdfDir = resolve(root, 'public/assets/downloads');
await mkdir(socialDir, { recursive: true });
await mkdir(pdfDir, { recursive: true });

const PDFS = [
  ['/assets/wake-windows', 'thyme4sleep-wake-window-cheat-sheet.pdf'],
  ['/assets/safe-sleep', 'thyme4sleep-safe-sleep-checklist.pdf'],
  ['/assets/sleep-log', 'thyme4sleep-7-day-sleep-log.pdf'],
  ['/assets/bedtime-chart', 'thyme4sleep-bedtime-routine-chart.pdf'],
];
const HIDE_DEV = 'astro-dev-toolbar{display:none!important}';

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const page = await browser.newPage({ viewport: { width: 1400, height: 1000 }, deviceScaleFactor: 1 });

await page.goto(`${base}/assets/social/frames`, { waitUntil: 'networkidle' });
await page.addStyleTag({ content: HIDE_DEV });
await page.evaluate(() => document.fonts.ready);
for (const frame of await page.$$('.frame')) {
  const name = await frame.getAttribute('data-name');
  await frame.screenshot({ path: resolve(socialDir, `${name}.png`) });
  console.log('png', name);
}

for (const [path, file] of PDFS) {
  await page.goto(`${base}${path}`, { waitUntil: 'networkidle' });
  await page.addStyleTag({ content: HIDE_DEV });
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ media: 'print' });
  await page.pdf({ path: resolve(pdfDir, file), printBackground: true, preferCSSPageSize: true });
  await page.emulateMedia({ media: 'screen' });
  console.log('pdf', file);
}

await browser.close();
