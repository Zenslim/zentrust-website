import Link from "next/link";
import type { Metadata } from "next";
import { GlobalHero } from "@/components/hero/GlobalHero";

export const metadata: Metadata = {
  title: "Why does land keep degrading, even as we invest more into fixing it?",
  description:
    "A question-led exploration of syntropic design that explains why land struggles without restored relationships.",
  other: {
    category: "Nature & Land",
  },
};

function AccordionItem({
  title,
  answer,
  children,
  defaultOpen = false,
}: {
  title: string;
  answer: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      className="group rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition dark:border-neutral-800 dark:bg-neutral-950"
      open={defaultOpen}
    >
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold tracking-tight sm:text-lg">
            {title}
          </h3>
          <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
            <span className="font-medium text-neutral-900 dark:text-neutral-100">
              {answer}
            </span>
          </p>
        </div>

        <span
          className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 transition group-open:rotate-45 dark:border-neutral-800 dark:text-neutral-300"
          aria-hidden="true"
        >
          +
        </span>
      </summary>

      <div className="mt-4 space-y-3 text-sm leading-relaxed text-neutral-800 dark:text-neutral-200">
        {children}
      </div>
    </details>
  );
}

export default function SyntropicEcologyPage() {
  const contentId = "content";

  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      <GlobalHero
        headline={`Why does land keep degrading,
even as we invest more into fixing it?`}
            dek={`Many assume degradation means depleted soil, climate change, or not enough effort.
That assumption quietly causes harm.
When land is treated as a system of extractive outputs, effort hides failure instead of restoring function.
Regeneration often begins when the question shifts from:
“How do we manage this better?” →
“Why does this keep degrading at all?”`}
        belowAnchorId={contentId}
        mode="confirm"
      />

      {/* BODY */}
      <section
        id={contentId}
        className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16"
      >
        <div className="max-w-3xl space-y-4">
          <AccordionItem
            title="Why does this land keep needing repair?"
            answer="Because the system no longer allows the land to repair itself."
            defaultOpen
          >
            <p>Imagine a piece of land where crops once grew easily.</p>
            <p>Seeds sprouted without much help. Rain soaked in. Soil stayed dark and alive.</p>
            <p>Over time, harvests begin to shrink.</p>
            <p>So more effort is applied.</p>
            <p>Fertilizer is added, and the field turns green again. For a while, it looks fixed.</p>
            <p>But something subtle has changed.</p>
            <p>
              The land no longer rebuilds itself between seasons. What soil life once handled is now replaced by
              products. What structure once provided is now replaced by irrigation.
            </p>
            <p>Nothing here is careless or wrong. Each step is logical.</p>
            <p>But together, they slowly remove the land’s ability to recover on its own.</p>
            <p>That is why the land keeps needing repair.</p>
          </AccordionItem>

          <AccordionItem
            title="Why does each fix only work for a short time?"
            answer="Because visible problems are treated while deeper losses remain."
          >
            <p>After fertilizer, the soil dries faster. So irrigation is added.</p>
            <p>Crops survive again.</p>
            <p>Then insects appear in large numbers. So pesticides are sprayed.</p>
            <p>Each fix solves exactly what it targets.</p>
            <p>But none of them restore what was lost beneath the surface.</p>
            <p>They hold the system in place briefly without rebuilding its foundations.</p>
          </AccordionItem>

          <AccordionItem
            title="Why does something new break every season?"
            answer="Because the land’s internal cycles are no longer completing."
          >
            <p>In healthy land, what is taken is replaced.</p>
            <p>Plant matter returns to soil. Roots feed microbes. Water stays where it falls.</p>
            <p>When these cycles are broken, nothing finishes.</p>
            <p>Each season removes more than the last one rebuilt.</p>
          </AccordionItem>

          <AccordionItem
            title="Why does the land no longer fix itself?"
            answer="Because essential relationships were replaced by external inputs."
          >
            <p>Nearby, a forest grows.</p>
            <p>No fertilizer is added. No irrigation is installed. No pests are controlled.</p>
            <p>And yet the soil remains alive.</p>
            <p>The difference is not effort. It is design.</p>
          </AccordionItem>

          <AccordionItem
            title="What is the forest doing that the field is not?"
            answer="It keeps all life-supporting relationships intact."
          >
            <p>
              Leaves fall and become food. Roots hold water and feed life underground. Plants protect one another from
              heat and wind.
            </p>
            <p>Nothing essential is removed. Nothing is outsourced.</p>
          </AccordionItem>

          <AccordionItem
            title="What changed when farming began to fail?"
            answer="Land was redesigned for extraction, not regeneration."
          >
            <p>Soil biology was replaced with fertilizer. Water storage was replaced with irrigation. Balance was replaced with chemicals.</p>
            <p>Each replacement worked — briefly.</p>
            <p>Each one increased dependence.</p>
          </AccordionItem>

          <AccordionItem
            title="What question changes everything?"
            answer="What did this land used to do by itself that we are now doing for it?"
          >
            <p>That question shifts attention from adding more to restoring function.</p>
          </AccordionItem>

          <AccordionItem
            title="What happens when relationships are restored?"
            answer="The land begins repairing itself again."
          >
            <p>Soil is kept covered. Different plants grow together. Roots stay in the ground. Shade returns.</p>
            <p>Water stays longer. Soil darkens. Balance re-emerges.</p>
            <p>Not because the land was fixed, but because it was allowed to function.</p>
          </AccordionItem>

          <AccordionItem
            title="What was the real problem all along?"
            answer="The system prevented the land from helping itself."
          >
            <p>Effort was never the issue.</p>
            <p>Design was.</p>
          </AccordionItem>

          <AccordionItem
            title="So what kind of system allows land to heal itself?"
            answer="A system designed like a living forest."
          >
            <p>A syntropic food agroforest applies the logic of a forest to food production.</p>
            <p>Different plants grow together. Fast growers prepare the soil. Long-lived species stabilize the system.</p>
            <p>Leaves become soil. Roots hold water. Life replaces itself continuously.</p>
            <p>Food appears as a result, not a demand.</p>
          </AccordionItem>

          <AccordionItem
            title="Why doesn’t a syntropic food agroforest need constant repair?"
            answer="Because it rebuilds itself as it produces."
          >
            <p>
              When plants die, they feed the soil. When conditions shift, the system adapts. When one species weakens,
              another fills the gap.
            </p>
            <p>Work still exists, but it is no longer endless.</p>
          </AccordionItem>

          <AccordionItem
            title="Why might this be the future of farming?"
            answer="Because systems that regenerate themselves survive uncertainty."
          >
            <p>As inputs become costly and conditions become unstable, systems that depend on constant correction struggle.</p>
            <p>Systems that repair themselves endure.</p>
          </AccordionItem>

          <AccordionItem
            title="One question to leave with"
            answer="If forests can feed life without collapsing, why shouldn’t our food systems do the same?"
          >
            <p>A system that heals as it produces does not need saving.</p>
            <p>It only needs space to grow.</p>
          </AccordionItem>
        </div>

        {/* CONTINUATION (kept from current file) */}
        <div className="mt-12 max-w-3xl grid gap-4 sm:grid-cols-2">
          <Link
            href="/stewardship"
            className="rounded-2xl border border-neutral-200 p-6 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900/40"
          >
            <h4 className="font-semibold">Be a Steward</h4>
            <p className="mt-2 text-sm">
              Activate an acre of regeneration through direct care of land and soil.
            </p>
          </Link>

          <Link
            href="/investor/pri"
            className="rounded-2xl border border-neutral-200 p-6 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900/40"
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
