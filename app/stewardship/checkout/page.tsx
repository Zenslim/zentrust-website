"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

import { Lock, ShieldCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

type Frequency = "once" | "monthly";

export default function StewardshipCheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const amount = useMemo(() => {
    const v = Number(searchParams.get("amount"));
    return Number.isFinite(v) && v > 0 ? v : 50;
  }, [searchParams]);

  const frequency: Frequency =
    searchParams.get("frequency") === "monthly" ? "monthly" : "once";

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startCheckout = async () => {
      try {
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

        // 🔥 THIS IS THE KEY LINE
        window.location.assign(data.url);
      } catch (err: any) {
        console.error("Checkout error:", err);
        setError(err.message || "Unable to start checkout.");
      }
    };

    startCheckout();
  }, [amount, frequency]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/40">
      {/* Security bar */}
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
      <div className="container mx-auto px-4 py-12 max-w-xl text-center">
        <Link
          href="/stewardship"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" />
          Back
        </Link>

        <div className="mt-10 glass-card p-8 rounded-2xl space-y-4">
          <h1 className="text-2xl font-bold">
            Preparing Secure Checkout
          </h1>

          <p className="text-muted-foreground">
            Redirecting to Stripe to complete your{" "}
            <strong>
              ${amount}
              {frequency === "monthly" ? "/month" : ""}
            </strong>{" "}
            stewardship exchange.
          </p>

          {!error && (
            <div className="rounded-xl bg-muted/40 px-4 py-6 text-sm text-muted-foreground">
              Redirecting…
            </div>
          )}

          {error && (
            <>
              <div className="rounded-xl bg-destructive/10 border border-destructive/40 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
              <Button onClick={() => router.push("/stewardship")}>
                Try again
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
