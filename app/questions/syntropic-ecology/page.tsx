'use client';

import Link from "next/link";
import { GlobalHero } from "@/components/hero/GlobalHero";

export default function SyntropicEcologyPage() {
  const contentId = "content";

  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      <GlobalHero
        headline={`Why does land keep degrading,
even as we invest more into fixing it?`}
        dek={`Many assume degradation means depleted soil, climate change, or not enough effort.
That assumption quietly causes harm.

When land is treated as a machine for extractive outputs,
inputs and interventions mask failure — they do not regenerate.

Regeneration often begins when the question shifts from:

“How do we manage this better?”

to

“Why does this keep degrading at all?”`}
        belowAnchorId={contentId}
        mode="confirm"
      />

      {/* BODY */}
      <section
        id={contentId}
        className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16"
      >
        <div className="max-w-3xl space-y-10">

          <section>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Why does this land keep needing repair?
            </h2>
            <p className="mt-4">
              <strong>Because the system no longer allows the land to repair itself.</strong>
            </p>
            <p className="mt-4">
              Imagine a piece of land where crops once grew easily.
            </p>
            <p className="mt-2">
              Seeds sprouted without much help. Rain soaked in. Soil stayed dark and alive.
            </p>
            <p className="mt-2">
              Over time, harvests begin to shrink.
            </p>
            <p className="mt-2">
              So more effort is applied.
            </p>
            <p className="mt-2">
              Fertilizer is added, and the field turns green again. For a while, it looks fixed.
            </p>
            <p className="mt-2">
              But something subtle has changed.
            </p>
            <p className="mt-2">
              The land no longer rebuilds itself between seasons. What soil life once handled is now replaced by products.
              What structure once provided is now replaced by irrigation.
            </p>
            <p className="mt-2">
              Nothing here is careless or wrong. Each step is logical.
            </p>
            <p className="mt-2">
              But together, they slowly remove the land’s ability to recover on its own.
            </p>
            <p className="mt-2">
              That is why the land keeps needing repair.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Why does each fix only work for a short time?
            </h2>
            <p className="mt-4">
              <strong>Because visible problems are treated while deeper losses remain.</strong>
            </p>
            <p className="mt-4">
              After fertilizer, the soil dries faster. So irrigation is added.
            </p>
            <p className="mt-2">
              Crops survive again.
            </p>
            <p className="mt-2">
              Then insects appear in large numbers. So pesticides are sprayed.
            </p>
            <p className="mt-2">
              Each fix solves exactly what it targets.
            </p>
            <p className="mt-2">
              But none of them restore what was lost beneath the surface.
            </p>
            <p className="mt-2">
              They hold the system in place briefly without rebuilding its foundations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Why does something new break every season?
            </h2>
            <p className="mt-4">
              <strong>Because the land’s internal cycles are no longer completing.</strong>
            </p>
            <p className="mt-4">
              In healthy land, what is taken is replaced.
            </p>
            <p className="mt-2">
              Plant matter returns to soil. Roots feed microbes. Water stays where it falls.
            </p>
            <p className="mt-2">
              When these cycles are broken, nothing finishes.
            </p>
            <p className="mt-2">
              Each season removes more than the last one rebuilt.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Why does the land no longer fix itself?
            </h2>
            <p className="mt-4">
              <strong>Because essential relationships were replaced by external inputs.</strong>
            </p>
            <p className="mt-4">
              Nearby, a forest grows.
            </p>
            <p className="mt-2">
              No fertilizer is added. No irrigation is installed. No pests are controlled.
            </p>
            <p className="mt-2">
              And yet the soil remains alive.
            </p>
            <p className="mt-2">
              The difference is not effort. It is design.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              What is the forest doing that the field is not?
            </h2>
            <p className="mt-4">
              <strong>It keeps all life-supporting relationships intact.</strong>
            </p>
            <p className="mt-4">
              Leaves fall and become food. Roots hold water and feed life underground.
              Plants protect one another from heat and wind.
            </p>
            <p className="mt-2">
              Nothing essential is removed. Nothing is outsourced.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              What changed when farming began to fail?
            </h2>
            <p className="mt-4">
              <strong>Land was redesigned for extraction, not regeneration.</strong>
            </p>
            <p className="mt-4">
              Soil biology was replaced with fertilizer. Water storage was replaced with irrigation.
              Balance was replaced with chemicals.
            </p>
            <p className="mt-2">
              Each replacement worked — briefly.
            </p>
            <p className="mt-2">
              Each one increased dependence.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              What question changes everything?
            </h2>
            <p className="mt-4">
              <strong>
                What did this land used to do by itself that we are now doing for it?
              </strong>
            </p>
            <p className="mt-4">
              That question shifts attention from adding more to restoring function.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              What happens when relationships are restored?
            </h2>
            <p className="mt-4">
              <strong>The land begins repairing itself again.</strong>
            </p>
            <p className="mt-4">
              Soil is kept covered. Different plants grow together. Roots stay in the ground. Shade returns.
            </p>
            <p className="mt-2">
              Water stays longer. Soil darkens. Balance re-emerges.
            </p>
            <p className="mt-2">
              Not because the land was fixed, but because it was allowed to function.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              What was the real problem all along?
            </h2>
            <p className="mt-4">
              <strong>The system prevented the land from helping itself.</strong>
            </p>
            <p className="mt-2">
              Effort was never the issue.
            </p>
            <p className="mt-2">
              Design was.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              So what kind of system allows land to heal itself?
            </h2>
            <p className="mt-4">
              <strong>A system designed like a living forest.</strong>
            </p>
            <p className="mt-4">
              A syntropic food agroforest applies the logic of a forest to food production.
            </p>
            <p className="mt-2">
              Different plants grow together. Fast growers prepare the soil.
              Long-lived species stabilize the system.
            </p>
            <p className="mt-2">
              Leaves become soil. Roots hold water. Life replaces itself continuously.
            </p>
            <p className="mt-2">
              Food appears as a result, not a demand.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Why doesn’t a syntropic food agroforest need constant repair?
            </h2>
            <p className="mt-4">
              <strong>Because it rebuilds itself as it produces.</strong>
            </p>
            <p className="mt-4">
              When plants die, they feed the soil. When conditions shift, the system adapts.
              When one species weakens, another fills the gap.
            </p>
            <p className="mt-2">
              Work still exists, but it is no longer endless.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Why might this be the future of farming?
            </h2>
            <p className="mt-4">
              <strong>Because systems that regenerate themselves survive uncertainty.</strong>
            </p>
            <p className="mt-4">
              As inputs become costly and conditions become unstable,
              systems that depend on constant correction struggle.
            </p>
            <p className="mt-2">
              Systems that repair themselves endure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              One question to leave with
            </h2>
            <p className="mt-4 font-medium">
              If forests can feed life without collapsing, why shouldn’t our food systems do the same?
            </p>
            <p className="mt-4">
              A system that heals as it produces does not need saving.
            </p>
            <p className="mt-2">
              It only needs space to grow.
            </p>
          </section>

        </div>

        {/* TRUST */}
        <footer className="mt-14 border-t pt-6 text-sm text-neutral-600 dark:text-neutral-400">
          ZenTrust, Inc. | EIN 33-4318487 | 501(c)(3)
        </footer>
      </section>
    </main>
  );
}
