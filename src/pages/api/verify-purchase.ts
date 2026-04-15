import type { APIRoute } from 'astro';

export const prerender = false;

// Simple in-memory store for purchased session tokens
// In production, use a database like Supabase, Firebase, or Redis
const purchasedSessions = new Set<string>();

// Generate a secure random token
function generateToken(): string {
  return crypto.randomUUID();
}

// Verify purchase and set session cookie
export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const body = await request.json().catch(() => ({}));
    const { sessionId } = body as { sessionId?: string };

    // In production, verify the Stripe session ID is valid and paid
    // For now, we'll trust that this endpoint is only called from our Stripe success redirect
    if (!sessionId) {
      return new Response(
        JSON.stringify({ error: 'Missing session ID' }),
        { status: 400, headers: { 'content-type': 'application/json' } }
      );
    }

    // Generate a secure token
    const token = generateToken();
    
    // Store the token (in production, store in database with expiry)
    purchasedSessions.add(token);

    // Set secure HTTP-only cookie (expires in 1 year)
    cookies.set('reset_access', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/'
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'content-type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('[Verify Purchase] Error:', err);
    return new Response(
      JSON.stringify({ error: err?.message || 'Unknown error' }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
};

// Check if user has valid access
export const GET: APIRoute = async ({ cookies }) => {
  try {
    const token = cookies.get('reset_access')?.value;
    
    if (!token || !purchasedSessions.has(token)) {
      return new Response(
        JSON.stringify({ hasAccess: false }),
        { status: 200, headers: { 'content-type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ hasAccess: true }),
      { status: 200, headers: { 'content-type': 'application/json' } }
    );
  } catch (err: any) {
    console.error('[Verify Purchase] Error:', err);
    return new Response(
      JSON.stringify({ error: err?.message || 'Unknown error' }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
};
