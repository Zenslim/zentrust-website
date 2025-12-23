export const runtime = "nodejs";

import { NextResponse } from "next/server";
import Stripe from "stripe";

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
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    const monthlyPriceId = process.env.STRIPE_MONTHLY_PRICE_ID;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    if (!stripeSecretKey || !siteUrl) {
      console.error("❌ Stripe environment variables are missing.");
      return NextResponse.json(
        { error: "Stripe configuration missing" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(stripeSecretKey, {
      typescript: true,
    });

    const { amount, frequency } = (await req.json()) as {
      amount: number;
      frequency: Frequency;
    };

    // ------------------ Validation ------------------

    if (
      typeof amount !== "number" ||
      !Number.isInteger(amount) ||
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

    // ------------------ ONE-TIME ------------------

    if (frequency === "once") {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              unit_amount: amount * 100,
              product_data: {
                name: "ZenTrust One-Time Stewardship",
              },
            },
            quantity: 1,
          },
        ],
        success_url: `${siteUrl}/stewardship/thank-you`,
        cancel_url: `${siteUrl}/stewardship/checkout`,
        metadata: {
          purpose: "zentrust_stewardship",
          frequency: "once",
          amount_usd: amount.toString(),
        },
      });

      return NextResponse.json({ url: session.url });
    }

    // ------------------ MONTHLY (FIXED) ------------------

    if (!monthlyPriceId) {
      throw new Error("Missing STRIPE_MONTHLY_PRICE_ID");
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: monthlyPriceId, // $1/month
          quantity: amount,         // slider value
        },
      ],
      success_url: `${siteUrl}/stewardship/thank-you`,
      cancel_url: `${siteUrl}/stewardship/checkout`,
      subscription_data: {
        metadata: {
          purpose: "zentrust_stewardship",
          frequency: "monthly",
          amount_usd: amount.toString(),
        },
      },
    });

    return NextResponse.json({ url: session.url });

  } catch (error: any) {
    console.error("Create intent error:", error);
    return NextResponse.json(
      { error: error.message || "Stripe error" },
      { status: 500 }
    );
  }
}
