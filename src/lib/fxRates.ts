import type { Rates } from '../data/prices';

// Live exchange rates for localised prices.
//
// Source: the European Central Bank's daily reference rates via Frankfurter (free, no key),
// with open.er-api.com as a backup. Rates are cached in memory for 6 hours; because the ECB
// publishes one set a day, a family's page and their checkout use the same rates.
// If both services are unreachable, FALLBACK keeps the site working.
//
// FX_TEST_RATES (e.g. {"gbp":0.79,"eur":0.92,"ils":3.7}) overrides everything, for local testing.

const FALLBACK: Rates = { gbp: 0.79, eur: 0.92, ils: 3.7 };
const TTL_MS = 6 * 60 * 60 * 1000;
const TIMEOUT_MS = 3000;
const RETRY_MS = 10 * 60 * 1000; // after a failure, try the services again 10 minutes later

let cache: { rates: Rates; at: number; source: string } | null = null;

async function fetchJson(url: string): Promise<any> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: ctrl.signal, headers: { accept: 'application/json' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

function valid(r: any): r is Rates {
  return ['gbp', 'eur', 'ils'].every((k) => typeof r?.[k] === 'number' && r[k] > 0);
}

const SOURCES: [string, () => Promise<Rates>][] = [
  ['frankfurter (ECB)', async () => {
    const d = await fetchJson('https://api.frankfurter.dev/v1/latest?base=USD&symbols=GBP,EUR,ILS');
    return { gbp: d?.rates?.GBP, eur: d?.rates?.EUR, ils: d?.rates?.ILS };
  }],
  ['open.er-api.com', async () => {
    const d = await fetchJson('https://open.er-api.com/v6/latest/USD');
    return { gbp: d?.rates?.GBP, eur: d?.rates?.EUR, ils: d?.rates?.ILS };
  }],
];

export async function getRates(): Promise<{ rates: Rates; source: string }> {
  const test = (import.meta as any).env?.FX_TEST_RATES || process.env.FX_TEST_RATES;
  if (test) {
    try { const r = JSON.parse(test); if (valid(r)) return { rates: r, source: 'FX_TEST_RATES' }; } catch { /* ignore */ }
  }
  if (cache && Date.now() - cache.at < TTL_MS) return cache;
  for (const [source, load] of SOURCES) {
    try {
      const rates = await load();
      if (valid(rates)) {
        cache = { rates, at: Date.now(), source };
        return cache;
      }
    } catch (err) {
      console.warn(`[fx] ${source} unavailable:`, (err as Error).message);
    }
  }
  // Keep the last good rates if we have them, rather than jumping to the fallback
  if (cache && cache.source !== 'fallback') return { ...cache, at: (cache.at = Date.now() - TTL_MS + RETRY_MS) };
  console.warn('[fx] using fallback rates');
  // Remember the failure for 10 minutes so every visitor doesn't wait for the timeouts
  cache = { rates: FALLBACK, at: Date.now() - TTL_MS + RETRY_MS, source: 'fallback' };
  return cache;
}
