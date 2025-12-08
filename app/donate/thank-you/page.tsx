"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const dynamic = "force-dynamic";

function StewardshipAcknowledgementInner() {
  const searchParams = useSearchParams();
  const amount = Number(searchParams.get("amount") || 0);

  // GA event (renamed to avoid "donation" language)
  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag && amount > 0) {
      window.gtag("event", "stewardship_exchange_completed", {
        value: amount,
        currency: "USD",
      });
    }
  }, [amount]);

  return (
    <div className="py-20 px-4 text-center max-w-3xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-6 gradient-text">
        Stewardship Exchange Received
      </h1>

      <p className="text-lg text-muted-foreground leading-relaxed mb-6">
        Your voluntary resource flow of{" "}
        <span className="font-semibold text-foreground">
          ${amount.toLocaleString()}
        </span>{" "}
        has been integrated into ZenTrust’s regenerative ecosystem.
      </p>

      <div className="glass-card rounded-2xl p-8 mx-auto mb-8">
        <p className="italic text-foreground text-xl mb-3">
          “When resources move with intention, ecosystems remember their strength.”
        </p>
        <p className="text-sm text-muted-foreground">
          This exchange supports the long arc of regeneration—ecological,
          scientific, and communal—flowing into the architectures that
          strengthen under stress.
        </p>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        A stewardship receipt has been sent to your email.  
        This acknowledgement reflects your participation in a wider field of
        interdependence and ecological awakening.
      </p>

      <a
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 mt-4 rounded-xl text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
      >
        Return to ZenTrust
      </a>

      <p className="mt-6 text-xs text-muted-foreground">
        ZenTrust · 501(c)(3) Public Charity · EIN 33-4318487  
        Stewardship exchanges are voluntary and are used exclusively for
        charitable, scientific, and educational purposes.
      </p>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-muted-foreground">Integrating stewardship…</div>}>
      <StewardshipAcknowledgementInner />
    </Suspense>
  );
}
