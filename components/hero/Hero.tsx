"use client";

import Link from "next/link";
import { Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";

const DETERMINATION_LETTER_URL =
  "https://apps.irs.gov/pub/epostcard/dl/FinalLetter_33-4318487_ZENTRUSTINC_04072025_00.pdf";

export function Hero() {
  return (
    <section className="min-h-[85svh] flex items-center justify-center px-6 pt-20 pb-16">
      <div className="max-w-3xl w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-5">
          <Sprout
            className="h-12 w-12 text-green-600/80 dark:text-green-400/70"
            strokeWidth={1.6}
            aria-hidden="true"
          />
        </div>

        {/* Institutional identity */}
        <p className="mb-4 text-[13px] tracking-[0.18em] uppercase font-medium text-black/70 dark:text-white/60">
          ZenTrust · 501(c)(3) Public Charity · EIN 33-4318487
        </p>

        {/* H1 — correct */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-black/85 dark:text-white leading-tight mb-6">
          Healing land.
          <br />
          Elevating humanity.
          <br />
          Science for regeneration.
        </h1>

        {/* Supporting text */}
        <p className="text-lg text-black/70 dark:text-white/70 max-w-2xl mx-auto mb-8">
          ZenTrust advances regenerative ecology, BPSS-integrative wellness
          research, and open scientific education — grounded in evidence,
          transparency, and long-horizon stewardship.
        </p>

        {/* Trust confirmation */}
        <p className="mb-4 text-sm text-black/55 dark:text-white/55">
          Recognized as a 170(b)(1)(A)(vi) public charity.{" "}
          <a
            href={DETERMINATION_LETTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 font-medium
                       text-black/70 hover:text-black/90
                       dark:text-white/70 dark:hover:text-white"
          >
            View official determination letter
          </a>
        </p>

        {/* CTA — dropped slightly */}
        <div className="flex justify-center mt-8">
          <Button
            size="lg"
            className="px-8 py-5 text-lg rounded-xl"
            asChild
          >
            <Link href="/stewardship">Enter the Stewardship Portal</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
