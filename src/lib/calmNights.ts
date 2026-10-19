import Stripe from 'stripe';
import type { AstroCookies } from 'astro';

// Access control for the Calm Nights Method digital product.
// Unlike a bare random cookie, access is tied to a Stripe Checkout Session that we
// re-check with Stripe, so the cookie can't simply be invented by a visitor.

export const CALM_NIGHTS_PACKAGES = ['calm-nights', 'calm-nights-bundle'];
export const ACCESS_COOKIE = 'calm_nights_session';

const stripeSecretKey = (import.meta as any).env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey, { apiVersion: '2024-06-20' }) : null;

// Optional owner preview: set ASSETS_PREVIEW_KEY in Netlify and visit
// /assets/calm-nights/plan?preview=<key> to review the product without buying.
const previewKey = (import.meta as any).env.ASSETS_PREVIEW_KEY || process.env.ASSETS_PREVIEW_KEY;

export interface VerifiedPurchase { packageId: string; email?: string | null }

export async function verifySession(sessionId: string | undefined | null): Promise<VerifiedPurchase | null> {
  if (!stripe || !sessionId || !/^cs_[A-Za-z0-9_]+$/.test(sessionId)) return null;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const packageId = session.metadata?.packageId || '';
    if (session.payment_status !== 'paid' || !CALM_NIGHTS_PACKAGES.includes(packageId)) return null;
    return { packageId, email: session.customer_details?.email };
  } catch (err) {
    console.error('[Calm Nights] Session verification failed:', (err as Error).message);
    return null;
  }
}

export function isPreview(url: URL): boolean {
  return Boolean(previewKey) && url.searchParams.get('preview') === previewKey;
}

export function setAccessCookie(cookies: AstroCookies, sessionId: string) {
  cookies.set(ACCESS_COOKIE, sessionId, {
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365 * 2,
    path: '/',
  });
}

// True when the visitor has bought Calm Nights (verified with Stripe) or is using the owner preview key.
export async function hasAccess(url: URL, cookies: AstroCookies): Promise<boolean> {
  if (isPreview(url)) return true;
  return Boolean(await verifySession(cookies.get(ACCESS_COOKIE)?.value));
}
