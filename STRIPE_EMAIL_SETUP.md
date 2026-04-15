# Stripe Automated Email Delivery Setup

## Overview
This guide explains how to automatically send the Reset to Rest PDF to customers via email after they purchase through Stripe.

## Option 1: Stripe Email Receipts (Simplest)

### Steps:
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Settings** → **Emails**
3. Enable **Successful payments** emails
4. Customize the email template to include:
   - Thank you message
   - Link to download the PDF: `https://thyme4sleep.com/reset?purchased=true`
   - Instructions for accessing the content

### Limitations:
- Cannot attach PDF directly to Stripe receipt emails
- Customer must click link to access content (protected by cookie)

## Option 2: Stripe Webhooks + Email Service (Recommended)

### What You Need:
- Email service (SendGrid, Mailgun, AWS SES, or Resend)
- Webhook endpoint already created at `/api/stripe-webhook.ts`

### Setup Steps:

#### 1. Choose an Email Service
**Recommended: Resend** (easiest for developers)
- Sign up at https://resend.com
- Get API key
- Add to `.env`: `RESEND_API_KEY=your_key_here`

#### 2. Install Email Package
```bash
npm install resend
```

#### 3. Update Webhook Handler
The webhook at `/src/pages/api/stripe-webhook.ts` already captures purchase events.

Add email sending logic:

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function handleEvent(event: Stripe.Event) {
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    if (session.metadata?.packageId === 'reset-to-rest') {
      const email = session.customer_details?.email;
      const name = session.customer_details?.name;
      
      if (email) {
        // Send email with PDF
        await resend.emails.send({
          from: 'Georgia <georgia@thyme4sleep.com>',
          to: email,
          subject: 'Your Reset to Rest Guide is Ready!',
          html: `
            <h1>Thank you, ${name}!</h1>
            <p>Your Reset to Rest guide is ready. Click below to access:</p>
            <a href="https://thyme4sleep.com/reset?purchased=true">Access Your Guide</a>
            <p>You can also download the PDF directly: 
               <a href="https://thyme4sleep.com/reset-to-rest-full.pdf">Download PDF</a>
            </p>
          `,
          attachments: [
            {
              filename: 'reset-to-rest-guide.pdf',
              path: './public/reset-to-rest-full.pdf'
            }
          ]
        });
      }
    }
  }
}
```

#### 4. Configure Stripe Webhook
1. Go to **Stripe Dashboard** → **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Enter URL: `https://thyme4sleep.com/api/stripe-webhook`
4. Select events: `checkout.session.completed`
5. Copy the **Signing secret**
6. Add to `.env`: `STRIPE_WEBHOOK_SECRET=whsec_...`

#### 5. Test the Webhook
1. Use Stripe CLI: `stripe listen --forward-to localhost:4321/api/stripe-webhook`
2. Make a test purchase
3. Verify email is sent

## Option 3: Third-Party Integration (No Code)

### Zapier Integration:
1. Create Zap: **Stripe** → **Email by Zapier**
2. Trigger: New Successful Payment
3. Filter: Product ID = "reset-to-rest"
4. Action: Send Email with PDF attachment
5. Template:
   - To: {{customer_email}}
   - Subject: "Your Reset to Rest Guide"
   - Attachment: Upload PDF to Zapier
   - Body: Include access link

## Current Implementation

✅ **Already Set Up:**
- Stripe checkout for $37 product
- Secure cookie-based access to `/reset` page
- Purchase success page that sets authentication cookie
- Webhook endpoint ready at `/api/stripe-webhook.ts`

⚠️ **Still Needed:**
- Email service integration (Resend recommended)
- PDF attachment in automated email
- Webhook secret configuration

## Testing

### Test Mode:
1. Use Stripe test card: `4242 4242 4242 4242`
2. Any future expiry date
3. Any CVC
4. Check that email is sent to test email address

### Production:
1. Deploy webhook endpoint
2. Configure Stripe webhook in production
3. Test with real (small) purchase
4. Verify customer receives email with PDF

## Security Notes

- ✅ Cookie-based authentication prevents link sharing
- ✅ HTTP-only cookies protect against XSS
- ✅ Webhook signature verification prevents spoofing
- ✅ PDF is publicly accessible but content page is protected

## Support

For issues:
1. Check Stripe webhook logs in dashboard
2. Check server logs for email sending errors
3. Verify environment variables are set correctly
