import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { upsertContact, listForPackage, type BrevoList } from '../../lib/brevo';
import { CALM_NIGHTS_PACKAGES } from '../../lib/calmNights';
import { RESET_PACKAGES } from '../../lib/resetToRest';

const SITE = 'https://thyme4sleep.com';

export const prerender = false;

const stripeSecretKey = (import.meta as any).env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey, { apiVersion: '2024-06-20' }) : null;

// Store for purchased emails (in production, use a database)
const purchasedEmails = new Set<string>();

export const POST: APIRoute = async ({ request }) => {
  if (!stripe) {
    return new Response('Stripe not configured', { status: 500 });
  }

  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig) {
    return new Response('Missing signature', { status: 400 });
  }

  try {
    // In production, set STRIPE_WEBHOOK_SECRET in your .env
    const webhookSecret = (import.meta as any).env.STRIPE_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      // On the live site, never trust an unsigned event: anyone could post a fake purchase.
      // Stripe retries failed deliveries for up to 3 days, so nothing is lost once the secret is set.
      if (import.meta.env.PROD) {
        console.error('[Stripe Webhook] STRIPE_WEBHOOK_SECRET is not set: refusing unverified event');
        return new Response('Webhook signing secret not configured', { status: 500 });
      }
      console.warn('[Stripe Webhook] STRIPE_WEBHOOK_SECRET not set - skipping signature verification (dev only)');
      // For development, parse the event without verification
      const event = JSON.parse(body);
      await handleEvent(event);
      return new Response(JSON.stringify({ received: true }), { status: 200 });
    }

    const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    await handleEvent(event);

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (err: any) {
    console.error('[Stripe Webhook] Error:', err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
};

async function handleEvent(event: Stripe.Event) {
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const packageId = session.metadata?.packageId;

    // Add every buyer to the matching Brevo list: this starts the post-purchase flow
    // and (for 1:1 clients) removes them from the sales emails.
    const buyer = session.customer_details?.email;
    const list = listForPackage(packageId);
    if (buyer && list) {
      const lists: BrevoList[] = packageId === 'calm-nights-bundle' ? ['calm', 'reset'] : [list];
      // Personal access links for the purchase emails: they open the product on any device
      // (see src/pages/access.astro). Only the links this purchase includes are set, so an
      // earlier purchase's link is kept.
      const link = `${SITE}/access?s=${session.id}`;
      await upsertContact(buyer.toLowerCase(), {
        FIRSTNAME: (session.customer_details?.name || '').split(' ')[0],
        LAST_PURCHASE: packageId || '',
        RESET_LINK: packageId && RESET_PACKAGES.includes(packageId) ? link : '',
        CALM_LINK: packageId && CALM_NIGHTS_PACKAGES.includes(packageId) ? link : '',
      }, lists);
    }
    
    // Check if this is a Reset to Rest purchase
    if (session.metadata?.packageId === 'reset-to-rest') {
      const email = session.customer_details?.email;
      if (email) {
        purchasedEmails.add(email.toLowerCase());
        console.log('[Stripe Webhook] Reset to Rest purchased by:', email);
      }
    }
  }
}

// Export function to check if email has purchased
export function hasEmailPurchased(email: string): boolean {
  return purchasedEmails.has(email.toLowerCase());
}
