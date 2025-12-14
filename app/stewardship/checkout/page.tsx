"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ShieldCheck, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

type Frequency = "once" | "monthly";

export default function ParticipationPortalPage() {
  const router = useRouter();

  const [amount, setAmount] = useState(50);
  const [frequency, setFrequency] = useState<Frequency>("once");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!agreed) {
      setError("Please acknowledge this voluntary stewardship exchange.");
      return;
    }

    if (amount <= 0) {
      setError("Please select a positive amount.");
      return;
    }

    router.push(
      `/stewardship/payment?amount=${amount}&frequency=${frequency}`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/40">
      <div className="container mx-auto px-4 py-16 max-w-2xl">

        {/* Header */}
        <div className="space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/70 dark:bg-emerald-900/30 px-3 py-1 text-xs font-medium text-emerald-800 dark:text-emerald-100">
            <ShieldCheck className="h-4 w-4" />
            Regenerative Participation
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Steward a Resource Flow
          </h1>

          <p className="text-muted-foreground text-lg leading-relaxed">
            This is a voluntary transfer of resources to ZenTrust, Inc.
            Funds are stewarded exclusively for charitable, educational,
            and scientific purposes.
          </p>

          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Lock className="h-4 w-4" />
            Secure processing · 501(c)(3) · EIN 33-4318487
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* AMOUNT */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-semibold">Resource Amount (USD)</h2>

            {/* Amount Display */}
            <div className="text-center">
              <div className="text-4xl font-bold">
                ${amount.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {frequency === "monthly"
                  ? "per month"
                  : "one-time"}
              </div>
            </div>

            {/* Slider */}
            <div className="space-y-2">
              <input
                type="range"
                min={5}
                max={1000}
                step={5}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-muted-foreground">
                <span>$5</span>
                <span>$1000+</span>
              </div>
            </div>

            {/* Frequency */}
            <div className="space-y-2 pt-4">
              <Label>Flow Frequency</Label>
              <RadioGroup
                value={frequency}
                onValueChange={(v: Frequency) => setFrequency(v)}
                className="flex gap-3"
              >
                <FrequencyPill
                  value="once"
                  label="One-time flow"
                  selected={frequency === "once"}
                />
                <FrequencyPill
                  value="monthly"
                  label="Recurring flow"
                  selected={frequency === "monthly"}
                />
              </RadioGroup>
            </div>
          </div>

          {/* CONFIRMATION */}
          <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-4 text-xs text-muted-foreground">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1"
              />
              <span>
                I understand this is a voluntary stewardship exchange with
                ZenTrust, Inc., a registered 501(c)(3) public charity.
              </span>
            </label>

            {error && (
              <div className="rounded-md bg-destructive/10 border border-destructive/40 px-3 py-2 text-xs text-destructive">
                {error}
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full inline-flex items-center justify-center gap-2 mt-2"
            >
              Proceed to secure checkout
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* COMPONENTS */

function FrequencyPill({
  value,
  label,
  selected,
}: {
  value: Frequency;
  label: string;
  selected: boolean;
}) {
  return (
    <Label
      htmlFor={`freq-${value}`}
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs cursor-pointer ${
        selected
          ? "border-primary bg-primary/10 text-primary"
          : "border-border text-muted-foreground hover:border-primary/50"
      }`}
    >
      <RadioGroupItem id={`freq-${value}`} value={value} className="h-3 w-3" />
      {label}
    </Label>
  );
}
