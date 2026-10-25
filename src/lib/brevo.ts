// Minimal Brevo (ex-Sendinblue) client: create or update a contact and add it to lists.
// Brevo automations then start from "contact added to list" and branch on attributes.
//
// Netlify env vars:
//   BREVO_API_KEY        — Brevo → SMTP & API → API keys
//   BREVO_LIST_LEADS     — list id for free sign-ups (quiz + Gentle Sleep Reset)
//   BREVO_LIST_RESET     — Reset to Rest buyers
//   BREVO_LIST_CALM      — Calm Nights / bundle buyers
//   BREVO_LIST_CLIENTS   — any 1:1 purchase (use as the exit list for the nurture flows)
// Contact attributes to create in Brevo (Contacts → Settings → Attributes, type Text):
//   SNAPSHOT (d|a|t|c), SNAPSHOT_RESULT, LEAD_SOURCE, LAST_PURCHASE
// FIRSTNAME already exists in every Brevo account.

const env = (k: string): string | undefined => (import.meta as any).env?.[k] || process.env[k];

export type BrevoList = 'leads' | 'reset' | 'calm' | 'clients';
const LIST_ENV: Record<BrevoList, string> = {
  leads: 'BREVO_LIST_LEADS', reset: 'BREVO_LIST_RESET', calm: 'BREVO_LIST_CALM', clients: 'BREVO_LIST_CLIENTS',
};

export const brevoEnabled = () => Boolean(env('BREVO_API_KEY'));

export function listForPackage(packageId: string | undefined | null): BrevoList | null {
  if (!packageId) return null;
  if (packageId === 'reset-to-rest') return 'reset';
  if (packageId.startsWith('calm-nights')) return 'calm';
  return 'clients';
}

async function post(body: Record<string, unknown>) {
  return fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: { 'api-key': env('BREVO_API_KEY')!, 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify(body),
  });
}

/** Upsert a contact. Returns true on success; never throws (email capture must not break the page). */
export async function upsertContact(email: string, attributes: Record<string, string>, lists: BrevoList[]): Promise<boolean> {
  if (!brevoEnabled()) return false;
  const listIds = lists.map((l) => Number(env(LIST_ENV[l]))).filter((n) => Number.isInteger(n) && n > 0);
  const clean = Object.fromEntries(Object.entries(attributes).filter(([, v]) => v));
  try {
    let res = await post({ email, attributes: clean, listIds, updateEnabled: true });
    if (!res.ok && res.status === 400 && Object.keys(clean).some((k) => k !== 'FIRSTNAME')) {
      // Usually a custom attribute that hasn't been created in Brevo yet: keep the contact anyway.
      console.warn('[Brevo] retrying without custom attributes:', await res.text());
      res = await post({ email, attributes: clean.FIRSTNAME ? { FIRSTNAME: clean.FIRSTNAME } : {}, listIds, updateEnabled: true });
    }
    if (!res.ok) console.error('[Brevo] contact upsert failed:', res.status, await res.text());
    return res.ok;
  } catch (err: any) {
    console.error('[Brevo] request error:', err?.message);
    return false;
  }
}
