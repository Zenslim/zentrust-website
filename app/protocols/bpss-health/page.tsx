import type { Metadata } from "next";
import Link from "next/link";
import { GlobalHero } from "@/components/hero/GlobalHero";

export const metadata: Metadata = {
  title: "BPSS Health — A Whole-System Perspective",
  description:
    "Why do many treatments work, yet many people still don’t feel whole? Explore a whole-system perspective on health — without blame.",
};

export default function BPSSHealthPage() {
  const contentId = "content";

  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      <GlobalHero
        kicker="Protocols"
        headline="BPSS Health — a whole-system perspective."
        dek="A calm look at how biology, psychology, social context, and meaning move together in wellbeing."
        belowAnchorId={contentId}
        mode="confirm"
        secondaryCta={{ label: "Explore the protocol", href: `#${contentId}` }}
      />

      {/* BODY */}
      <section id={contentId} className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="max-w-3xl space-y-4">
          {/* 1 */}
          <details className="group rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  Why did things improve, but not feel better?
                </h2>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  Many people assume this means they failed. That assumption quietly causes harm.
                </p>
              </div>
              <span className="rounded-full border border-neutral-200 px-3 py-1 text-xs dark:border-neutral-800">
                Expand
              </span>
            </summary>
            <div className="mt-5 space-y-3">
              <p>You followed the instructions.</p>
              <p>You took the medicine.</p>
              <p>You showed up.</p>
              <p>Your test results improved.</p>
              <p>And yet, something didn’t fully settle.</p>
              <p>Most people assume this means they failed.</p>
              <p>That assumption hurts more than the condition.</p>
            </div>
          </details>

          {/* 2 */}
          <details className="group rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  What if nothing was actually broken?
                </h2>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  The plant wasn’t broken. The system around it was incomplete.
                </p>
              </div>
              <span className="rounded-full border border-neutral-200 px-3 py-1 text-xs dark:border-neutral-800">
                Expand
              </span>
            </summary>
            <div className="mt-5 space-y-3">
              <p>A gardener notices one plant looks weak.</p>
              <p>The fertilizer helps, but not fully.</p>
              <p>Eventually someone asks:</p>
              <ul className="space-y-1 pl-4">
                <li>🌱 How’s the soil?</li>
                <li>💧 How’s the water flow?</li>
                <li>☀️ How much sunlight reaches this spot?</li>
              </ul>
              <p>The plant wasn’t broken.</p>
              <p>The frame was too small.</p>
            </div>
          </details>

          {/* 3 */}
          <details className="group rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  Why does fixing one thing so often fall short?
                </h2>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  Outcomes change when biology, stress, and meaning interact.
                </p>
              </div>
              <span className="rounded-full border border-neutral-200 px-3 py-1 text-xs dark:border-neutral-800">
                Expand
              </span>
            </summary>
            <div className="mt-5 space-y-3">
              <p>Health systems isolate symptoms.</p>
              <p>Often, that works.</p>
              <p>But humans live inside relationships, environments, and meaning.</p>
              <p>This isn’t failure.</p>
              <p>It’s systems behavior.</p>
            </div>
          </details>
        </div>

        {/* CONTEXT */}
        <div className="mt-12 max-w-3xl rounded-2xl border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-900/40">
          <h3 className="text-lg font-semibold tracking-tight">
            Why does this perspective exist at all?
          </h3>
          <p className="mt-3">
            ZenTrust is a public charity supporting research and education into how systems shape outcomes — in health,
            land, and communities.
          </p>
          <p className="mt-2">
            This page exists because many people already feel this pattern, but rarely see it named without judgment.
          </p>
        </div>

        {/* STILLNESS */}
        <div className="mt-12 max-w-3xl border-t pt-6">
          <p>You don’t need to agree.</p>
          <p>You don’t need to act.</p>
          <p>You don’t need to stay.</p>
          <p className="mt-4 italic">
            Sometimes healing doesn’t fail.
            <br />
            Sometimes the frame was just too small.
          </p>
        </div>

        {/* CONTINUATIONS */}
        <div className="mt-12 max-w-3xl grid gap-4 sm:grid-cols-3">
          <Link href="/research" className="rounded-2xl border p-5 hover:bg-neutral-50 dark:hover:bg-neutral-900/40">
            Understand the research lens →
          </Link>
          <Link
            href="/protocols/syntropic-ecology"
            className="rounded-2xl border p-5 hover:bg-neutral-50 dark:hover:bg-neutral-900/40"
          >
            See this pattern beyond health →
          </Link>
          <Link href="/governance" className="rounded-2xl border p-5 hover:bg-neutral-50 dark:hover:bg-neutral-900/40">
            Learn how ZenTrust works →
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
