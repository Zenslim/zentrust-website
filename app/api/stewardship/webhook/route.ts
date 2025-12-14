import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("stripe-signature");

  if (!signature) {
    return new NextResponse("Missing signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("❌ Webhook signature failed", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  try {
    switch (event.type) {

      // 1️⃣ Donor identity (email + customer)
      case "checkout.session.completed": {
        const s = event.data.object as Stripe.Checkout.Session;

        await upsertDonor({
          email: s.customer_details?.email!,
          stripe_customer_id: s.customer as string,
        });
        break;
      }

      // 2️⃣ One-time payment landed
      case "payment_intent.succeeded": {
        const pi = event.data.object as Stripe.PaymentIntent;

        await recordPayment({
          stripe_payment_intent_id: pi.id,
          stripe_customer_id: pi.customer as string,
          amount_usd: pi.amount / 100,
          kind: "one_time",
          event: event.type,
        });
        break;
      }

      // 3️⃣ Monthly payment landed
      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;

        await recordPayment({
          stripe_payment_intent_id: invoice.payment_intent as string,
          stripe_customer_id: invoice.customer as string,
          stripe_subscription_id: invoice.subscription as string,
          amount_usd: invoice.amount_paid / 100,
          kind: "recurring",
          event: event.type,
        });
        break;
      }

      // 4️⃣ Monthly payment failed
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        await markSubscription(invoice.subscription as string, "past_due");
        break;
      }

      // 5️⃣ Subscription canceled
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        await markSubscription(sub.id, "canceled");
        break;
      }
    }

    return NextResponse.json({ received: true });

  } catch (err) {
    console.error("🔥 Webhook processing failed", err);
    return new NextResponse("Webhook handler error", { status: 500 });
  }
}
