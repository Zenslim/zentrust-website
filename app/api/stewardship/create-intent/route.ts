import { NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";

export const runtime = "nodejs";

// Initialize Stripe with error handling
let stripe: Stripe;
try {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY environment variable is not set");
  }
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-11-20.acacia",
    typescript: true,
  });
} catch (error) {
  console.error("Failed to initialize Stripe:", error);
}

// ─────────────────────────────
// Validation
// ─────────────────────────────
const DonationSchema = z.object({
  amount: z.number().min(1).max(200000),
  frequency: z.enum(["once", "monthly"]),
  impactPath: z.string().optional().default("flexible"),
  name: z.string().optional(),
  email: z.string().email().optional(),
});

export async function POST(req: Request) {
  try {
    console.log("=== Stripe Intent Creation Started ===");
    
    // Check if Stripe is initialized
    if (!stripe) {
      console.error("Stripe not initialized");
      return NextResponse.json(
        { error: "Payment system not configured properly" },
        { status: 500 }
      );
    }

    const body = await req.json();
    console.log("Request body:", JSON.stringify(body, null, 2));

    const parsed = DonationSchema.safeParse(body);
    if (!parsed.success) {
      console.error("Validation failed:", parsed.error.format());
      return NextResponse.json(
        { error: "Invalid request data", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { amount, frequency, impactPath, email, name } = parsed.data;
    const amountInCents = Math.round(amount * 100);

    console.log("Processing donation:", { 
      amount, 
      amountInCents, 
      frequency, 
      impactPath, 
      email: email ? "provided" : "missing",
      name: name ? "provided" : "missing"
    });

    const metadata = {
      donationAmountUSD: amount.toString(),
      frequency,
      impactPath,
      timestamp: new Date().toISOString(),
    };

    // ─────────────────────────────
    // ONE-TIME DONATION
    // ─────────────────────────────
    if (frequency === "once") {
      console.log("Creating one-time payment intent...");
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: "usd",
        automatic_payment_methods: { 
          enabled: true,
          allow_redirects: "never"
        },
        metadata,
        description: `ZenTrust One-time Donation - $${amount}`,
      });

      console.log("PaymentIntent created:", {
        id: paymentIntent.id,
        amount: paymentIntent.amount,
        status: paymentIntent.status,
        client_secret: paymentIntent.client_secret ? "present" : "missing"
      });

      if (!paymentIntent.client_secret) {
        console.error("Missing client_secret in payment intent");
        throw new Error("Failed to create payment intent - missing client secret");
      }

      const response = NextResponse.json({
        type: "one_time",
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      });

      // Add cache control headers
      response.headers.set("Cache-Control", "no-store");
      return response;
    }

    // ─────────────────────────────
    // MONTHLY STEWARDSHIP
    // ─────────────────────────────

    console.log("Creating monthly subscription setup...");
    
    // 1️⃣ Create Customer
    const customer = await stripe.customers.create({
      email,
      name,
      metadata: {
        ...metadata,
        customerType: "stewardship"
      },
    });

    console.log("Customer created:", {
      id: customer.id,
      email: customer.email,
      name: customer.name
    });

    // 2️⃣ Create Price
    const price = await stripe.prices.create({
      currency: "usd",
      unit_amount: amountInCents,
      recurring: { interval: "month" },
      product_data: {
        name: "ZenTrust Monthly Stewardship",
        description: `Monthly resource flow - $${amount}`,
      },
      metadata: {
        ...metadata,
        priceType: "stewardship"
      }
    });

    console.log("Price created:", {
      id: price.id,
      amount: price.unit_amount,
      recurring: price.recurring?.interval
    });

    // 3️⃣ Create Subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ 
        price: price.id,
        metadata: {
          ...metadata,
          itemType: "stewardship_subscription"
        }
      }],
      payment_behavior: "default_incomplete",
      payment_settings: {
        save_default_payment_method: "on_subscription"
      },
      metadata: {
        ...metadata,
        subscriptionType: "stewardship"
      },
      expand: ["latest_invoice.payment_intent"],
    });

    console.log("Subscription created:", {
      id: subscription.id,
      status: subscription.status,
      customer: subscription.customer,
      items: subscription.items.data.length
    });

    // 4️⃣ Create SetupIntent
    const setupIntent = await stripe.setupIntents.create({
      customer: customer.id,
      payment_method_types: ["card"],
      usage: "off_session",
      metadata: {
        subscriptionId: subscription.id,
        ...metadata
      },
    });

    console.log("SetupIntent created:", {
      id: setupIntent.id,
      customer: setupIntent.customer,
      status: setupIntent.status,
      client_secret: setupIntent.client_secret ? "present" : "missing"
    });

    if (!setupIntent.client_secret) {
      console.error("Missing client_secret in setup intent");
      throw new Error("Failed to create setup intent - missing client secret");
    }

    const response = NextResponse.json({
      type: "subscription",
      clientSecret: setupIntent.client_secret,
      subscriptionId: subscription.id,
      customerId: customer.id,
      priceId: price.id,
      setupIntentId: setupIntent.id,
    });

    // Add cache control headers
    response.headers.set("Cache-Control", "no-store");
    
    console.log("=== Stripe Intent Creation Completed Successfully ===");
    return response;

  } catch (error: any) {
    console.error("=== Stripe Intent Creation Failed ===");
    console.error("Error type:", error.constructor.name);
    console.error("Error message:", error.message);
    console.error("Error details:", error);
    
    // Provide more specific error messages
    let errorMessage = "Internal server error";
    let statusCode = 500;

    if (error.message?.includes("Invalid API key")) {
      errorMessage = "Payment system configuration error";
      statusCode = 503;
    } else if (error.message?.includes("validation")) {
      errorMessage = "Invalid request data";
      statusCode = 400;
    } else if (error.message?.includes("missing")) {
      errorMessage = "Required payment configuration is missing";
      statusCode = 503;
    } else if (error.message) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { 
        error: errorMessage,
        details: error.message || "Unknown error occurred",
        timestamp: new Date().toISOString()
      },
      { 
        status: statusCode,
        headers: {
          "Cache-Control": "no-store"
        }
      }
    );
  }
}
