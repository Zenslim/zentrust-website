"use client";

export const dynamic = "force-dynamic";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

import { Lock, ShieldCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

type Frequency = "once" | "monthly";
type Status = "loading" | "error";

// -----------------------------------------------------------------------------
// Page
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

  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);

  // ---------------------------------------------------------------------------
  // Create Stripe Checkout Session → Redirect
  // ---------------------------------------------------------------------------

  useEffect(() => {
    const startCheckout = async () => {
      try {
        setStatus("loading");
        setError(null);

        const res = await fetch("/api/stewardship/create-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount, frequency }),
        });

        const data = await res.json();

        if (!res.ok || !data.url) {
          throw new Error(
            data?.error || "Unable to start secure checkout."
          );
        }

        // 🔥 STRIPE REDIRECT (THIS IS THE FIX)
        window.location.href = data.url;
      } catch (err: any) {
        console.error("Checkout error:", err);
        setError(err.message || "Unable to start checkout.");
        setStatus("error");
      }
    };

    startCheckout();
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

      {/* Body */}
      <div className="container mx-auto px-4 py-12 max-w-xl">
        <Link
          href="/stewardship/checkout"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to amount selection
        </Link>

        <div className="mt-10 glass-card p-8 rounded-2xl space-y-6 text-center">
          <h1 className="text-2xl font-bold">
            Finalizing Stewardship Exchange
          </h1>

          <p className="text-muted-foreground">
            Preparing secure Stripe checkout for{" "}
            <strong>
              ${amount.toLocaleString()}
              {frequency === "monthly" ? "/month" : ""}
            </strong>
          </p>

          {status === "loading" && (
            <div className="rounded-xl bg-muted/40 px-4 py-6 text-sm text-muted-foreground">
              Redirecting to secure payment…
            </div>
          )}

          {error && (
            <>
              <div className="rounded-xl bg-destructive/10 border border-destructive/40 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
              <Button onClick={() => router.push("/stewardship/checkout")}>
                Try again
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
