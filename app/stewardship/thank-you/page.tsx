"use client";

import { useEffect, useMemo, useState } from "react";
import { Sprout, Waves, Wind } from "lucide-react";

export const dynamic = "force-dynamic";

export default function ThankYouPage() {
  // Rotate only the micro-icon (Wave ↔ Wind). Text stays canonical.
  const icons = useMemo(() => [Waves, Wind], []);
  const [iconIndex, setIconIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIconIndex((i) => (i + 1) % icons.length);
    }, 5500); // slow, calm
    return () => clearInterval(t);
  }, [icons.length]);

  const MicroIcon = icons[iconIndex];

  return (
    <main className="min-h-[100svh] flex items-center justify-center px-5 py-14 bg-[#F6F0E6]">
      <div className="w-full max-w-md text-center">
        {/* Top mark */}
        <div className="flex items-center justify-center mb-6">
          <div className="rounded-3xl bg-white/60 border border-black/5 shadow-sm px-6 py-5">
            <Sprout className="h-12 w-12 text-green-600" aria-hidden="true" />
          </div>
        </div>

        {/* Title */}
        <p className="text-[13px] tracking-wide uppercase text-black/55 mb-3">
          Stewardship Received
        </p>

        {/* Headline */}
        <h1 className="text-2xl sm:text-3xl font-semibold text-black/85 leading-tight mb-6">
          The ecosystem is stronger because you are in it.
        </h1>

        {/* Rotating micro-icon + canonical line */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="relative">
            <MicroIcon
              className="h-5 w-5 text-sky-700/70 transition-opacity duration-700"
              aria-hidden="true"
            />
          </div>

          <p className="text-[15px] sm:text-base text-black/70">
            <span className="inline-block animate-[fadeBreath_5.5s_ease-in-out_infinite]">
              Nothing was taken. Something began to move.
            </span>
          </p>
        </div>

        {/* Divider */}
        <div className="mx-auto my-6 h-px w-24 bg-black/10" />

        {/* Quote */}
        <blockquote className="italic text-black/70 text-base sm:text-[17px] leading-relaxed mb-4">
          “The earth remembers every hand that helps it heal.”
        </blockquote>

        {/* Footer */}
        <p className="text-sm text-black/55 mb-7">
          A receipt has been sent to your email.
        </p>

        {/* Button */}
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold
                     bg-black/80 text-white hover:bg-black/90 transition
                     shadow-sm"
        >
          Return to the Field
        </a>

        {/* Tiny legal line (optional but good) */}
        <p className="mt-6 text-[11px] text-black/40">
          ZenTrust · 501(c)(3) Public Charity · EIN 33-4318487
        </p>

        {/* Local keyframes */}
        <style jsx>{`
          @keyframes fadeBreath {
            0%,
            100% {
              opacity: 0.85;
              transform: translateY(0px);
            }
            50% {
              opacity: 1;
              transform: translateY(-1px);
            }
          }
        `}</style>
      </div>
    </main>
  );
}
