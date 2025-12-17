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
                      Many treatments work.<br />
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
        {/* Floodlight TL;DR (below fold) */}
        <div className="max-w-3xl">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            A whole-system view of health — without blame.
          </h2>
          <p className="mt-4 leading-relaxed text-neutral-800 dark:text-neutral-200">
            This page is designed to be readable, skimmable, and safe to leave. You can expand only what feels
            relevant.
          </p>

          <div className="mt-6 space-y-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-900/40">
            <div className="flex gap-3">
              <div className="shrink-0">🧠</div>
              <p className="leading-relaxed text-neutral-900 dark:text-neutral-50">
                <span className="font-medium">Recognition first:</span> if something feels unresolved, it may not be
                your fault.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="shrink-0">🧩</div>
              <p className="leading-relaxed text-neutral-900 dark:text-neutral-50">
                <span className="font-medium">Systems lens:</span> outcomes change when biology, stress, and meaning
                interact.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="shrink-0">🕊️</div>
              <p className="leading-relaxed text-neutral-900 dark:text-neutral-50">
                <span className="font-medium">No said urgency:</span> expand at your pace. Nothing is asked of you.
              </p>
            </div>
          </div>
        </div>

        {/* Trigger Blocks — styled like the Syntropic “Depth accordion” so the visitor sees it */}
        <div className="mt-10 max-w-3xl space-y-4">
          {/* 1 */}
          <details className="group rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  When results improve, but relief doesn’t
                </h2>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  Many people assume this means they failed. That assumption quietly causes harm.
                </p>
              </div>
              <span className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-700 dark:border-neutral-800 dark:text-neutral-300">
                Expand
              </span>
            </summary>

            <div className="mt-5 space-y-4 text-neutral-800 dark:text-neutral-200">
              <p>You followed the instructions.</p>
              <p>You took the medicine.</p>
              <p>You showed up to the appointments.</p>
              <p>Your test results improved.</p>
              <p>And yet — something didn’t fully settle.</p>
              <p>Not pain, exactly. More like unfinishedness.</p>
              <p>Most people assume this means they failed.</p>
              <p>Or that they didn’t try hard enough.</p>
              <p>That assumption quietly hurts more than the condition.</p>
            </div>
          </details>

          {/* 2 */}
          <details className="group rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  A Short Story (Quiet Mirror)
                </h2>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  The plant wasn’t broken. The system around it was incomplete.
                </p>
              </div>
              <span className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-700 dark:border-neutral-800 dark:text-neutral-300">
                Expand
              </span>
            </summary>

            <div className="mt-5 space-y-4 text-neutral-800 dark:text-neutral-200">
              <p>A gardener notices one plant in the garden looks weak.</p>
              <p>They add fertilizer.</p>
              <p>The leaves improve.</p>
              <p>But the plant still struggles.</p>
              <p>So they add more fertilizer.</p>
              <p>Still no real change.</p>
              <p>Eventually, someone asks a different question:</p>

              <div className="mt-2 space-y-2 rounded-xl bg-neutral-50 p-4 dark:bg-neutral-900/40">
                <p className="flex gap-2">
                  <span className="shrink-0">🌱</span>
                  <span>“How’s the soil?”</span>
                </p>
                <p className="flex gap-2">
                  <span className="shrink-0">💧</span>
                  <span>“How’s the water flow?”</span>
                </p>
                <p className="flex gap-2">
                  <span className="shrink-0">☀️</span>
                  <span>“How much sunlight reaches this spot?”</span>
                </p>
              </div>

              <p>Nothing was wrong with the plant.</p>
              <p>The system around it was incomplete.</p>
              <p>The plant wasn’t broken.</p>
              <p>The frame was too small.</p>
            </div>
          </details>

          {/* 3 */}
          <details className="group rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  Health Is Often Treated the Same Way
                </h2>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  Systems interact. Outcomes change — even when treatment is technically correct.
                </p>
              </div>
              <span className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-700 dark:border-neutral-800 dark:text-neutral-300">
                Expand
              </span>
            </summary>

            <div className="mt-5 space-y-4 text-neutral-800 dark:text-neutral-200">
              <p>Modern health systems are very good at isolating problems.</p>
              <p>A symptom appears.</p>
              <p>A cause is identified.</p>
              <p>A solution is applied.</p>
              <p>Often, this works.</p>
              <p>But humans don’t live in isolation.</p>

              <div className="rounded-xl bg-neutral-50 p-4 dark:bg-neutral-900/40">
                <p className="font-medium">We live inside:</p>
                <ul className="mt-2 space-y-2">
                  <li className="flex gap-2">
                    <span className="shrink-0">🤝</span>
                    <span>relationships</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="shrink-0">🌍</span>
                    <span>environments</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="shrink-0">🧱</span>
                    <span>work pressures</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="shrink-0">🧭</span>
                    <span>meaning systems</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="shrink-0">🫧</span>
                    <span>chronic stress</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="shrink-0">🏛️</span>
                    <span>cultural expectations</span>
                  </li>
                </ul>
              </div>

              <p>
                When these layers interact, outcomes change — even when treatments are technically correct.
              </p>
              <p>This isn’t failure.</p>
              <p>It’s systems behavior.</p>
            </div>
          </details>

          {/* 4 */}
          <details className="group rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  Another Metaphor (Gentle Reframe)
                </h2>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  Health behaves more like a guitar than a machine part.
                </p>
              </div>
              <span className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-700 dark:border-neutral-800 dark:text-neutral-300">
                Expand
              </span>
            </summary>

            <div className="mt-5 space-y-4 text-neutral-800 dark:text-neutral-200">
              <p>Imagine tuning a guitar.</p>
              <p>One string is out of tune, so you tighten it.</p>
              <p>It improves — but still sounds wrong.</p>
              <p>You tighten it more.</p>
              <p>Now another string goes off.</p>
              <p>The problem wasn’t the string.</p>
              <p>It was tuning one string at a time in an instrument that only works together.</p>
              <p>Health behaves more like a guitar than a machine part.</p>
            </div>
          </details>

          {/* 5 */}
          <details className="group rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  What “Whole-System Health” Quietly Means
                </h2>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  These layers don’t add up. They interact.
                </p>
              </div>
              <span className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-700 dark:border-neutral-800 dark:text-neutral-300">
                Expand
              </span>
            </summary>

            <div className="mt-5 space-y-4 text-neutral-800 dark:text-neutral-200">
              <p>Some researchers use a long name for this idea:</p>
              <p className="font-medium">Biological · Psychological · Social · Spiritual</p>
              <p>But the idea itself is simple:</p>

              <div className="rounded-xl bg-neutral-50 p-4 dark:bg-neutral-900/40">
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <span className="shrink-0">🧬</span>
                    <span>Bodies respond to biology</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="shrink-0">🧠</span>
                    <span>Minds adapt to experience</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="shrink-0">🤲</span>
                    <span>Social environments shape stress and safety</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="shrink-0">🧭</span>
                    <span>Meaning changes how effort feels</span>
                  </li>
                </ul>
              </div>

              <p>These layers don’t add up.</p>
              <p>They interact.</p>
              <p>When one layer is ignored, others compensate.</p>
              <p>Over time, compensation becomes exhaustion.</p>
            </div>
          </details>

          {/* 6 */}
          <details className="group rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  This Is Not About Rejecting Medicine
                </h2>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  A completion — not a rejection.
                </p>
              </div>
              <span className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-700 dark:border-neutral-800 dark:text-neutral-300">
                Expand
              </span>
            </summary>

            <div className="mt-5 space-y-4 text-neutral-800 dark:text-neutral-200">
              <p>Medicine saves lives.</p>
              <p>Diagnostics matter.</p>
              <p>Treatment is essential.</p>
              <p>This page is not a rejection.</p>
              <p>It’s a completion.</p>
              <p>Just as soil science didn’t replace botany — it made plants understandable.</p>
              <p>Whole-system health doesn’t replace treatment.</p>
              <p>It explains why treatment sometimes isn’t enough.</p>
            </div>
          </details>

          {/* 7 */}
          <details className="group rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  A Quiet Inversion Story
                </h2>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  “What if the river is part of the diagnosis?”
                </p>
              </div>
              <span className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-700 dark:border-neutral-800 dark:text-neutral-300">
                Expand
              </span>
            </summary>

            <div className="mt-5 space-y-4 text-neutral-800 dark:text-neutral-200">
              <p>A fish is sick in a river.</p>
              <p>So someone takes the fish out, puts it on a table, and studies it carefully.</p>
              <p>They adjust the fish.</p>
              <p>Then they put it back in the same water.</p>
              <p>The fish struggles again.</p>
              <p>Eventually someone says:</p>
              <p className="font-medium">“What if the river is part of the diagnosis?”</p>
            </div>
          </details>

          {/* 8 */}
          <details className="group rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  Why This Perspective Matters
                </h2>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  Narrow frames create blame. Wider frames restore dignity.
                </p>
              </div>
              <span className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-700 dark:border-neutral-800 dark:text-neutral-300">
                Expand
              </span>
            </summary>

            <div className="mt-5 space-y-4 text-neutral-800 dark:text-neutral-200">
              <p>When systems are framed too narrowly:</p>
              <ul className="space-y-2 rounded-xl bg-neutral-50 p-4 dark:bg-neutral-900/40">
                <li className="flex gap-2">
                  <span className="shrink-0">🫥</span>
                  <span>people internalize blame</span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0">🧑‍⚕️</span>
                  <span>clinicians feel pressure they shouldn’t carry alone</span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0">🌀</span>
                  <span>outcomes look mysterious instead of patterned</span>
                </li>
              </ul>

              <p>When systems are widened:</p>
              <ul className="space-y-2 rounded-xl bg-neutral-50 p-4 dark:bg-neutral-900/40">
                <li className="flex gap-2">
                  <span className="shrink-0">🤲</span>
                  <span>responsibility becomes shared</span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0">🕊️</span>
                  <span>dignity returns</span>
                </li>
                <li className="flex gap-2">
                  <span className="shrink-0">🔍</span>
                  <span>prevention becomes visible</span>
                </li>
              </ul>

              <p>Nothing dramatic changes at first.</p>
              <p>But confusion slowly turns into clarity.</p>
            </div>
          </details>
        </div>

        {/* Context (quiet, plain) */}
        <div className="mt-12 max-w-3xl">
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-900/40">
            <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
              If You’re Wondering Why This Page Exists
            </h3>
            <div className="mt-4 space-y-3 text-neutral-800 dark:text-neutral-200">
              <p>
                ZenTrust is a public charity that funds research and education around systems-level regeneration — in
                land, health, and communities.
              </p>
              <p>This page isn’t here to convince you of anything.</p>
              <p>
                It exists because many people already feel this pattern but rarely see it named without judgment.
              </p>
            </div>
          </div>
        </div>

        {/* Stillness */}
        <div className="mt-12 max-w-3xl border-t border-neutral-200 pt-6 dark:border-neutral-800">
          <p>You don’t need to agree.</p>
          <p>You don’t need to act.</p>
          <p>You don’t need to stay.</p>
          <p className="mt-4">
            If one sentence stayed with you, this page did its job.
          </p>
          <p className="mt-4 italic">
            Sometimes healing doesn’t fail. <br />
            Sometimes the frame was just too small.
          </p>
        </div>

        {/* Continuations (equal weight) */}
        <div className="mt-12 max-w-3xl">
          <h3 className="text-lg font-semibold tracking-tight sm:text-xl">If You’d Like to Continue</h3>
          <p className="mt-3 leading-relaxed text-neutral-800 dark:text-neutral-200">
            All paths are optional. All are here later.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Link
              href="/research"
              className="group rounded-2xl border border-neutral-200 bg-white p-5 transition hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-900/40"
            >
              <div className="text-sm text-neutral-600 dark:text-neutral-400">Passive</div>
              <div className="mt-2 text-base font-semibold">Understand the research lens</div>
              <div className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
                How systems thinking is used in health science
              </div>
              <div className="mt-4 text-sm text-neutral-500 group-hover:text-neutral-700 dark:text-neutral-400 dark:group-hover:text-neutral-200">
                Continue →
              </div>
            </Link>

            <Link
              href="/protocols/syntropic-ecology"
              className="group rounded-2xl border border-neutral-200 bg-white p-5 transition hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-900/40"
            >
              <div className="text-sm text-neutral-600 dark:text-neutral-400">Active</div>
              <div className="mt-2 text-base font-semibold">See how this applies beyond health</div>
              <div className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
                The same pattern appears in ecology and communities
              </div>
              <div className="mt-4 text-sm text-neutral-500 group-hover:text-neutral-700 dark:text-neutral-400 dark:group-hover:text-neutral-200">
                Continue →
              </div>
            </Link>

            <Link
              href="/governance"
              className="group rounded-2xl border border-neutral-200 bg-white p-5 transition hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-900/40"
            >
              <div className="text-sm text-neutral-600 dark:text-neutral-400">Permanent</div>
              <div className="mt-2 text-base font-semibold">Learn how ZenTrust works</div>
              <div className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
                Governance, funding, and public-benefit structure
              </div>
              <div className="mt-4 text-sm text-neutral-500 group-hover:text-neutral-700 dark:text-neutral-400 dark:group-hover:text-neutral-200">
                Continue →
              </div>
            </Link>
          </div>
        </div>

        {/* Mandatory Trust Footer (quiet, plain) */}
        <footer className="mt-14 border-t border-neutral-200 pt-6 text-sm text-neutral-700 dark:border-neutral-800 dark:text-neutral-300">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              ZenTrust, Inc. | EIN: <span className="font-medium">33-4318487</span> | IRS Status:{" "}
              <span className="font-medium">170(b)(1)(A)(vi)</span>
            </div>

            <nav className="flex flex-wrap gap-x-4 gap-y-2">
              <Link href="/docs/irs-determination-letter" className="hover:underline underline-offset-4">
                IRS Determination Letter
              </Link>
              <Link href="/financials" className="hover:underline underline-offset-4">
                Financials
              </Link>
              <Link href="/governance" className="hover:underline underline-offset-4">
                Governance
              </Link>
              <Link href="/privacy" className="hover:underline underline-offset-4">
                Privacy Policy
              </Link>
            </nav>
          </div>
        </footer>
      </section>
    </main>
  );
}
