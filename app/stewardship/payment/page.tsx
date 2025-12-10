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

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/stewardship/thank-you`,
        },
        redirect: "if_required",
      });

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
        <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      </div>

      <Button type="submit" className="w-full inline-flex items-center justify-center gap-2">
        {buttonLabel(isProcessing)}
        <ArrowRight className="h-4 w-4" />
      </Button>
    </form>
  );
}

function ImpactMetric({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  description: string;
}) {
  return (
    <div className="rounded-xl bg-muted/60 p-3 space-y-1">
      <div className="flex items-baseline justify-between gap-2">
        <div className="inline-flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
          <Icon className="h-3.5 w-3.5 text-primary" />
          <span>{label}</span>
        </div>
        <span className="text-sm font-semibold text-foreground">{value.toLocaleString()}</span>
      </div>
      <p className="text-[11px] text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function pathLabel(path: string) {
  switch (path) {
    case "ecology":
      return "Ecological Regeneration";
    case "research":
      return "Open Science & BPSS Research";
    case "education":
      return "Ecological Education";
    case "community":
      return "Community Sovereignty Pathways";
    case "global":
      return "Global Regeneration Network";
    default:
      return "ZenTrust’s Full Regenerative Mission";
  }
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

  // Create PaymentIntent
  useEffect(() => {
    if (!stripePromise) {
      setError("Stripe publishable key missing. Set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.");
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

  if (!stripePromise) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-4">
          <h1 className="text-2xl font-bold">Stripe not configured</h1>
          <p>Please set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/40">

      {/* Security bar */}
      <div className="border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="container mx-auto px-4 py-3 flex justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Lock className="h-3.5 w-3.5" /> Secure via Stripe
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5" />
            ZenTrust · 501(c)(3) · EIN 33-4318487
          </div>
        </div>
      </div>

      {/* PAGE BODY */}
      <div className="container mx-auto px-4 py-12 lg:py-20">

        <Link
          href="/stewardship/payment"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to participation details
        </Link>

        <div className="grid lg:grid-cols-[1.6fr_1.2fr] gap-16 mt-8">
          {/* LEFT SIDE */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold">Finalize Your Stewardship Exchange</h1>

              <p className="text-muted-foreground max-w-md">
                Confirming ${amount} {frequency === "monthly" ? "per month" : "one-time"}.
              </p>
            </div>

            <div className="glass-card p-8 rounded-2xl space-y-6">

              {/* Summary */}
              <div>
                <p className="text-xs uppercase text-muted-foreground">Stewardship Summary</p>
                <p className="text-sm font-semibold">
                  {frequency === "monthly"
                    ? `$${amount}/month resource flow`
                    : `$${amount} one-time resource flow`}{" "}
                  ·{" "}
                  <span className="text-muted-foreground">
                    {pathFromQuery === "flexible"
                      ? "Adaptive allocation"
                      : pathLabel(pathFromQuery)}
                  </span>
                </p>
              </div>

              {status === "loading" && (
                <div className="rounded-xl bg-muted/40 px-4 py-6 text-sm text-muted-foreground">
                  Preparing your secure stewardship session…
                </div>
              )}

              {status === "error" && (
                <div className="rounded-xl bg-red-100 text-red-700 px-4 py-3 text-xs">
                  {error}
                </div>
              )}

              {/* Stripe Form */}
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
                    buttonLabel={buttonLabel}
                    onSuccess={() => router.push("/stewardship/thank-you")}
                    setError={setError}
                    setStatus={setStatus}
                  />
                </Elements>
              )}

            </div>
          </div>

          {/* RIGHT SIDE */}
          <aside className="space-y-6">
            <div className="glass-card p-6 rounded-2xl border border-primary/20 space-y-5">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                <h2 className="text-sm font-semibold">Regenerative Influence Preview</h2>
              </div>

              <div className="space-y-3 text-xs">
                <ImpactMetric
                  icon={TreePine}
                  label="Ecosystem Layers Activated"
                  value={impact.trees}
                  description="Layers of syntropic forest life engaged."
                />
                <ImpactMetric
                  icon={Leaf}
                  label="Regenerative Cells Strengthened"
                  value={impact.acres}
                  description="Micro-watersheds moving toward resilience."
                />
                <ImpactMetric
                  icon={Users}
                  label="Families Advancing Sovereignty"
                  value={impact.households}
                  description="Households cultivating regenerative livelihoods."
                />
                {impact.research_plots > 0 && (
                  <ImpactMetric
                    icon={Microscope}
                    label="Research Pathways Enabled"
                    value={impact.research_plots}
                    description="Open regenerative research pathways."
                  />
                )}
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
