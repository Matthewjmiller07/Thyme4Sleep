// Localized prices across the site and checkout: one fixed price per currency, set by Georgia.
//
// Pages and checkout read this same table, so what a family sees is exactly what Stripe charges.
// GBP / EUR / ILS figures were worked out from BASIS_RATES below, then rounded to clean price
// points: 100 or more -> the nearest amount ending in 9; under 100 -> the nearest whole unit;
// support add-ons and the referral credit -> the nearest 5.
//
// Review every six months (a scheduled reminder checks this): if any rate has moved more than
// 5% from its basis rate, recalculate that currency's column and update BASIS_RATES.

export type Currency = 'usd' | 'gbp' | 'eur' | 'ils';
export const CURRENCIES: Currency[] = ['usd', 'gbp', 'eur', 'ils'];

export const CURRENCY_INFO: Record<Currency, { symbol: string; label: string }> = {
  usd: { symbol: '$', label: 'US dollars ($)' },
  gbp: { symbol: '£', label: 'British pounds (£)' },
  eur: { symbol: '€', label: 'Euros (€)' },
  ils: { symbol: '₪', label: 'Israeli shekels (₪)' },
};

// What one US dollar bought when the GBP / EUR / ILS prices were set
// (ECB reference rates, 13 November 2026, cross-checked against market quotes).
export const BASIS_RATES = { date: '2026-11-13', gbp: 0.756, eur: 0.905, ils: 3.21 } as const;

type Row = Record<Currency, number>;
export const PRICES: Record<string, Row> = {
  // 1:1 packages
  'starter-1':          { usd: 249,  gbp: 189,  eur: 229,  ils: 799 },
  'starter-2':          { usd: 449,  gbp: 339,  eur: 409,  ils: 1439 },
  'standard-1':         { usd: 549,  gbp: 419,  eur: 499,  ils: 1759 },
  'standard-2':         { usd: 749,  gbp: 569,  eur: 679,  ils: 2409 },
  'specialized-1':      { usd: 1229, gbp: 929,  eur: 1109, ils: 3949 },
  'specialized-2':      { usd: 1429, gbp: 1079, eur: 1289, ils: 4589 },
  // À la carte calls
  troubleshooting:      { usd: 99,   gbp: 75,   eur: 90,   ils: 319 },
  weekend:              { usd: 199,  gbp: 149,  eur: 179,  ils: 639 },
  // Digital products
  'reset-to-rest':      { usd: 37,   gbp: 28,   eur: 33,   ils: 119 },
  'calm-nights':        { usd: 97,   gbp: 73,   eur: 88,   ils: 309 },
  'calm-nights-bundle': { usd: 117,  gbp: 88,   eur: 109,  ils: 379 },
  // Support add-ons (Mon–Fri check-ins)
  'support-1w':         { usd: 100,  gbp: 75,   eur: 90,   ils: 320 },
  'support-2w':         { usd: 200,  gbp: 150,  eur: 180,  ils: 640 },
  'support-3w':         { usd: 300,  gbp: 225,  eur: 270,  ils: 965 },
  'support-4w':         { usd: 400,  gbp: 300,  eur: 360,  ils: 1285 },
  // Display only: the referral credit each family receives
  referral:             { usd: 100,  gbp: 75,   eur: 90,   ils: 320 },
};

// Legacy package ids still accepted by checkout
const ALIASES: Record<string, string> = { starter: 'starter-1', standard: 'standard-1', specialized: 'specialized-1' };

// Whole units of `cur` for a product, or undefined if the product is unknown
export function priceOf(id: string, cur: Currency): number | undefined {
  // The bundle's "bought separately" price is always Reset to Rest + Calm Nights
  if (id === 'bundle-separately') return PRICES['reset-to-rest'][cur] + PRICES['calm-nights'][cur];
  return PRICES[ALIASES[id] || id]?.[cur];
}

// "$1,229", "£929", "€1,109", "₪3,949"
export function formatPrice(amount: number, cur: Currency): string {
  return CURRENCY_INFO[cur].symbol + amount.toLocaleString('en-US');
}

// A formatter bound to one visitor's currency, for use in pages: P('starter-1') -> "£189"
export function pricer(cur: Currency) {
  return (id: string): string => {
    const amount = priceOf(id, cur);
    if (amount === undefined) throw new Error(`No price for ${id}`);
    return formatPrice(amount, cur);
  };
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
