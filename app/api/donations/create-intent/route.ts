import { NextResponse } from "next/server"
import Stripe from "stripe"

export const runtime = "nodejs"

// Load Stripe secret key
const stripeSecret = process.env.STRIPE_SECRET_KEY
if (!stripeSecret) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable.")
}

// Initialize Stripe (no apiVersion override → prevents TS mismatch)
const stripe = new Stripe(stripeSecret)

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const amount = Number(body?.amount ?? 0)
    const frequency = body?.frequency === "monthly" ? "monthly" : "once"
    const impactPath = body?.impactPath || "flexible"

    // -------------------------------------------------------
    // 1) BASIC VALIDATION
    // -------------------------------------------------------
    if (!amount || amount < 1 || amount > 200000) {
      return NextResponse.json(
        { error: "Invalid donation amount." },
        { status: 400 }
      )
    }

    // Convert USD → cents
    const amountInCents = Math.round(amount * 100)

    // Shared metadata
    const metadata = {
      donationAmountUSD: amount.toString(),
      frequency,
      impactPath,
    }

    // -------------------------------------------------------
    // 2) ONE-TIME DONATION
    // -------------------------------------------------------
    if (frequency === "once") {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: "usd",
        automatic_payment_methods: { enabled: true },
        metadata,
      })

      return NextResponse.json({
        type: "one_time",
        clientSecret: paymentIntent.client_secret,
      })
    }

    // -------------------------------------------------------
    // 3) MONTHLY DONATION (Subscription)
    // -------------------------------------------------------

    // Step 1 — Create customer
    const customer = await stripe.customers.create({
      metadata,
    })

    // Step 2 — Create dynamic price for monthly donation
    const price = await stripe.prices.create({
      unit_amount: amountInCents,
      currency: "usd",
      recurring: { interval: "month" },
      product_data: {
        name: "ZenTrust Monthly Recurring Donation",
      },
      metadata,
    })

    // Step 3 — Create subscription in incomplete state
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: price.id }],
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"],
      metadata,
    })

    // -------------------------------------------------------
    // 4) EXTRACT CLIENT SECRET SAFELY
    // -------------------------------------------------------

    const latest = subscription.latest_invoice
    let clientSecret: string | null = null

    if (typeof latest === "object" && latest !== null) {
      const pi = latest.payment_intent
      if (pi && typeof pi !== "string") {
        clientSecret = (pi as Stripe.PaymentIntent).client_secret
      }
    }

    if (!clientSecret) {
      throw new Error(
        "Unable to obtain client secret for subscription PaymentIntent."
      )
    }

    // -------------------------------------------------------
    // 5) SEND RESPONSE TO CLIENT
    // -------------------------------------------------------
    return NextResponse.json({
      type: "subscription",
      clientSecret,
      subscriptionId: subscription.id,
    })
  } catch (err: any) {
    console.error("Stripe create-intent error:", err)
    return NextResponse.json(
      { error: err?.message ?? "Unable to create payment intent" },
      { status: 500 }
    )
  }
}
