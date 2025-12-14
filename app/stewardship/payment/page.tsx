"use client";

export const dynamic = "force-dynamic";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

import {
  Lock,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

// -----------------------------------------------------------------------------
// Stripe setup
// -----------------------------------------------------------------------------

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

type Frequency = "once" | "monthly";
type Status = "loading" | "idle" | "submitting" | "error";

// -----------------------------------------------------------------------------
// Payment Form (FIXED: clientSecret is REQUIRED)
// -----------------------------------------------------------------------------

function PaymentForm({
  amount,
  frequency,
  clientSecret,
  onSuccess,
  setError,
  setStatus,
}: {
  amount: number;
  frequency: Frequency;
  clientSecret: string;
  onSuccess: () => void;
  setError: (msg: string | null) => void;
  setStatus: (s: Status) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!stripe || !elements) {
      setError("Payment system is not ready. Please try again.");
      return;
    }

    try {
      setProcessing(true);
      setStatus("submitting");

      const { error } = await stripe.confirmPayment({
        clientSecret, // 🔥 REQUIRED FOR SUBSCRIPTIONS
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/stewardship/thank-you`,
        },
        redirect: "if_required",
      });

      if (error) {
        console.error("Stripe confirm error:", error);

        const friendlyMessage =
          error.code === "card_declined"
            ? "Your card was declined. Please enter a valid card."
            : error.message || "Payment failed. Please try another card.";

        setError(friendlyMessage);
        setProcessing(false);
        setStatus("idle");
        return;
      }

      onSuccess();
    } catch (err) {
      console.error("Unexpected confirm error:", err);
      setError("Unexpected error occurred. Please try again.");
      setProcessing(false);
      setStatus("idle");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-xl border border-border/60 bg-muted/40 p-4">
        <PaymentElement options={{ layout: "tabs" }} />
      </div>

      <Button
        type="submit"
        className="w-full inline-flex items-center justify-center gap-2"
        disabled={processing}
      >
        {processing
          ? "Processing…"
          : `Confirm $${amount.toLocaleString()} ${
              frequency === "monthly" ? "/month" : "one-time"
            }`}
        <ArrowRight className="h-4 w-4" />
      </Button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Main Page
// -----------------------------------------------------------------------------

export default function StewardshipPaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawAmount = Number(searchParams.get("amount") || "50");
  const rawFrequency = searchParams.get("frequency");

  const amount = useMemo(
    () => (rawAmount > 0 ? rawAmount : 50),
    [rawAmount]
  );

  const frequency: Frequency =
    rawFrequency === "monthly" ? "monthly" : "once";

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);

  // ---------------------------------------------------------------------------
  // Create PaymentIntent / Subscription
  // ---------------------------------------------------------------------------

  useEffect(() => {
    const createIntent = async () => {
      try {
        setStatus("loading");
        setError(null);

        const res = await fetch("/api/stewardship/create-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount, frequency }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || "Unable to create payment session.");
        }

        if (!data.clientSecret) {
          throw new Error("Missing Stripe client secret.");
        }

        setClientSecret(data.clientSecret);
        setStatus("idle");
      } catch (err: any) {
        console.error("Create intent error:", err);
        setError(err.message || "Unable to create payment session.");
        setStatus("error");
      }
    };

    createIntent();
  }, [amount, frequency]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/40">

      {/* Security Bar */}
      <div className="border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="container mx-auto px-4 py-3 flex justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Lock className="h-3.5 w-3.5" />
            Secure payment via Stripe
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5" />
            ZenTrust · 501(c)(3) · EIN 33-4318487
          </div>
        </div>
      </div>

      {/* Page Body */}
      <div className="container mx-auto px-4 py-12 max-w-xl">

        <Link
          href="/stewardship/checkout"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to amount selection
        </Link>

        <div className="mt-8 space-y-6">
          <div>
            <h1 className="text-3xl font-bold">
              Finalize Stewardship Exchange
            </h1>
            <p className="text-muted-foreground mt-1">
              Confirming ${amount.toLocaleString()}{" "}
              {frequency === "monthly" ? "per month" : "one-time"}.
            </p>
          </div>

          <div className="glass-card p-8 rounded-2xl space-y-6">

            <div className="text-sm">
              <p className="text-xs uppercase text-muted-foreground">
                Summary
              </p>
              <p className="font-semibold">
                {frequency === "monthly"
                  ? `$${amount}/month resource flow`
                  : `$${amount} one-time resource flow`}
              </p>
            </div>

            {status === "loading" && (
              <div className="rounded-xl bg-muted/40 px-4 py-6 text-sm text-muted-foreground">
                Preparing secure payment session…
              </div>
            )}

            {error && (
              <div className="rounded-xl bg-destructive/10 border border-destructive/40 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {clientSecret && status !== "error" && (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: { theme: "flat" },
                }}
              >
                <PaymentForm
                  amount={amount}
                  frequency={frequency}
                  clientSecret={clientSecret}
                  onSuccess={() =>
                    router.push("/stewardship/thank-you")
                  }
                  setError={setError}
                  setStatus={setStatus}
                />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
