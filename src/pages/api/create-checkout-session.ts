import type { APIRoute } from 'astro';
import Stripe from 'stripe';

// This endpoint must run on the server (POST not supported for prerendered routes)
export const prerender = false;

// Expected environment variable: STRIPE_SECRET_KEY
// Access import.meta.env statically to satisfy Vite/SSR module runner
const stripeSecretKey = (import.meta as any).env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.warn('[Stripe] STRIPE_SECRET_KEY is not set. /api/create-checkout-session will fail until it is configured.');
}

const stripe = stripeSecretKey ? new Stripe(stripeSecretKey, { apiVersion: '2024-06-20' }) : (null as unknown as Stripe);

// Map our package IDs to product metadata
// Note: support distinct options for single vs multiple children
const PACKAGES: Record<string, { name: string; amountCents: number } > = {
  // Starter (legacy single) + explicit single/multiple
  starter: { name: 'Starter Sleep Package', amountCents: 24900 },
  'starter-1': { name: 'Starter Sleep Package (single child)', amountCents: 24900 },
  'starter-2': { name: 'Starter Sleep Package (multiples)', amountCents: 44900 },

  // Standard (multiple pricing options)
  'standard-1': { name: 'Standard Sleep Package (single child)', amountCents: 54900 },
  'standard-2': { name: 'Standard Sleep Package (multiples)', amountCents: 74900 },
  // Back-compat key if any legacy links still reference it
  standard: { name: 'Standard Sleep Package', amountCents: 54900 },

  // Specialized (SEN) (multiple pricing options)
  'specialized-1': { name: 'Specialized Sleep Support (single child)', amountCents: 122900 },
  'specialized-2': { name: 'Specialized Sleep Support (multiples)', amountCents: 142900 },
  // Back-compat
  specialized: { name: 'Specialized Sleep Support', amountCents: 122900 },

  // A la carte
  troubleshooting: { name: '60-Minute Troubleshooting Call', amountCents: 9900 },
  weekend: { name: 'Weekend/Holiday Consult', amountCents: 19900 },
};

const ADDONS: Record<string, { name: string; amountCents: number }> = {
  'support-1w': { name: 'Additional Support (1 Week, Mon–Fri)', amountCents: 10000 },
  'support-2w': { name: 'Additional Support (2 Weeks, Mon–Fri)', amountCents: 20000 },
  'support-3w': { name: 'Additional Support (3 Weeks, Mon–Fri)', amountCents: 30000 },
  'support-4w': { name: 'Additional Support (4 Weeks, Mon–Fri)', amountCents: 40000 },
};

// Simple health-check for local debugging (do not expose secrets)
export const GET: APIRoute = async () => {
  try {
    return new Response(
      JSON.stringify({ ok: true, hasStripeKey: Boolean(stripeSecretKey) }),
      { status: 200, headers: { 'content-type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ ok: false, error: err?.message || 'Unknown error' }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
};

export const POST: APIRoute = async ({ request, url }) => {
  try {
    if (!stripe) {
      return new Response(
        JSON.stringify({ error: 'Stripe is not configured on the server.' }),
        { status: 500, headers: { 'content-type': 'application/json' } }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { packageId, promoCode, addOnId } = body as { packageId?: string; promoCode?: string; addOnId?: string };

    if (!packageId || !PACKAGES[packageId]) {
      return new Response(JSON.stringify({ error: 'Invalid or missing packageId.' }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      });
    }

    const pkg = PACKAGES[packageId];
    let addOn = null as null | { name: string; amountCents: number };

    if (addOnId) {
      if (!ADDONS[addOnId]) {
        return new Response(JSON.stringify({ error: 'Invalid addOnId.' }), {
          status: 400,
          headers: { 'content-type': 'application/json' },
        });
      }

      const isStandard = packageId.startsWith('standard');
      const isSpecialized = packageId.startsWith('specialized') || packageId.startsWith('sen');
      if (!(isStandard || isSpecialized)) {
        return new Response(JSON.stringify({ error: 'Add-on not available for this package.' }), {
          status: 400,
          headers: { 'content-type': 'application/json' },
        });
      }

      addOn = ADDONS[addOnId];
    }

    // Determine post-payment redirect
    // Send all purchases to a unified thank-you page with the package id
    const origin = `${url.protocol}//${url.host}`; // respects current host
    const successUrl = `${origin}/thank-you?pkg=${encodeURIComponent(packageId)}`;
    const cancelUrl = `${origin}/pricing`;

    // Handle promo codes
    // If promoCode is 'FREE', create a one-time 100% off coupon on the fly.
    // Otherwise, ignore or look up existing promotion codes in Stripe (future enhancement).
    let discounts: Stripe.Checkout.SessionCreateParams.Discount[] | undefined = undefined;
    if (promoCode && typeof promoCode === 'string' && promoCode.trim().toUpperCase() === 'FREE') {
      const coupon = await stripe.coupons.create({ percent_off: 100, duration: 'once', name: 'FREE' });
      discounts = [{ coupon: coupon.id }];
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
      {
        price_data: {
          currency: 'usd',
          unit_amount: pkg.amountCents,
          product_data: { name: pkg.name },
        },
        quantity: 1,
      },
    ];

    if (addOn) {
      lineItems.push({
        price_data: {
          currency: 'usd',
          unit_amount: addOn.amountCents,
          product_data: { name: addOn.name },
        },
        quantity: 1,
      });
    }

    const metadata: Record<string, string> = { packageId };
    if (addOnId) {
      metadata.addOnId = addOnId;
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      allow_promotion_codes: true, // enables code field on Stripe-hosted page for other codes you may set up in dashboard
      line_items: lineItems,
      discounts,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (err: any) {
    console.error('[Stripe Checkout] Error creating session:', err);
    return new Response(JSON.stringify({ error: err?.message || 'Unknown error' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
};
