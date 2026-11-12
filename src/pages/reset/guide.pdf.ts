import type { APIRoute } from 'astro';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { hasResetAccess } from '../../lib/resetToRest';

// The paid From Reset to Rest guide. It lives in private/ (not public/), is bundled into the
// server function via the Netlify adapter's includeFiles, and is only served to buyers.
export const prerender = false;

const FILE = 'private/reset-to-rest/from-reset-to-rest.pdf';

// The function's working directory differs between local dev and Netlify, so look in both
// the working directory and the directories above this module.
function locate(): string | null {
  const here = fileURLToPath(new URL('.', import.meta.url));
  const candidates = [resolve(process.cwd(), FILE)];
  for (let up = '.', i = 0; i < 8; i++, up += '/..') candidates.push(resolve(here, up, FILE));
  return candidates.find((p) => existsSync(p)) ?? null;
}

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  if (!(await hasResetAccess(url, cookies))) return redirect('/reset-preview', 302);
  const path = locate();
  if (!path) {
    console.error('[Reset to Rest] guide PDF not found; checked from', process.cwd());
    return new Response('The guide is temporarily unavailable. Please email georgia@thyme4sleep.com.', { status: 503 });
  }
  return new Response(await readFile(path), {
    headers: {
      'content-type': 'application/pdf',
      'content-disposition': 'inline; filename="From-Reset-to-Rest-Thyme4Sleep.pdf"',
      'cache-control': 'private, no-store',
      'x-robots-tag': 'noindex',
    },
  });
};
