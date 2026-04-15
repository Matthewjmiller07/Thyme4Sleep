import type { APIRoute } from 'astro';
import Stripe from 'stripe';

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
      console.warn('[Stripe Webhook] STRIPE_WEBHOOK_SECRET not set - skipping signature verification');
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
