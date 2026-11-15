// Localised prices across the site and checkout.
//
// Every price is set once, in US dollars, below. Other currencies are worked out from the
// day's exchange rate (src/lib/fxRates.ts) and rounded UP to the next whole pound, euro or
// shekel, so a family never pays less than the dollar price at that day's rate.
// Pages and checkout use the same functions, so what a family sees is what Stripe charges.

export type Currency = 'usd' | 'gbp' | 'eur' | 'ils';
export const CURRENCIES: Currency[] = ['usd', 'gbp', 'eur', 'ils'];

export const CURRENCY_INFO: Record<Currency, { symbol: string; label: string }> = {
  usd: { symbol: '$', label: 'US dollars ($)' },
  gbp: { symbol: '£', label: 'British pounds (£)' },
  eur: { symbol: '€', label: 'Euros (€)' },
  ils: { symbol: '₪', label: 'Israeli shekels (₪)' },
};

// How many of each currency one US dollar buys
export type Rates = Record<Exclude<Currency, 'usd'>, number>;

export const USD_PRICES: Record<string, number> = {
  // 1:1 packages
  'starter-1': 249,
  'starter-2': 449,
  'standard-1': 549,
  'standard-2': 749,
  'specialized-1': 1229,
  'specialized-2': 1429,
  // À la carte calls
  troubleshooting: 99,
  weekend: 199,
  // Digital products
  'reset-to-rest': 37,
  'calm-nights': 97,
  'calm-nights-bundle': 117,
  // Support add-ons (Mon–Fri check-ins)
  'support-1w': 100,
  'support-2w': 200,
  'support-3w': 300,
  'support-4w': 400,
  // Display only
  referral: 100, // the credit each family receives
  'bundle-separately': 134, // Reset to Rest + Calm Nights bought separately (the bundle's "was" price)
};

// Legacy package ids still accepted by checkout
const ALIASES: Record<string, string> = { starter: 'starter-1', standard: 'standard-1', specialized: 'specialized-1' };

// Whole units of `cur` for a product, or undefined if the product is unknown
export function priceOf(id: string, cur: Currency, rates: Rates): number | undefined {
  const usd = USD_PRICES[ALIASES[id] || id];
  if (usd === undefined) return undefined;
  if (cur === 'usd') return usd;
  // Round to 6 decimals first so float noise (e.g. 196.00000001) never bumps a price up a unit
  return Math.ceil(Number((usd * rates[cur]).toFixed(6)));
}

// "$1,229", "£972", "€1,056", "₪4,474"
export function formatPrice(amount: number, cur: Currency): string {
  return CURRENCY_INFO[cur].symbol + amount.toLocaleString('en-US');
}

// A formatter bound to one visitor's currency and the day's rates, for use in pages
export function pricer(cur: Currency, rates: Rates) {
  return (id: string): string => {
    const amount = priceOf(id, cur, rates);
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
