import type { APIRoute } from 'astro';
import { verifySession } from '../../lib/calmNights';
import { RESET_PACKAGES, setResetCookie, hasResetAccess } from '../../lib/resetToRest';

export const prerender = false;
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

// POST { sessionId }: grants Reset to Rest access only for a session Stripe confirms was paid.
export const POST: APIRoute = async ({ request, cookies }) => {
  const { sessionId } = (await request.json().catch(() => ({}))) as { sessionId?: string };
  if (!sessionId) return json({ error: 'Missing session ID' }, 400);
  if (!(await verifySession(sessionId, RESET_PACKAGES))) return json({ error: 'Payment not confirmed' }, 402);
  setResetCookie(cookies, sessionId);
  return json({ success: true });
};

// GET: whether this browser has Reset to Rest access.
export const GET: APIRoute = async ({ url, cookies }) => json({ hasAccess: await hasResetAccess(url, cookies) });
