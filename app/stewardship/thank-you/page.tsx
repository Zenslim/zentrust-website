"use client";

import { useEffect, useState } from "react";
import { Sprout, Waves, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

const ROTATING_LINES = [
  "Nothing was taken. Something began to move.",
  "Your gift is the water that wakes the seed.",
  "A small flow, entering a much longer river.",
];

export default function ThankYouPage() {
  const [index, setIndex] = useState(0);
  const [iconFlip, setIconFlip] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % ROTATING_LINES.length);
      setIconFlip((v) => !v);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-[100svh] flex items-center justify-center px-6 py-16 bg-[#F6F0E6] dark:bg-[#0f1110]">
      <div className="max-w-md w-full text-center">
        {/* Transparent Sprout */}
        <div className="flex justify-center mb-4">
          <Sprout
            className="h-12 w-12 text-green-600/80 dark:text-green-400/70"
            strokeWidth={1.6}
            aria-hidden="true"
          />
        </div>

        {/* Stewardship Received */}
        <p className="mb-4 text-[13px] tracking-[0.18em] uppercase font-medium text-black/70 dark:text-white/60">
          Stewardship Received
        </p>

        {/* Headline */}
        <h1 className="text-2xl sm:text-3xl font-semibold text-black/85 dark:text-white leading-tight mb-8">
          The ecosystem is stronger because you are in it.
        </h1>

        {/* Rotating Line */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {iconFlip ? (
            <Waves className="h-5 w-5 text-sky-700/70 dark:text-sky-400/60" />
          ) : (
            <Wind className="h-5 w-5 text-sky-700/70 dark:text-sky-400/60" />
          )}

          <p
            key={index}
            className="text-[15px] sm:text-base text-black/70 dark:text-white/70
                       animate-[fadeUp_0.8s_ease-out]"
          >
            {ROTATING_LINES[index]}
          </p>
        </div>

        {/* Divider */}
        <div className="mx-auto my-6 h-px w-20 bg-black/15 dark:bg-white/20" />

        {/* Quote */}
        <blockquote className="italic text-black/70 dark:text-white/70 text-base leading-relaxed mb-4">
          “The earth remembers every hand that helps it heal.”
        </blockquote>

        {/* Footer */}
        <p className="text-sm text-black/55 dark:text-white/55 mb-7">
          A receipt has been sent to your email.
        </p>

        {/* Button */}
        <Button asChild className="rounded-full px-7 py-3 text-sm font-semibold">
          <a href="/">Return to the Field</a>
        </Button>

        {/* Legal */}
        <p className="mt-6 text-[11px] text-black/40 dark:text-white/40">
          ZenTrust · 501(c)(3) Public Charity · EIN 33-4318487
        </p>

        {/* Animation */}
        <style jsx>{`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(6px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </main>
  );
}
