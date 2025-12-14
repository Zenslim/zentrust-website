import { NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// 1. Define Request Schema for safety
const DonationSchema = z.object({
  amount: z.number().min(1).max(200000),
  frequency: z.enum(["once", "monthly"]),
  impactPath: z.string().optional().default("flexible"),
  name: z.string().optional(),
  email: z.string().email().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate input
    const validated = DonationSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json({ error: "Invalid request data", details: validated.error.format() }, { status: 400 });
    }

    const { amount, frequency, impactPath, email, name } = validated.data;
    const amountInCents = Math.round(amount * 100);
    const metadata = { donationAmountUSD: amount.toString(), frequency, impactPath };

    // --- ONE-TIME DONATION ---
    if (frequency === "once") {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: "usd",
        automatic_payment_methods: { enabled: true },
        metadata,
      });

      return NextResponse.json({
        type: "one_time",
        clientSecret: paymentIntent.client_secret,
      });
    }

    // --- MONTHLY RECURRING (The 2025 Subscription Flow) ---
    const customer = await stripe.customers.create({ email, name, metadata });

    const price = await stripe.prices.create({
      currency: "usd",
      unit_amount: amountInCents,
      recurring: { interval: "month" },
      product_data: { name: "ZenTrust Monthly Recurring Donation" },
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: price.id }],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"], // Expand for legacy fallback
      metadata,
    });

    const latestInvoice = subscription.latest_invoice as Stripe.Invoice;
    
    // In 2025, Stripe recommends checking for confirmation_secret 
    // on the invoice for SCA-heavy regions.
    let clientSecret = (latestInvoice as any).confirmation_secret?.client_secret 
                    || (latestInvoice.payment_intent as Stripe.PaymentIntent)?.client_secret;

    if (!clientSecret) {
      throw new Error("Unable to retrieve payment secret.");
    }

    return NextResponse.json({
      type: "subscription",
      clientSecret,
      subscriptionId: subscription.id,
    });

  } catch (err: any) {
    console.error("Stripe Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
