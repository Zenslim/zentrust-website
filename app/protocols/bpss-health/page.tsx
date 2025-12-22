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
          <Details
            title="Why did things improve, but still not feel better?"
            answer="Because treatments reduced symptoms, but the deeper conditions shaping your body, mind, life, and sense of meaning did not change."
          >
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
          </Details>

          {/* 2 */}
          <Details
            title="Why didn’t anyone look at the real cause?"
            answer="Because modern systems are trained to treat visible problems, not the conditions that create them."
          >
            <p>We were taught to solve problems by fixing what we can see.</p>
            <p>Wet floor? → Clean it.</p>
            <p>Pain present? → Treat the pain.</p>
            <p>
              This way of thinking comes from an education system designed for efficiency and specialization.
              Each person is trained to fix a part. No one is responsible for the whole.
            </p>
            <p>Looking up at the roof isn’t assigned to anyone. So it never happens.</p>
          </Details>

          {/* 3 */}
          <Details
            title="Why did the treatments still help?"
            answer="Because managing symptoms prevents damage and allows survival, even if it cannot create healing."
          >
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
          </Details>

          {/* 4 */}
          <Details
            title="What exactly is healthcare doing well?"
            answer="Healthcare is very good at managing harm once stress and illness are already inside the body."
          >
            <p>When water reaches the floor, medicine responds skillfully:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Mopping the floor</strong> → painkillers, anti-inflammatories</li>
              <li><strong>Placing buckets</strong> → blood-pressure drugs, antiplatelets, cholesterol medications</li>
              <li><strong>Sweeping water away</strong> → sugar control, acid suppression, organ-protective drugs</li>
              <li><strong>Holding an umbrella</strong> → antidepressants, anxiolytics, stimulants</li>
            </ul>
            <p>These actions save lives. They make life livable.</p>
            <p className="font-medium">But none of them stop the rain.</p>
          </Details>

          {/* 5 */}
          <Details
            title="Why doesn’t my body ever fully relax?"
            answer="Because the body keeps responding to ongoing stress, even when symptoms are controlled."
          >
            <p>Imagine living in that house for years.</p>
            <p>Even on sunny days, you stay alert. You check the forecast. You notice clouds before others do.</p>
            <ul className="list-disc pl-6">
              <li>lingering fatigue</li>
              <li>background anxiety</li>
              <li>“something still feels off”</li>
            </ul>
            <p>The body isn’t broken. It’s responding correctly to an unresolved problem.</p>
          </Details>

          {/* 6 */}
          <Details
            title="What is the Biopsychosocial-Spiritual (BPSS) view of health?"
            answer="BPSS means understanding health as the result of how the body, mind, life conditions, and sense of meaning interact together."
          >
            <p>The Biopsychosocial-Spiritual (BPSS) model views a person as a whole human being.</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Biological</strong> — nerves, hormones, inflammation, genetics, physical strain</li>
              <li><strong>Psychological</strong> — stress, fear, grief, pressure</li>
              <li><strong>Social</strong> — work conditions, safety, isolation, instability, rest</li>
              <li><strong>Spiritual</strong> — meaning, purpose, values</li>
            </ul>
            <p>When these layers support each other, the system settles. When they pull against each other, suffering appears.</p>
          </Details>

          {/* 7 */}
          <Details
            title="How does this relate to the leaking roof?"
            answer="The roof represents all four BPSS layers working together to keep stress out of the body."
          >
            <p>A roof is not one surface.</p>
            <p>It is a system of layers.</p>
            <p>Water leaks only when several layers fail together.</p>
            <p>Human suffering works the same way.</p>
          </Details>

          {/* 8 */}
          <Details
            title="Biology — the body’s sensitivity and wear"
            answer="Biology determines how easily stress turns into symptoms."
          >
            <ul className="list-disc pl-6">
              <li>nervous system sensitivity</li>
              <li>hormones</li>
              <li>inflammation</li>
              <li>genetics</li>
              <li>exhaustion</li>
            </ul>
            <p>Medicine is excellent at limiting damage once stress breaks through.</p>
            <p>It does not remove the stress itself.</p>
          </Details>

          {/* 9 */}
          <Details
            title="Psychology — the internal load"
            answer="Psychological strain keeps the body in a constant state of alert."
          >
            <p>Chronic stress, fear, unresolved grief, and pressure bend the system over time.</p>
            <p>When this load never lifts, symptoms return — even with treatment.</p>
          </Details>

          {/* 10 */}
          <Details
            title="Social conditions — the environment you live in"
            answer="Social conditions decide whether stress keeps returning every day."
          >
            <p>Unsafe work, isolation, instability, and lack of rest are like constant storms.</p>
            <p>You can reinforce the roof endlessly.</p>
            <p>If the storm never stops, leaks return.</p>
          </Details>

          {/* 11 */}
          <Details
            title="Spiritual / meaning — why you are living this life"
            answer="A lack of meaning keeps the system under strain, even when everything else improves."
          >
            <p>This is not religion.</p>
            <p>It is meaning.</p>
            <ul className="list-disc pl-6">
              <li>“Why am I doing this?”</li>
              <li>“Does my life make sense?”</li>
              <li>“Am I living against what matters to me?”</li>
            </ul>
            <p>A house built without purpose gets patched forever.</p>
            <p>So do lives without meaning.</p>
          </Details>

          {/* 12 */}
          <Details
            title="When does suffering actually begin?"
            answer="Suffering begins when biological strain, psychological stress, social pressure, and loss of meaning act together."
          >
            <p>Pain, fatigue, anxiety, illness — these are not the roof.</p>
            <p>They are water on the floor.</p>
            <p>Signals, not failures.</p>
          </Details>

          {/* 13 */}
          <Details
            title="Why is BPSS / holistic care necessary?"
            answer="Because only a whole-system approach can stop stress from entering the body at its source."
          >
            <ul className="list-disc pl-6">
              <li>caring for the body</li>
              <li>relieving mental load</li>
              <li>improving life conditions</li>
              <li>restoring meaning and direction</li>
            </ul>
            <p>When all four change together, the leak stops.</p>
            <p>Buckets disappear. Umbrellas are put away. Mopping ends.</p>
            <p className="font-medium">Healing feels quiet. That’s how you know it’s real.</p>
          </Details>

          {/* 14 */}
          <Details
            title="What does this mean for Me?"
            answer="If my symptoms improved but didn’t heal, it means I adapted to the problem instead of removing it."
          >
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
          </Details>

          {/* 15 */}
          <Details
            title="One simple thought to leave with"
            answer="If the floor keeps getting wet, it’s time to look up."
          >
            <p>You were never failing.</p>
            <p>You were never ungrateful.</p>
            <p>You were living under a leak.</p>
            <p className="font-medium">
              Healing begins the moment the whole roof enters the frame.
            </p>
          </Details>

        </div>

        {/* TRUST */}
        <footer className="mt-14 border-t pt-6 text-sm text-neutral-600 dark:text-neutral-400">
          ZenTrust, Inc. | EIN 33-4318487 | 501(c)(3)
        </footer>
      </section>
    </main>
  );
}

/* ----------------------------------------
   Details Component
----------------------------------------- */

function Details({
  title,
  answer,
  children,
}: {
  title: string;
  answer: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {title}
          </h2>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            {answer}
          </p>
        </div>
        <span className="rounded-full border border-neutral-200 px-3 py-1 text-xs dark:border-neutral-800">
          Expand
        </span>
      </summary>
      <div className="mt-5 space-y-3 text-sm leading-relaxed">
        {children}
      </div>
    </details>
  );
}
