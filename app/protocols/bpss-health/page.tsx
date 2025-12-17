import type { Metadata } from "next";
import Link from "next/link";
import QuietMirrorHeroMedia from "@/components/hero/QuietMirrorHeroMedia";

export const metadata: Metadata = {
  title: "BPSS Health: A Whole-System Perspective",
  description:
    "Many treatments work. Yet many people still don’t feel whole. Explore a whole-system perspective on health — without blame.",
};

export default function BPSSHealthPage() {
  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      {/* Quiet Mirror entry: ask nothing, safe to leave */}
      <section className="relative">
        <QuietMirrorHeroMedia
          mobileVideoSrc="/video/mobile-bpss-v1-quiet-mirror.mp4"
          heroImageSrc="/images/desktop-bpss-v1-quiet-mirror.jpg"
          heroImageAlt="Quiet Mirror: human biological, psychological, and social systems in calm coherence"
        >
          <div className="mx-auto flex h-full max-w-6xl flex-col px-4 sm:px-6">
            {/* Quiet Mirror label */}
            <div className="pt-5 sm:pt-6">
              <div className="inline-flex rounded-full bg-white/70 px-3 py-1 text-xs font-medium tracking-wide text-neutral-900 backdrop-blur dark:bg-black/50 dark:text-neutral-50">
                There Is Coherence Beneath the Confusion.
              </div>
            </div>

            <div className="flex-1" />

            {/* Hero copy — ALL WHITE */}
            <div className="pb-8 sm:pb-10">
              <div className="hero-text max-w-3xl">
                <h1 className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl text-white">
                  Yet many people still don’t feel whole.
                </h1>

                <p className="mt-4 text-base leading-relaxed sm:text-lg text-white/90">
                  This page explores why — without blame.
                </p>

                {/* Orientation FIRST */}
                <p className="mt-4 text-sm sm:text-base text-white/80">
                  ⏱ About a 3-minute exploration
                </p>

                {/* Permission SECOND */}
                <p className="mt-2 text-sm sm:text-base text-white/80">
                  If you’d like to continue, the map is below.
                </p>
              </div>
            </div>
          </div>
        </QuietMirrorHeroMedia>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Trigger Blocks */}
        <div className="max-w-3xl space-y-4">
          {/* Trigger 1 */}
          <details className="group rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
            <summary className="cursor-pointer list-none">
              <h2 className="text-lg font-semibold tracking-tight">
                When results improve, but relief doesn’t
              </h2>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                Many people assume this means they failed. That assumption quietly causes harm.
              </p>
            </summary>
            <div className="mt-4 space-y-3 text-neutral-800 dark:text-neutral-200">
              <p>You followed the instructions. You took the medicine. You showed up.</p>
              <p>Your test results improved — yet something didn’t fully settle.</p>
              <p>
                Most people assume this means they didn’t try hard enough. That assumption hurts
                more than the condition itself.
              </p>
            </div>
          </details>

          {/* Trigger 2 */}
          <details className="group rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
            <summary className="cursor-pointer list-none">
              <h2 className="text-lg font-semibold tracking-tight">
                The garden wasn’t broken
              </h2>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                Sometimes the system around a problem is incomplete.
              </p>
            </summary>
            <div className="mt-4 space-y-3 text-neutral-800 dark:text-neutral-200">
              <p>A gardener notices one plant looks weak.</p>
              <p>The fertilizer helps — but not fully.</p>
              <p>
                Eventually someone asks about the soil, water flow, and sunlight.
                The plant wasn’t broken. The frame was too small.
              </p>
            </div>
          </details>

          {/* Trigger 3 */}
          <details className="group rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
            <summary className="cursor-pointer list-none">
              <h2 className="text-lg font-semibold tracking-tight">
                Humans don’t live in isolation
              </h2>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                Outcomes change when biology, stress, and meaning interact.
              </p>
            </summary>
            <div className="mt-4 space-y-3 text-neutral-800 dark:text-neutral-200">
              <p>Modern health systems isolate symptoms — often successfully.</p>
              <p>But humans live inside relationships, environments, pressure, and meaning.</p>
              <p>
                When these layers interact, unresolved outcomes are often mistaken for failure.
              </p>
            </div>
          </details>

          {/* Trigger 4 */}
          <details className="group rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
            <summary className="cursor-pointer list-none">
              <h2 className="text-lg font-semibold tracking-tight">
                Completion, not rejection
              </h2>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                Whole-system health doesn’t replace medicine.
              </p>
            </summary>
            <div className="mt-4 space-y-3 text-neutral-800 dark:text-neutral-200">
              <p>Medicine saves lives. Diagnostics matter. Treatment is essential.</p>
              <p>This perspective doesn’t reject medicine — it completes the frame.</p>
              <p>
                Just as soil science didn’t replace botany, systems thinking explains why treatment
                alone may not be enough.
              </p>
            </div>
          </details>

          {/* Trigger 5 */}
          <details className="group rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
            <summary className="cursor-pointer list-none">
              <h2 className="text-lg font-semibold tracking-tight">
                What if the river matters?
              </h2>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                Sometimes the environment is part of the diagnosis.
              </p>
            </summary>
            <div className="mt-4 space-y-3 text-neutral-800 dark:text-neutral-200">
              <p>A fish is taken from a polluted river and examined carefully.</p>
              <p>The fish is adjusted — then returned to the same water.</p>
              <p>
                Eventually someone asks: what if the river is part of the diagnosis?
              </p>
            </div>
          </details>
        </div>

        {/* Progressive Disclosure */}
        <div className="mt-10 max-w-3xl">
          <details className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
            <summary className="cursor-pointer list-none font-medium">
              Why this perspective matters
            </summary>
            <div className="mt-4 space-y-3 text-neutral-800 dark:text-neutral-200">
              <p>Narrow frames create blame and confusion.</p>
              <p>Wider frames restore dignity and reveal prevention.</p>
              <p>Confusion turns into clarity — quietly.</p>
            </div>
          </details>
        </div>

        {/* Context */}
        <div className="mt-10 max-w-3xl">
          <h3 className="text-lg font-semibold tracking-tight">
            Why this page exists
          </h3>
          <p className="mt-3 leading-relaxed text-neutral-800 dark:text-neutral-200">
            ZenTrust is a public charity supporting systems-level research and education across
            health, land, and communities.
          </p>
          <p className="mt-3 leading-relaxed text-neutral-800 dark:text-neutral-200">
            This page exists because many people already feel this pattern — but rarely see it named
            without judgment.
          </p>
        </div>

        {/* Stillness */}
        <div className="mt-12 max-w-3xl border-t border-neutral-200 pt-6 dark:border-neutral-800">
          <p>You don’t need to agree.</p>
          <p>You don’t need to act.</p>
          <p>You don’t need to stay.</p>

          <p className="mt-4 italic">
            Sometimes healing doesn’t fail. <br />
            Sometimes the frame was just too small.
          </p>
        </div>

        {/* Continuations */}
        <div className="mt-12 max-w-3xl grid gap-4 sm:grid-cols-3">
          <Link
            href="/research"
            className="rounded-2xl border border-neutral-200 p-5 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900/40"
          >
            Understand the research lens →
          </Link>

          <Link
            href="/protocols/syntropic-ecology"
            className="rounded-2xl border border-neutral-200 p-5 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900/40"
          >
            See this pattern beyond health →
          </Link>

          <Link
            href="/governance"
            className="rounded-2xl border border-neutral-200 p-5 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900/40"
          >
            Learn how ZenTrust works →
          </Link>
        </div>

        {/* Trust Footer */}
        <footer className="mt-14 border-t border-neutral-200 pt-6 text-sm text-neutral-700 dark:border-neutral-800 dark:text-neutral-300">
          ZenTrust, Inc. | EIN 33-4318487 | 501(c)(3)
        </footer>
      </section>
    </main>
  );
}
