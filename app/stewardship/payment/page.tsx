"use client";

export const dynamic = "force-dynamic";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Leaf,
  TreePine,
  Users,
  Microscope,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { calculateDonationImpact } from "@/lib/calculator";

// ─────────────────────────────────────────────
// Stripe
// ─────────────────────────────────────────────

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

type Frequency = "once" | "monthly";
type PaymentStatus = "idle" | "loading" | "submitting" | "error";

// ─────────────────────────────────────────────
// Payment Form (CRITICAL FIX HERE)
// ─────────────────────────────────────────────

function PaymentForm({
  frequency,
  buttonLabel,
  onSuccess,
  setError,
  setStatus,
}: {
  frequency: Frequency;
  buttonLabel: (processing: boolean) => string;
  onSuccess: () => void;
  setError: (msg: string | null) => void;
  setStatus: (s: PaymentStatus) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [processing, setProcessing] = useState(false);
  const [elementsReady, setElementsReady] = useState(false); // 🔑 REQUIRED

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 🔒 HARD GATE (this prevents your error)
    if (!stripe || !elements || !elementsReady) {
      setError("Payment form is still loading. Please wait.");
      return;
    }

    try {
      setProcessing(true);
      setStatus("submitting");

      const result =
        frequency === "monthly"
          ? await stripe.confirmSetup({
              elements,
              confirmParams: {
                return_url: `${window.location.origin}/stewardship/thank-you`,
              },
              redirect: "if_required",
            })
          : await stripe.confirmPayment({
              elements,
              confirmParams: {
                return_url: `${window.location.origin}/stewardship/thank-you`,
              },
              redirect: "if_required",
            });

      if (result.error) {
        setError(result.error.message ?? "Payment failed.");
        setProcessing(false);
        setStatus("idle");
        return;
      }

      onSuccess();
    } catch (err) {
      console.error(err);
      setError("Unexpected payment error.");
      setProcessing(false);
      setStatus("idle");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-xl border border-border/60 bg-muted/40 p-4">
        <PaymentElement
          options={{ layout: "tabs" }}
          onReady={() => setElementsReady(true)} // 🔑 THIS IS THE FIX
        />
      </div>

      <Button
        type="submit"
        disabled={!elementsReady || processing}
        className="w-full flex items-center justify-center gap-2"
      >
        {buttonLabel(processing)}
        <ArrowRight className="h-4 w-4" />
      </Button>
    </form>
  );
}

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function StewardshipPaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const amount = Math.max(Number(searchParams.get("amount") ?? 50), 1);
  const frequency: Frequency =
    searchParams.get("frequency") === "monthly" ? "monthly" : "once";
  const path = searchParams.get("path") ?? "flexible";

  const impact = useMemo(() => calculateDonationImpact(amount), [amount]);

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [status, setStatus] = useState<PaymentStatus>("loading");
  const [error, setError] = useState<string | null>(null);

  const buttonLabel = (processing: boolean) =>
    processing
      ? "Processing…"
      : `Confirm $${amount} ${
          frequency === "monthly" ? "/month" : "one-time"
        } stewardship`;

  // ─────────────────────────────────────────────
  // Create Intent
  // ─────────────────────────────────────────────

  useEffect(() => {
    const createIntent = async () => {
      try {
        setStatus("loading");

        const res = await fetch("/api/stewardship/create-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount,
            frequency,
            impactPath: path,
          }),
        });

        if (!res.ok) throw new Error("Failed to create Stripe session");

        const data = await res.json();
        if (!data.clientSecret) throw new Error("Missing client secret");

        setClientSecret(data.clientSecret);
        setStatus("idle");
      } catch (err: any) {
        console.error(err);
        setError(err.message ?? "Unable to prepare payment.");
        setStatus("error");
      }
    };

    createIntent();
  }, [amount, frequency, path]);

  // ─────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/40">
      <div className="container mx-auto max-w-5xl px-4 py-12">

        <Link
          href="/stewardship"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" />
          Back
        </Link>

        <div className="grid lg:grid-cols-[1.6fr_1.2fr] gap-12 mt-8">

          <div className="space-y-6">
            <h1 className="text-3xl font-bold">
              Finalize Your Stewardship
            </h1>

            {status === "error" && (
              <div className="rounded-xl bg-red-100 px-4 py-3 text-xs text-red-700">
                {error}
              </div>
            )}

            {clientSecret && status === "idle" && (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: { theme: "flat" },
                }}
              >
                <PaymentForm
                  frequency={frequency}
                  buttonLabel={buttonLabel}
                  onSuccess={() =>
                    router.push("/stewardship/thank-you")
                  }
                  setError={setError}
                  setStatus={setStatus}
                />
              </Elements>
            )}
          </div>

          <aside className="rounded-2xl bg-muted/60 p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              <h2 className="text-sm font-semibold">
                Regenerative Impact Preview
              </h2>
            </div>

            <Metric icon={TreePine} label="Trees" value={impact.trees} />
            <Metric icon={Leaf} label="Acres" value={impact.acres} />
            <Metric icon={Users} label="Households" value={impact.households} />
            {impact.research_plots > 0 && (
              <Metric
                icon={Microscope}
                label="Research Plots"
                value={impact.research_plots}
              />
            )}
          </aside>

        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Metric
// ─────────────────────────────────────────────

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
}) {
  return (
    <div className="flex justify-between text-sm">
      <span className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4 text-primary" />
        {label}
      </span>
      <span className="font-semibold">{value.toLocaleString()}</span>
    </div>
  );
}
