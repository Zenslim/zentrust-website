"use client";

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

import { ArrowLeft, ArrowRight, Heart, TreePine, Leaf, Users, Microscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { calculateDonationImpact } from "@/lib/calculator";

// -----------------------------------------------------------------------------
// Stripe setup (ONE TIME, OUTSIDE COMPONENT)
// -----------------------------------------------------------------------------

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

type Frequency = "once" | "monthly";

// -----------------------------------------------------------------------------
// Checkout Form (PaymentElement NEVER UNMOUNTS)
// -----------------------------------------------------------------------------

function CheckoutForm({
  frequency,
  onSuccess,
}: {
  frequency: Frequency;
  onSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

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
      setError(result.error.message ?? "Payment failed");
      setProcessing(false);
      return;
    }

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-xl border bg-muted/40 p-4">
        {/* 🔒 NEVER CONDITIONALLY RENDER THIS */}
        <PaymentElement />
      </div>

      {error && (
        <div className="text-xs text-red-600 bg-red-50 rounded p-2">
          {error}
        </div>
      )}

      <Button
        type="submit"
        disabled={!stripe || processing}
        className="w-full flex items-center justify-center gap-2"
      >
        {processing ? "Processing…" : "Confirm Stewardship"}
        <ArrowRight className="h-4 w-4" />
      </Button>
    </form>
  );
}

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default function StewardshipPaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const amount = Number(searchParams.get("amount") || "50");
  const frequency =
    searchParams.get("frequency") === "monthly" ? "monthly" : "once";

  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const impact = useMemo(
    () => calculateDonationImpact(amount),
    [amount]
  );

  // ---------------------------------------------------------------------------
  // Create intent ONCE
  // ---------------------------------------------------------------------------

  useEffect(() => {
    let active = true;

    (async () => {
      const res = await fetch("/api/stewardship/create-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, frequency }),
      });

      const data = await res.json();
      if (active) setClientSecret(data.clientSecret);
    })();

    return () => {
      active = false;
    };
  }, [amount, frequency]);

  // ---------------------------------------------------------------------------
  // CRITICAL: memoize Elements options (PREVENTS REMOUNT)
  // ---------------------------------------------------------------------------

  const elementsOptions = useMemo(() => {
    if (!clientSecret) return undefined;
    return {
      clientSecret,
      appearance: { theme: "flat" },
    };
  }, [clientSecret]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/40">
      <div className="container mx-auto max-w-5xl px-4 py-12">

        <Link
          href="/stewardship"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground"
        >
          <ArrowLeft className="h-3 w-3" />
          Back
        </Link>

        <div className="grid lg:grid-cols-[1.6fr_1.2fr] gap-12 mt-8">

          {/* LEFT */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">
              Finalize Your Stewardship Exchange
            </h1>

            {elementsOptions && (
              <Elements stripe={stripePromise} options={elementsOptions}>
                <CheckoutForm
                  frequency={frequency}
                  onSuccess={() =>
                    router.push("/stewardship/thank-you")
                  }
                />
              </Elements>
            )}
          </div>

          {/* RIGHT */}
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

// -----------------------------------------------------------------------------
// Metric
// -----------------------------------------------------------------------------

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
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4 text-primary" />
        {label}
      </div>
      <span className="font-semibold">{value.toLocaleString()}</span>
    </div>
  );
}
