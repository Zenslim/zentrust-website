// Temporary: disable Stripe webhook until env vars are set properly.
// This avoids build-time crashes on Vercel.

export async function POST() {
  console.warn("Stripe webhook disabled — Missing STRIPE_WEBHOOK_SECRET.")
  return new Response("Webhook disabled (no secret)", { status: 200 })
}
