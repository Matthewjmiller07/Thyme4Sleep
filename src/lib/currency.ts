import type { AstroCookies } from 'astro';
import { currencyForCountry, isCurrency, pricer, type Currency } from '../data/prices';

// Picks the currency for a visitor, in this order:
//   1. ?currency=gbp in the address (the page's currency switcher), remembered in a cookie
//   2. that remembered choice
//   3. the visitor's country, from Netlify's geolocation
//   4. US dollars
export const CURRENCY_COOKIE = 'currency';

interface Ctx { url: URL; cookies: AstroCookies; request: Request; locals: any }

export function visitorCountry({ request, locals }: Pick<Ctx, 'request' | 'locals'>): string | null {
  const fromContext = locals?.netlify?.context?.geo?.country?.code;
  if (fromContext) return fromContext;
  const header = request.headers.get('x-country');
  if (header) return header;
  const geo = request.headers.get('x-nf-geo');
  if (geo) {
    try { return JSON.parse(Buffer.from(geo, 'base64').toString('utf8'))?.country?.code ?? null; } catch { /* ignore */ }
  }
  return null;
}

export function resolveCurrency(ctx: Ctx): { currency: Currency; country: string | null; chosen: boolean } {
  const country = visitorCountry(ctx);
  const asked = ctx.url.searchParams.get('currency')?.toLowerCase();
  if (isCurrency(asked)) {
    ctx.cookies.set(CURRENCY_COOKIE, asked, { path: '/', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax' });
    return { currency: asked, country, chosen: true };
  }
  const saved = ctx.cookies.get(CURRENCY_COOKIE)?.value;
  if (isCurrency(saved)) return { currency: saved, country, chosen: true };
  return { currency: currencyForCountry(country), country, chosen: false };
}

// Everything a page needs to show localised prices: the visitor's currency and a formatter
// (P('starter-1') -> "£189"). Also stops the page being cached and shared, since it differs
// by visitor.
export async function localPricing(ctx: Ctx & { response: ResponseInit & { headers: Headers } }) {
  const { currency } = resolveCurrency(ctx);
  ctx.response.headers.set('Cache-Control', 'private, no-store');
  return { currency, P: pricer(currency) };
}
