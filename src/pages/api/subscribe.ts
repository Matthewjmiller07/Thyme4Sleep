import type { APIRoute } from 'astro';
import { upsertContact, brevoEnabled } from '../../lib/brevo';
import { SNAPSHOT_LABELS } from '../../data/emails';

export const prerender = false;

// Free sign-ups (Sleep Snapshot quiz, Gentle Sleep Reset) → Brevo "leads" list.
// The forms still notify Georgia through Web3Forms; this adds the person to the email flow.
const SOURCES = ['snapshot', 'gentle-reset'];

export const POST: APIRoute = async ({ request }) => {
  let data: Record<string, unknown>;
  try { data = await request.json(); } catch { return json({ ok: false, error: 'Invalid body' }, 400); }

  if (data.botcheck) return json({ ok: true }); // honeypot: pretend success
  const email = String(data.email || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return json({ ok: false, error: 'Invalid email' }, 400);

  const snapshot = String(data.snapshot || '');
  const source = SOURCES.includes(String(data.source)) ? String(data.source) : 'gentle-reset';
  const attributes: Record<string, string> = {
    FIRSTNAME: String(data.name || '').trim().slice(0, 60),
    LEAD_SOURCE: source,
  };
  if (SNAPSHOT_LABELS[snapshot]) {
    attributes.SNAPSHOT = snapshot;
    attributes.SNAPSHOT_RESULT = SNAPSHOT_LABELS[snapshot];
  }

  if (!brevoEnabled()) return json({ ok: true, brevo: false });
  const ok = await upsertContact(email, attributes, ['leads']);
  return json({ ok, brevo: true }, ok ? 200 : 502);
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
