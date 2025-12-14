"use client";

export const dynamic = "force-dynamic";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import type { StripeElementsOptions } from "@stripe/stripe-js";

import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Leaf,
  TreePine,
  Users,
  Microscope,
  AlertCircle,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { calculateDonationImpact } from "@/lib/calculator";

// -----------------------------------------------------------------------------
// Stripe setup
// -----------------------------------------------------------------------------

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

type Frequency = "once" | "monthly";
type Status = "loading" | "idle" | "submitting" | "error";

// -----------------------------------------------------------------------------
// Enhanced Checkout form with better error handling
// -----------------------------------------------------------------------------

function CheckoutForm({
  frequency,
  amount,
  onSuccess,
  setError,
  setStatus,
}: {
  frequency: Frequency;
  amount: number;
  onSuccess: () => void;
  setError: (msg: string | null) => void;
  setStatus: (s: Status) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [isElementReady, setIsElementReady] = useState(false);
  const [elementError, setElementError] = useState<string | null>(null);
  const [readyAttempts, setReadyAttempts] = useState(0);

  // Handle PaymentElement ready state with retries
  const handlePaymentElementReady = useCallback(() => {
    console.log("PaymentElement ready - attempt", readyAttempts + 1);
    setIsElementReady(true);
    setElementError(null);
  }, [readyAttempts]);

  // Handle PaymentElement error state
  const handlePaymentElementError = useCallback((event: any) => {
    console.error("PaymentElement error:", event);
    setElementError("Payment form failed to load. Please refresh the page.");
    setIsElementReady(false);
  }, []);

  // Enhanced form submission with better validation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setElementError(null);

    // Validate Stripe is loaded
    if (!stripe) {
      const error = "Payment system not available. Please refresh the page.";
      console.error(error);
      setError(error);
      return;
    }

    // Validate Elements is loaded
    if (!elements) {
      const error = "Payment elements not ready. Please wait and try again.";
      console.error(error);
      setError(error);
      return;
    }

    // Check if PaymentElement is ready with more robust validation
    const paymentElement = elements.getElement("payment");
    if (!paymentElement) {
      const error = "Payment form not initialized. Please wait for it to load.";
      console.error("PaymentElement not found");
      setError(error);
      return;
    }

    // Additional validation: check if PaymentElement is actually mounted
    const paymentElementState = paymentElement._getState?.() || paymentElement.state;
    if (!paymentElementState?.mounted && !isElementReady) {
      const error = "Payment form is still loading. Please wait a moment and try again.";
      console.error("PaymentElement not fully mounted");
      setError(error);
      return;
    }

    try {
      setProcessing(true);
      setStatus("submitting");
      console.log("Starting payment confirmation...");

      const confirmParams = {
        return_url: `${window.location.origin}/stewardship/thank-you`,
      };

      let result;
      if (frequency === "monthly") {
        console.log("Confirming setup for subscription...");
        result = await stripe.confirmSetup({
          elements,
          confirmParams,
          redirect: "if_required",
        });
      } else {
        console.log("Confirming payment for one-time donation...");
        result = await stripe.confirmPayment({
          elements,
          confirmParams,
          redirect: "if_required",
        });
      }

      console.log("Payment result:", result);

      if (result.error) {
        const errorMessage = result.error.message || "Payment failed. Please try again.";
        console.error("Payment confirmation error:", result.error);
        setError(errorMessage);
        setProcessing(false);
        setStatus("idle");
        return;
      }

      console.log("Payment successful, redirecting...");
      onSuccess();
    } catch (err: any) {
      console.error("Unexpected payment error:", err);
      const errorMessage = "An unexpected error occurred. Please try again.";
      setError(errorMessage);
      setProcessing(false);
      setStatus("idle");
    }
  };

  // Auto-retry logic for PaymentElement loading
  useEffect(() => {
    if (!isElementReady && readyAttempts < 3) {
      const timer = setTimeout(() => {
        setReadyAttempts(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isElementReady, readyAttempts]);

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Error Display */}
        {(error || elementError) && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-red-700">
              {elementError || error}
            </div>
          </div>
        )}

        {/* Payment Element Container */}
        <div className="rounded-xl border border-border/60 bg-muted/40 p-4">
          <PaymentElement 
            onReady={handlePaymentElementReady}
            onLoaderStart={() => {
              console.log("PaymentElement loader started");
              setIsElementReady(false);
            }}
            onLoaderEnd={() => {
              console.log("PaymentElement loader ended");
              // Don't automatically set ready here, wait for onReady callback
            }}
            onError={handlePaymentElementError}
          />
        </div>

        {/* Loading State */}
        {!isElementReady && (
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground py-4">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>
              {elementError 
                ? "Retrying payment form..." 
                : "Loading secure payment form..."}
            </span>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={!stripe || processing || !isElementReady || !!elementError}
          className="w-full flex items-center justify-center gap-2"
          size="lg"
        >
          {processing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : !isElementReady ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading payment form...
            </>
          ) : elementError ? (
            <>
              <AlertCircle className="h-4 w-4" />
              Payment form error
            </>
          ) : (
            <>
              Confirm ${amount} {frequency === "monthly" ? "/month" : "one-time"}
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      {/* Debug info for development */}
      {process.env.NODE_ENV === 'development' && (
        <details className="text-xs text-muted-foreground bg-muted/20 p-3 rounded-lg">
          <summary className="cursor-pointer">Debug Info</summary>
          <div className="mt-2 space-y-1">
            <div>Stripe loaded: {stripe ? 'Yes' : 'No'}</div>
            <div>Elements ready: {elements ? 'Yes' : 'No'}</div>
            <div>PaymentElement ready: {isElementReady ? 'Yes' : 'No'}</div>
            <div>Ready attempts: {readyAttempts}</div>
            <div>Processing: {processing ? 'Yes' : 'No'}</div>
            <div>Error: {elementError || 'None'}</div>
          </div>
        </details>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Main Page Component
// -----------------------------------------------------------------------------

export default function StewardshipPaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const amountParam = Number(searchParams.get("amount") || "50");
  const frequencyParam = searchParams.get("frequency");

  const amount = amountParam > 0 ? amountParam : 50;
  const frequency: Frequency =
    frequencyParam === "monthly" ? "monthly" : "once";

  const impact = useMemo(
    () => calculateDonationImpact(amount),
    [amount]
  );

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>("");

  // ---------------------------------------------------------------------------
  // Enhanced PaymentIntent / SetupIntent creation
  // ---------------------------------------------------------------------------

  useEffect(() => {
    const createIntent = async () => {
      try {
        setStatus("loading");
        setError(null);
        setDebugInfo("Starting intent creation...");

        console.log("Creating payment intent with:", { amount, frequency });

        const res = await fetch("/api/stewardship/create-intent", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
          body: JSON.stringify({
            amount,
            frequency,
            impactPath: "flexible",
          }),
        });

        console.log("API Response status:", res.status);

        if (!res.ok) {
          const errorText = await res.text();
          console.error("API Error:", errorText);
          throw new Error(`API request failed: ${res.status} ${errorText}`);
        }

        const data = await res.json();
        console.log("API Response data:", data);

        if (!data.clientSecret) {
          throw new Error("Missing client secret from API response");
        }

        setClientSecret(data.clientSecret);
        setStatus("idle");
        setDebugInfo("Intent created successfully");
        console.log("Payment intent created successfully");
      } catch (err: any) {
        console.error("Intent creation error:", err);
        setError(err.message || "Unable to prepare payment.");
        setStatus("error");
        setDebugInfo(`Error: ${err.message}`);
      }
    };

    createIntent();
  }, [amount, frequency]);

  // ---------------------------------------------------------------------------
  // Enhanced Stripe Elements options
  // ---------------------------------------------------------------------------

  const elementsOptions = useMemo<StripeElementsOptions | undefined>(() => {
    if (!clientSecret) {
      console.log("No client secret available");
      return undefined;
    }

    console.log("Creating Stripe Elements with client secret");
    return {
      clientSecret,
      appearance: {
        theme: "flat",
        variables: {
          colorPrimary: "#16a34a",
        },
      },
      loader: "always", // Force loader to show
    };
  }, [clientSecret]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/40">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Back Navigation */}
        <Link
          href="/stewardship/checkout"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to checkout
        </Link>

        <div className="grid lg:grid-cols-[1.6fr_1.2fr] gap-12">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">
              Finalize Your Stewardship Exchange
            </h1>

            {/* Status Display */}
            {status === "error" && (
              <div className="rounded-xl bg-red-100 border border-red-200 p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-red-800">Payment Setup Failed</div>
                    <div className="text-sm text-red-700 mt-1">{error}</div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-3"
                      onClick={() => window.location.reload()}
                    >
                      Retry
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {status === "loading" && (
              <div className="rounded-xl bg-blue-50 border border-blue-200 p-4">
                <div className="flex items-center gap-3">
                  <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
                  <div>
                    <div className="font-medium text-blue-800">Setting up secure payment...</div>
                    <div className="text-sm text-blue-700 mt-1">{debugInfo}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Form */}
            {elementsOptions && status === "idle" && (
              <Elements stripe={stripePromise} options={elementsOptions}>
                <CheckoutForm
                  amount={amount}
                  frequency={frequency}
                  onSuccess={() => {
                    console.log("Payment successful, navigating to thank you page");
                    router.push("/stewardship/thank-you");
                  }}
                  setError={setError}
                  setStatus={setStatus}
                />
              </Elements>
            )}
          </div>

          {/* Impact Preview */}
          <aside className="space-y-4">
            <div className="rounded-2xl bg-muted/60 p-6">
              <div className="flex items-center gap-2 mb-4">
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
            </div>

            {/* Development Debug Panel */}
            {process.env.NODE_ENV === 'development' && (
              <div className="rounded-2xl bg-yellow-50 border border-yellow-200 p-4 text-xs">
                <div className="font-semibold text-yellow-800 mb-2">Debug Panel</div>
                <div className="space-y-1 text-yellow-700">
                  <div>Client Secret: {clientSecret ? 'Present' : 'Missing'}</div>
                  <div>Status: {status}</div>
                  <div>Debug: {debugInfo}</div>
                  <div>Amount: ${amount}</div>
                  <div>Frequency: {frequency}</div>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Metric component
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
    <div className="flex justify-between items-center text-xs">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4 text-primary" />
        {label}
      </div>
      <span className="font-semibold">{value.toLocaleString()}</span>
    </div>
  );
}
