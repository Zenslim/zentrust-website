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
  Heart,
  ArrowLeft,
  ArrowRight,
  Leaf,
  TreePine,
  Users,
  Microscope,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { calculateDonationImpact } from "@/lib/calculator";

// ---------------------------------------------------------------------------
// Stripe Setup
// ---------------------------------------------------------------------------

const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripePublicKey ? loadStripe(stripePublicKey) : null;

type Frequency = "once" | "monthly";
type PaymentStatus = "idle" | "loading" | "submitting" | "error";

// ---------------------------------------------------------------------------
// Helper Components
// ---------------------------------------------------------------------------

function PaymentForm({
  amount,
  frequency,
  buttonLabel,
  onSuccess,
  setError,
  setStatus,
}: {
  amount: number;
  frequency: Frequency;
  buttonLabel: (processing: boolean) => string;
  onSuccess: () => void;
  setError: (msg: string | null) => void;
  setStatus: (s: PaymentStatus) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!stripe || !elements) {
      setError("The stewardship payment system is not ready yet. Please try again.");
      return;
    }

    try {
      setIsProcessing(true);
      setStatus("submitting");

      let result;

      if (frequency === "monthly") {
        // ✅ SetupIntent flow
        result = await stripe.confirmSetup({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/stewardship/thank-you`,
          },
          redirect: "if_required",
        });
      } else {
        // ✅ PaymentIntent flow
        result = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/stewardship/thank-you`,
          },
          redirect: "if_required",
        });
      }

      const { error } = result || {};

      if (error) {
        console.error(error);
        setError(error.message || "Payment attempt failed. Try another card.");
        setIsProcessing(false);
        setStatus("idle");
        return;
      }

      onSuccess();
    } catch (err) {
      console.error(err);
      setError("Unexpected error occurred. Please try again.");
      setIsProcessing(false);
      setStatus("idle");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-xl border border-border/60 bg-muted/40 p-4">
        <PaymentElement options={{ layout: "tabs" }} />
      </div>

      <Button type="submit" className="w-full inline-flex items-center justify-center gap-2">
        {buttonLabel(isProcessing)}
        <ArrowRight className="h-4 w-4" />
      </Button>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Main Page Component
// ---------------------------------------------------------------------------

export default function StewardshipPaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const amountFromQuery = Number(searchParams.get("amount") || "50");
  const frequencyQuery = (searchParams.get("frequency") as Frequency) || "once";
  const pathFromQuery = searchParams.get("path") || "flexible";

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [status, setStatus] = useState<PaymentStatus>("loading");
  const [error, setError] = useState<string | null>(null);

  const amount = useMemo(
    () => (amountFromQuery > 0 ? amountFromQuery : 50),
    [amountFromQuery]
  );

  const frequency: Frequency =
    frequencyQuery === "monthly" ? "monthly" : "once";

  const impact = useMemo(() => calculateDonationImpact(amount), [amount]);

  const buttonLabel = (processing: boolean) =>
    processing
      ? "Processing…"
      : `Confirm $${amount} ${
          frequency === "monthly" ? "/month" : "one-time"
        } resource flow`;

  // Create Intent
  useEffect(() => {
    if (!stripePromise) {
      setError("Stripe publishable key missing.");
      setStatus("error");
      return;
    }

    const createIntent = async () => {
      try {
        setStatus("loading");

        const res = await fetch("/api/stewardship/create-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount,
            frequency,
            impactPath: pathFromQuery,
          }),
        });

        if (!res.ok) throw new Error("Could not create stewardship session.");

        const data = await res.json();
        if (!data.clientSecret) throw new Error("Missing client secret.");

        setClientSecret(data.clientSecret);
        setStatus("idle");
      } catch (err: any) {
        setError(err.message || "Unable to prepare Stripe session.");
        setStatus("error");
      }
    };

    createIntent();
  }, [amount, frequency, pathFromQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/40">
      <div className="container mx-auto px-4 py-12 lg:py-20">
        {clientSecret && status !== "error" && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: { theme: "flat" },
              mode: frequency === "monthly" ? "setup" : "payment", // 🔧 THIS LINE FIXES EVERYTHING
            }}
          >
            <PaymentForm
              amount={amount}
              frequency={frequency}
              buttonLabel={buttonLabel}
              onSuccess={() => router.push("/stewardship/thank-you")}
              setError={setError}
              setStatus={setStatus}
            />
          </Elements>
        )}
      </div>
    </div>
  );
}
