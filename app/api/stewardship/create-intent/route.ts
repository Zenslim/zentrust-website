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
      amount > MAX_AMOUNT_USD
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

    const amountInCents = Math.round(amount * 100);

    // -------------------------------------------------------------------------
    // ONE-TIME PAYMENT
    // -------------------------------------------------------------------------

    if (frequency === "once") {
      const intent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: "usd",
        automatic_payment_methods: { enabled: true },
        metadata: {
          purpose: "zentrust_stewardship",
          frequency: "once",
        },
      });

      return NextResponse.json({
        clientSecret: intent.client_secret,
      });
    }

    // -------------------------------------------------------------------------
    // MONTHLY SUBSCRIPTION
    // -------------------------------------------------------------------------

    const customer = await stripe.customers.create({
      metadata: {
        purpose: "zentrust_stewardship",
        frequency: "monthly",
      },
    });

    const price = await stripe.prices.create({
      currency: "usd",
      unit_amount: amountInCents,
      recurring: { interval: "month" },
      product_data: {
        name: "ZenTrust Monthly Stewardship",
      },
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: price.id }],
      payment_behavior: "default_incomplete",
      payment_settings: {
        save_default_payment_method: "on_subscription",
      },
      expand: ["latest_invoice.payment_intent"],
      metadata: {
        purpose: "zentrust_stewardship",
        frequency: "monthly",
      },
    });

    // -------------------------------------------------------------------------
    // SAFELY EXTRACT PAYMENT INTENT (TypeScript-correct)
    // -------------------------------------------------------------------------

    const invoice = subscription.latest_invoice;

    if (
      !invoice ||
      typeof invoice !== "object" ||
      !("payment_intent" in invoice)
    ) {
      throw new Error("Missing invoice payment intent.");
    }

    const paymentIntent = invoice.payment_intent;

    if (
      !paymentIntent ||
      typeof paymentIntent !== "object" ||
      !("client_secret" in paymentIntent)
    ) {
      throw new Error("Invalid payment intent on invoice.");
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
