// Localised prices for thyme4sleep.com/pricing and checkout.
//
// One table, used by both the pricing page and /api/create-checkout-session, so what a
// family sees is exactly what Stripe charges. Amounts are in whole units of each currency.
// USD figures are the existing prices. GBP / EUR / ILS figures are proposals for Georgia to
// approve: converted at roughly £0.79, €0.92 and ₪3.70 to the dollar, then rounded to clean
// price points. Change any figure here and both the page and checkout follow.

export type Currency = 'usd' | 'gbp' | 'eur' | 'ils';
export const CURRENCIES: Currency[] = ['usd', 'gbp', 'eur', 'ils'];

export const CURRENCY_INFO: Record<Currency, { symbol: string; label: string }> = {
  usd: { symbol: '$', label: 'US dollars ($)' },
  gbp: { symbol: '£', label: 'British pounds (£)' },
  eur: { symbol: '€', label: 'Euros (€)' },
  ils: { symbol: '₪', label: 'Israeli shekels (₪)' },
};

type Row = Record<Currency, number>;
export const PRICES: Record<string, Row> = {
  // 1:1 packages
  'starter-1':          { usd: 249,  gbp: 199,  eur: 229,  ils: 899 },
  'starter-2':          { usd: 449,  gbp: 359,  eur: 409,  ils: 1649 },
  'standard-1':         { usd: 549,  gbp: 439,  eur: 499,  ils: 1999 },
  'standard-2':         { usd: 749,  gbp: 599,  eur: 689,  ils: 2749 },
  'specialized-1':      { usd: 1229, gbp: 979,  eur: 1129, ils: 4499 },
  'specialized-2':      { usd: 1429, gbp: 1139, eur: 1309, ils: 5249 },
  // À la carte calls
  troubleshooting:      { usd: 99,   gbp: 79,   eur: 89,   ils: 359 },
  weekend:              { usd: 199,  gbp: 159,  eur: 185,  ils: 729 },
  // Digital products
  'reset-to-rest':      { usd: 37,   gbp: 29,   eur: 35,   ils: 129 },
  'calm-nights':        { usd: 97,   gbp: 75,   eur: 89,   ils: 349 },
  'calm-nights-bundle': { usd: 117,  gbp: 89,   eur: 105,  ils: 429 },
  // Support add-ons (Mon–Fri check-ins)
  'support-1w':         { usd: 100,  gbp: 80,   eur: 90,   ils: 370 },
  'support-2w':         { usd: 200,  gbp: 160,  eur: 180,  ils: 740 },
  'support-3w':         { usd: 300,  gbp: 240,  eur: 270,  ils: 1110 },
  'support-4w':         { usd: 400,  gbp: 320,  eur: 360,  ils: 1480 },
  // Display only: the referral credit each family receives
  referral:             { usd: 100,  gbp: 80,   eur: 90,   ils: 370 },
};

// Legacy package ids still accepted by checkout
const ALIASES: Record<string, string> = { starter: 'starter-1', standard: 'standard-1', specialized: 'specialized-1' };

export function priceOf(id: string, cur: Currency): number | undefined {
  return PRICES[ALIASES[id] || id]?.[cur];
}

// "$1,229", "£199", "€1,129", "₪4,499"
export function formatPrice(amount: number, cur: Currency): string {
  return CURRENCY_INFO[cur].symbol + amount.toLocaleString('en-US');
}

export function priceLabel(id: string, cur: Currency): string {
  const amount = priceOf(id, cur);
  if (amount === undefined) throw new Error(`No ${cur} price for ${id}`);
  return formatPrice(amount, cur);
}

export function isCurrency(v: unknown): v is Currency {
  return typeof v === 'string' && (CURRENCIES as string[]).includes(v);
}

// Countries that use each non-USD currency. Everyone else sees US dollars.
const EURO = ['AT', 'BE', 'HR', 'CY', 'EE', 'FI', 'FR', 'DE', 'GR', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PT', 'SK', 'SI', 'ES', 'AD', 'MC', 'SM', 'VA', 'ME', 'XK'];
const POUND = ['GB', 'IM', 'JE', 'GG'];
const SHEKEL = ['IL'];

export function currencyForCountry(country: string | undefined | null): Currency {
  const c = (country || '').toUpperCase();
  if (POUND.includes(c)) return 'gbp';
  if (EURO.includes(c)) return 'eur';
  if (SHEKEL.includes(c)) return 'ils';
  return 'usd';
}
