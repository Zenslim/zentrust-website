import { NextResponse } from "next/server"
import Stripe from "stripe"

export const runtime = "nodejs"

const stripeSecret = process.env.STRIPE_SECRET_KEY
if (!stripeSecret) throw new Error("Missing STRIPE_SECRET_KEY")

const stripe = new Stripe(stripeSecret)

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const amount = Number(body?.amount ?? 0)
    const frequency = body?.frequency === "monthly" ? "monthly" : "once"
    const impactPath = body?.impactPath || "flexible"

    if (!amount || amount < 1 || amount > 200000) {
      return NextResponse.json(
        { error: "Invalid donation amount." },
        { status: 400 }
      )
    }

    const amountInCents = Math.round(amount * 100)

    const metadata = {
      donationAmountUSD: amount.toString(),
      frequency,
      impactPath,
    }

    // -----------------------------------------------------
    // ONE-TIME DONATION
    // -----------------------------------------------------
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

    // -----------------------------------------------------
    // MONTHLY RECURRING DONATION
    // -----------------------------------------------------
    const customer = await stripe.customers.create({
      metadata,
    })

    const price = await stripe.prices.create({
      unit_amount: amountInCents,
      currency: "usd",
      recurring: { interval: "month" },
      product_data: {
        name: "ZenTrust Monthly Recurring Donation",
      },
      metadata,
    })

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: price.id }],
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"],
      metadata,
    })

    // -----------------------------------------------------
    // GET CLIENT SECRET FROM EXPANDED INVOICE
    // Stripe TS 2025: must use index access instead of .payment_intent
    // -----------------------------------------------------

    const latest = subscription.latest_invoice

    let clientSecret: string | null = null

    if (typeof latest === "object" && latest !== null) {
      // Access expanded fields using index access since Stripe types hide them
      const piRaw = (latest as any)["payment_intent"]

      if (piRaw && typeof piRaw !== "string") {
        clientSecret = (piRaw as Stripe.PaymentIntent).client_secret
      }
    }

    if (!clientSecret) {
      throw new Error("Unable to obtain client secret for subscription PaymentIntent.")
    }

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
