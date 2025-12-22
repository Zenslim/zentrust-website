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
      {/* HERO — DO NOT TOUCH */}
      <GlobalHero
        headline={`Why did things improve,
but still not feel better?`}
        dek={`Many people assume this means they failed.
That assumption quietly causes harm.
When health is treated in parts, improvement isn’t the same as healing.`}
        belowAnchorId={contentId}
        mode="confirm"
      />

      {/* BODY */}
      <section
        id={contentId}
        className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16"
      >
        <div className="max-w-3xl space-y-4">

          {/* 1 */}
          <details className="group rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  Why did things improve, but still not feel better?
                </h2>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  Because treatments reduced symptoms, but the deeper conditions shaping your body, mind, life, and sense of meaning did not change.
                </p>
              </div>
              <span className="rounded-full border border-neutral-200 px-3 py-1 text-xs dark:border-neutral-800">
                Expand
              </span>
            </summary>

            <div className="mt-5 space-y-3">
              <p>Imagine living in a house with a slow leak in the roof.</p>
              <p>At first, water drips onto the floor. You slip. You panic. It feels urgent.</p>
              <p>So you act.</p>
              <p>You wipe the floor every morning. You place a bucket under the drip. On bad days, you carry an umbrella inside the house.</p>
              <p>Each solution helps. The floor stays dry. Life becomes manageable again.</p>
              <p>From the outside, it looks solved.</p>
              <p>But every time it rains, your body tightens. You listen for the drip. You plan your life around it.</p>
              <p className="font-medium">
                Healing doesn’t feel like better buckets. Healing feels like the roof being fixed.
              </p>
            </div>
          </details>

          {/* 2 */}
          <details className="group rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  Why didn’t anyone look at the real cause?
                </h2>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  Because modern systems are trained to treat visible problems, not the conditions that create them.
                </p>
              </div>
              <span className="rounded-full border border-neutral-200 px-3 py-1 text-xs dark:border-neutral-800">
                Expand
              </span>
            </summary>

            <div className="mt-5 space-y-3">
              <p>We were taught to solve problems by fixing what we can see.</p>
              <p>Wet floor? → Clean it.</p>
              <p>Pain present? → Treat the pain.</p>
              <p>
                This way of thinking comes from an education system designed for efficiency and specialization.
                Each person is trained to fix a part. No one is responsible for the whole.
              </p>
              <p>Looking up at the roof isn’t assigned to anyone. So it never happens.</p>
            </div>
          </details>

          {/* 3 */}
          <details className="group rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  Why did the treatments still help?
                </h2>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  Because managing symptoms prevents damage and allows survival, even if it cannot create healing.
                </p>
              </div>
              <span className="rounded-full border border-neutral-200 px-3 py-1 text-xs dark:border-neutral-800">
                Expand
              </span>
            </summary>

            <div className="mt-5 space-y-3">
              <p>Buckets matter. Mopping matters.</p>
              <p>If you ignore the water, the house rots faster.</p>
              <p>That’s why treatments help:</p>
              <ul className="list-disc pl-6">
                <li>pain decreases</li>
                <li>numbers improve</li>
                <li>organs are protected</li>
              </ul>
              <p className="font-medium">
                But stopping damage is not the same as stopping the leak.
              </p>
            </div>
          </details>

          {/* 4 */}
          <details className="group rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  What exactly is healthcare doing well?
                </h2>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  Healthcare is very good at managing harm once stress and illness are already inside the body.
                </p>
              </div>
              <span className="rounded-full border border-neutral-200 px-3 py-1 text-xs dark:border-neutral-800">
                Expand
              </span>
            </summary>

            <div className="mt-5 space-y-3">
              <p>When water reaches the floor, medicine responds skillfully:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Mopping the floor</strong> → painkillers, anti-inflammatories</li>
                <li><strong>Placing buckets</strong> → blood-pressure drugs, antiplatelets, cholesterol medications</li>
                <li><strong>Sweeping water away</strong> → sugar control, acid suppression, organ-protective drugs</li>
                <li><strong>Holding an umbrella</strong> → antidepressants, anxiolytics, stimulants</li>
              </ul>
              <p>These actions save lives. They make life livable.</p>
              <p className="font-medium">But none of them stop the rain.</p>
            </div>
          </details>

          {/* 5 */}
          <details className="group rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  Why doesn’t my body ever fully relax?
                </h2>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  Because the body keeps responding to ongoing stress, even when symptoms are controlled.
                </p>
              </div>
              <span className="rounded-full border border-neutral-200 px-3 py-1 text-xs dark:border-neutral-800">
                Expand
              </span>
            </summary>

            <div className="mt-5 space-y-3">
              <p>Imagine living in that house for years.</p>
              <p>Even on sunny days, you stay alert. You check the forecast. You notice clouds before others do.</p>
              <ul className="list-disc pl-6">
                <li>lingering fatigue</li>
                <li>background anxiety</li>
                <li>“something still feels off”</li>
              </ul>
              <p>The body isn’t broken. It’s responding correctly to an unresolved problem.</p>
            </div>
          </details>

          {/* 6 */}
          <details className="group rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  What is the Biopsychosocial-Spiritual (BPSS) view of health?
                </h2>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  BPSS means my health depends on how my body, mind, life conditions, and sense of meaning work together.
                </p>
              </div>
              <span className="rounded-full border border-neutral-200 px-3 py-1 text-xs dark:border-neutral-800">
                Expand
              </span>
            </summary>

            <div className="mt-5 space-y-3">
              <p>The BPSS model views a person as a whole human being.</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Biological</strong> — nerves, hormones, inflammation, genetics, physical strain</li>
                <li><strong>Psychological</strong> — stress, fear, grief, pressure</li>
                <li><strong>Social</strong> — work, safety, relationships, rest</li>
                <li><strong>Spiritual</strong> — meaning, purpose, values</li>
              </ul>
              <p>When these layers support each other, the system settles. When they pull against each other, suffering appears.</p>
            </div>
          </details>

          {/* 7 */}
          <details className="group rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  What does this mean for Me?
                </h2>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  If my symptoms improved but didn’t heal, it means I adapted to the problem instead of removing it.
                </p>
              </div>
              <span className="rounded-full border border-neutral-200 px-3 py-1 text-xs dark:border-neutral-800">
                Expand
              </span>
            </summary>

            <div className="mt-5 space-y-3">
              <p>That’s not weakness. That’s intelligence under pressure.</p>
              <p>
                Healing begins when the question changes from
                <br />
                “How do I manage this?”
                <br />
                to
                <br />
                “Why is this still happening at all?”
              </p>
            </div>
          </details>

          {/* 8 */}
          <details className="group rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                  One simple thought to leave with
                </h2>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  If the floor keeps getting wet, it’s time to look up.
                </p>
              </div>
              <span className="rounded-full border border-neutral-200 px-3 py-1 text-xs dark:border-neutral-800">
                Expand
              </span>
            </summary>

            <div className="mt-5 space-y-3">
              <p>You were never failing. You were never ungrateful.</p>
              <p>You were living under a leak.</p>
              <p className="font-medium">
                Healing begins the moment the whole roof enters the frame.
              </p>
            </div>
          </details>

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
