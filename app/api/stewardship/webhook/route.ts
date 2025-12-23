import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecretKey || !webhookSecret) {
    console.error("❌ Stripe webhook configuration missing.");
    return NextResponse.json(
      { error: "Stripe configuration missing" },
      { status: 500 }
    );
  }

  const stripe = new Stripe(stripeSecretKey, {
    typescript: true,
  });

  const body = await req.text();
  const sig = headers().get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      { error: "Missing Stripe signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      webhookSecret
    );
  } catch (err: any) {
    console.error("❌ Invalid webhook signature:", err.message);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {

      // 1️⃣ Checkout completed
      case "checkout.session.completed": {
        const s = event.data.object as Stripe.Checkout.Session;

        console.log("✅ checkout.session.completed", {
          id: s.id,
          email: s.customer_details?.email,
          customer: s.customer,
          mode: s.mode,
          amount_total: s.amount_total,
        });

        break;
      }

      // 2️⃣ Payment succeeded
      case "payment_intent.succeeded": {
        const pi = event.data.object as Stripe.PaymentIntent;

        console.log("💰 payment_intent.succeeded", {
          id: pi.id,
          amount: pi.amount,
          currency: pi.currency,
          customer: pi.customer,
        });

        break;
      }

      // 3️⃣ Subscription created / updated
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;

        // 🔐 SAFE extraction (TS-proof)
        const currentPeriodEnd =
          "current_period_end" in sub
            ? (sub as any).current_period_end
            : null;

        console.log("🔁 subscription active", {
          id: sub.id,
          customer: sub.customer,
          status: sub.status,
          current_period_end: currentPeriodEnd,
        });

        break;
      }

      // 4️⃣ Subscription canceled
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;

        console.log("🛑 subscription canceled", {
          id: sub.id,
          customer: sub.customer,
        });

        break;
      }

      // 5️⃣ Invoice paid (monthly truth)
      case "invoice.paid": {
  const invoice = event.data.object as Stripe.Invoice;

  const subscriptionId =
    "subscription" in invoice
      ? (invoice as any).subscription
      : null;

  console.log("📄 invoice.paid", {
    id: invoice.id,
    customer: invoice.customer,
    amount_paid: invoice.amount_paid,
    subscription: subscriptionId,
  });

  break;
}

      default:
        console.log("ℹ️ Ignored event:", event.type);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("❌ Webhook handler failed:", err);
    return NextResponse.json(
      { error: "Webhook handler error" },
      { status: 500 }
    );
  }
}
