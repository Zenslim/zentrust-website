"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const dynamic = "force-dynamic";

function ThankYouInner() {
  const searchParams = useSearchParams();
  const amount = Number(searchParams.get("amount") || 0);

  // GA event
  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag && amount > 0) {
      window.gtag("event", "donation_completed", {
        value: amount,
        currency: "USD",
      });
    }
  }, [amount]);

  return (
    <div className="py-20 text-center">
      <h1 className="text-4xl font-bold">Thank You!</h1>
      <p className="mt-4 text-xl">Your donation of ${amount} was received.</p>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading…</div>}>
      <ThankYouInner />
    </Suspense>
  );
}
