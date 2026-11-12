// Renders the /assets library's downloadable files from the live pages:
//   - every .frame on /assets/social/frames  -> public/assets/social/<name>.png
//   - each printable page                    -> public/assets/downloads/<file>.pdf
//
//   - the paid Calm Nights plan & workbook  -> deliverables/calm-nights/<file>.pdf
//   - the From Reset to Rest guide          -> deliverables/reset-to-rest/from-reset-to-rest.pdf
//     (a review copy; once approved, copy it to private/reset-to-rest/, which buyers download)
//     (only when ASSETS_PREVIEW_KEY is set; kept out of public/ so they aren't served for free)
//
// Usage (with the dev server running on :4321):
//   npx -y -p playwright node scripts/assets/render.mjs [baseUrl]
// For the Calm Nights PDFs, start the dev server and this script with the same key:
//   ASSETS_PREVIEW_KEY=xyz npm run dev
//   ASSETS_PREVIEW_KEY=xyz npx -y -p playwright node scripts/assets/render.mjs
// Set PLAYWRIGHT_MODULE to a path if playwright isn't resolvable from here.
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const pw = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const { chromium } = pw.chromium ? pw : pw.default;
const base = process.argv[2] || 'http://localhost:4321';
const root = resolve(import.meta.dirname, '../..');
const socialDir = resolve(root, 'public/assets/social');
const pdfDir = resolve(root, 'public/assets/downloads');
const paidDir = resolve(root, 'deliverables/calm-nights');
const previewKey = process.env.ASSETS_PREVIEW_KEY;
await mkdir(socialDir, { recursive: true });
await mkdir(pdfDir, { recursive: true });

const PDFS = [
  ['/assets/safe-sleep', 'thyme4sleep-safe-sleep-checklist.pdf'],
  ['/assets/sleep-log', 'thyme4sleep-7-day-sleep-log.pdf'],
  ['/assets/bedtime-chart', 'thyme4sleep-bedtime-routine-chart.pdf'],
];
const HIDE_DEV = 'astro-dev-toolbar{display:none!important}';

const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const page = await browser.newPage({ viewport: { width: 1400, height: 1000 }, deviceScaleFactor: 1 });
// Printables sit behind the email gate; mark this browser as already signed up.
await page.addInitScript(() => localStorage.setItem('t4s_lead', '{"email":"render"}'));

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

if (previewKey) {
  await mkdir(paidDir, { recursive: true });
  const PAID = [
    ['/assets/calm-nights/workbook', 'calm-nights-guide-and-workbook.pdf'],
    ['/assets/calm-nights/plan', 'calm-nights-method-programme.pdf'],
    ['/reset/guide', '../reset-to-rest/from-reset-to-rest.pdf'],
  ];
  await mkdir(resolve(paidDir, '../reset-to-rest'), { recursive: true });
  for (const [path, file] of PAID) {
    await page.goto(`${base}${path}?preview=${encodeURIComponent(previewKey)}`, { waitUntil: 'networkidle' });
    await page.addStyleTag({ content: HIDE_DEV });
    await page.evaluate(() => document.fonts.ready);
    await page.emulateMedia({ media: 'print' });
    await page.pdf({ path: resolve(paidDir, file), printBackground: true, preferCSSPageSize: true });
    await page.emulateMedia({ media: 'screen' });
    console.log('pdf', resolve(paidDir, file).replace(root + '/', ''));
  }
} else {
  console.log('skip Calm Nights PDFs (set ASSETS_PREVIEW_KEY to render them)');
}

await browser.close();
