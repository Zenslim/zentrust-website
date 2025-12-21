'use client';

import Link from "next/link";
import { GlobalHero } from "@/components/hero/GlobalHero";

export default function SyntropicEcologyPage() {
  const contentId = "content";

  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      <GlobalHero
        kicker="Protocols"
        headline="Syntropic Ecology — from transactional pity to systemic power."
        dek="Restoring reciprocal relationships between life and land to regenerate ecosystems and community wealth."
        belowAnchorId={contentId}
        mode="confirm"
        secondaryCta={{ label: "View protocol", href: `#${contentId}` }}
      />

      {/* BODY */}
      <section id={contentId} className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="max-w-3xl">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            The Shift from Transactional Pity to Systemic Power.
          </h2>

          <p className="mt-4 leading-relaxed">
            The traditional charity model fails because it treats the symptom in isolation. We understand that the soil
            is not just dirt—it is the original source code for all wealth, health, and spirit.
          </p>

          <p className="mt-4 leading-relaxed">
            The Syntropic Protocol restores the deep, reciprocal relationship between life and land, transforming
            degraded acres into bio-diverse, self-financing ecosystems.
          </p>

          <div className="mt-6 space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-900/40">
            <div className="flex gap-3">
              <div className="shrink-0">🌱</div>
              <p>
                <span className="font-medium">Healed Soil</span> creates nutrient-dense food that fuels{" "}
                <span className="font-medium">BPSS Wellness</span>.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="shrink-0">💰</div>
              <p>
                <span className="font-medium">Generative Systems</span> convert charity into permanent community wealth.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="shrink-0">🧘</div>
              <p>
                <span className="font-medium">Reciprocity with Life</span> restores meaning and resilience.
              </p>
            </div>
          </div>
        </div>

        {/* CONTINUATION */}
        <div className="mt-12 max-w-3xl grid gap-4 sm:grid-cols-2">
          <Link
            href="/stewardship"
            className="rounded-2xl border p-6 hover:bg-neutral-50 dark:hover:bg-neutral-900/40"
          >
            <h4 className="font-semibold">Be a Steward</h4>
            <p className="mt-2 text-sm">
              Activate an acre of regeneration through direct care of land and soil.
            </p>
          </Link>

          <Link
            href="/investor/pri"
            className="rounded-2xl border p-6 hover:bg-neutral-50 dark:hover:bg-neutral-900/40"
          >
            <h4 className="font-semibold">Invest in the Protocol</h4>
            <p className="mt-2 text-sm">
              Review how regeneration becomes self-sustaining.
            </p>
          </Link>
        </div>

        {/* TRUST */}
        <footer className="mt-14 border-t pt-6 text-sm text-neutral-600 dark:text-neutral-400">
          ZenTrust, Inc. | EIN 33-4318487 | 501(c)(3)
        </footer>
      </section>
    </main>
  );
}
