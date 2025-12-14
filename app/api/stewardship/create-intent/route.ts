export const runtime = "nodejs";

import { NextResponse } from "next/server";
import Stripe from "stripe";

// -----------------------------------------------------------------------------
// Stripe initialization
// -----------------------------------------------------------------------------

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

// -----------------------------------------------------------------------------
// Config
// -----------------------------------------------------------------------------

const MIN_AMOUNT_USD = 5;
const MAX_AMOUNT_USD = 1000;

type Frequency = "once" | "monthly";

// REQUIRED:
// This must be a $1.00 / month recurring price created ONCE in Stripe
const MONTHLY_PRICE_ID = process.env.STRIPE_MONTHLY_PRICE_ID!;

// -----------------------------------------------------------------------------
// POST handler
// -----------------------------------------------------------------------------

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, frequency } = body as {
      amount: number;
      frequency: Frequency;
    };

    // -------------------------------------------------------------------------
    // Validation
    // -------------------------------------------------------------------------

    if (
      typeof amount !== "number" ||
      Number.isNaN(amount) ||
      amount < MIN_AMOUNT_USD ||
      amount > MAX_AMOUNT_USD ||
      !Number.isInteger(amount)
    ) {
      return NextResponse.json(
        { error: "Invalid amount." },
        { status: 400 }
      );
    }

    if (frequency !== "once" && frequency !== "monthly") {
      return NextResponse.json(
        { error: "Invalid frequency." },
        { status: 400 }
      );
    }

    const amountInCents = amount * 100;

    // -------------------------------------------------------------------------
    // ONE-TIME PAYMENT (PaymentIntent)
    // -------------------------------------------------------------------------

    if (frequency === "once") {
      const intent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: "usd",
        automatic_payment_methods: { enabled: true },
        metadata: {
          purpose: "zentrust_stewardship",
          frequency: "once",
          amount_usd: amount.toString(),
        },
      });

      return NextResponse.json({
        clientSecret: intent.client_secret,
      });
    }

    // -------------------------------------------------------------------------
    // MONTHLY SUBSCRIPTION ($1 price × quantity)
    // -------------------------------------------------------------------------

    if (!MONTHLY_PRICE_ID) {
      throw new Error("Missing STRIPE_MONTHLY_PRICE_ID");
    }

    // Create customer
    const customer = await stripe.customers.create({
      metadata: {
        purpose: "zentrust_stewardship",
        frequency: "monthly",
      },
    });

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price: MONTHLY_PRICE_ID, // $1/month
          quantity: amount,         // e.g. 5 → $5/month
        },
      ],
      collection_method: "charge_automatically", // 🔑 REQUIRED
      payment_behavior: "default_incomplete",
      payment_settings: {
        payment_method_types: ["card"], // 🔑 REQUIRED
        save_default_payment_method: "on_subscription",
      },
      expand: ["latest_invoice.payment_intent"],
      metadata: {
        purpose: "zentrust_stewardship",
        frequency: "monthly",
        amount_usd: amount.toString(),
      },
    });

    // -------------------------------------------------------------------------
    // Extract PaymentIntent safely
    // -------------------------------------------------------------------------

    const invoice = subscription.latest_invoice as Stripe.Invoice | null;
    const paymentIntent = invoice?.payment_intent as Stripe.PaymentIntent | null;

    if (!paymentIntent?.client_secret) {
      throw new Error("Missing subscription payment intent.");
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Create intent error:", error);

    return NextResponse.json(
      { error: "Unable to create payment intent." },
      { status: 500 }
    );
  }
}
