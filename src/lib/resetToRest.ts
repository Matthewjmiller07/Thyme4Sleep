import type { AstroCookies } from 'astro';
import { verifySession, isPreview } from './calmNights';

// Access control for From Reset to Rest ($37, or included in the Calm Nights bundle).
// Like Calm Nights, access is tied to a Stripe Checkout Session that we re-check with Stripe,
// so the cookie can't simply be invented by a visitor.

export const RESET_PACKAGES = ['reset-to-rest', 'calm-nights-bundle'];
export const RESET_COOKIE = 'reset_session';

// Buyers from before verified access carry an unverifiable random `reset_access` cookie.
// They are honoured so nobody who paid loses access; set this to false once those
// buyers have been sent a fresh link (or after a year, when the old cookies expire).
const ACCEPT_LEGACY_COOKIE = true;
const LEGACY_COOKIE = 'reset_access';

export function setResetCookie(cookies: AstroCookies, sessionId: string) {
  cookies.set(RESET_COOKIE, sessionId, {
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365 * 2,
    path: '/',
  });
}

// True for a verified Reset to Rest (or bundle) purchase, a legacy buyer, or the owner preview key.
export async function hasResetAccess(url: URL, cookies: AstroCookies): Promise<boolean> {
  if (isPreview(url)) return true;
  if (await verifySession(cookies.get(RESET_COOKIE)?.value, RESET_PACKAGES)) return true;
  return ACCEPT_LEGACY_COOKIE && Boolean(cookies.get(LEGACY_COOKIE)?.value);
}

// Cheap check for showing a link (no Stripe call); the pages themselves still verify.
export function mayHaveReset(cookies: AstroCookies): boolean {
  return cookies.has(RESET_COOKIE) || cookies.has(LEGACY_COOKIE);
}
