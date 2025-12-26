import type { Metadata } from "next";
import { GlobalHero } from "@/components/hero/GlobalHero";

export const metadata: Metadata = {
  title: "Why did things improve, but still not feel better?",
  description:
    "A whole-system explanation for why symptoms improve without healing — and why a Biopsychosocial-Spiritual approach is necessary.",
  other: {
    category: "Health & Suffering",
  },
};

export default function BPSSHealthPage() {
  const contentId = "content";

  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      {/* ================= HERO (DO NOT TOUCH) ================= */}
     <GlobalHero
  headline={`Why did things improve,
but still not feel better?`}
  dek={
    <>
      <p>Many people assume this means they failed.</p>
      <p>That assumption quietly causes harm.</p>

      <p>
        When health is treated in parts, improvement isn’t the same as healing.
      </p>

      <p className="mt-4 italic">
        Healing often begins when the question gently shifts from:
      </p>

      <p className="mt-2 font-semibold">
        “How do I manage this?”
      </p>

      <p className="mt-1 italic">to</p>

      <p className="mt-1 font-semibold">
        “Why is this still happening at all?”
      </p>
    </>
  }
  belowAnchorId={contentId}
  mode="confirm"
/>



      {/* ================= CONTENT ================= */}
      <section
        id={contentId}
        className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16"
      >
        <div className="max-w-3xl space-y-4">

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

          <Details
            title="Why did the treatments still help?"
            answer="Because managing symptoms prevents damage and allows survival, even if it cannot create healing."
          >
            <p>Buckets matter. Mopping matters.</p>
            <p>If you ignore the water, the house rots faster.</p>
            <ul className="list-disc pl-6">
              <li>pain decreases</li>
              <li>numbers improve</li>
              <li>organs are protected</li>
            </ul>
            <p className="font-medium">
              But stopping damage is not the same as stopping the leak.
            </p>
          </Details>

          <Details
            title="What exactly is healthcare doing well?"
            answer="Healthcare is very good at managing harm once stress and illness are already inside the body."
          >
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Mopping the floor</strong> → painkillers, anti-inflammatories</li>
              <li><strong>Placing buckets</strong> → blood-pressure drugs, antiplatelets, cholesterol medications</li>
              <li><strong>Sweeping water away</strong> → sugar control, acid suppression, organ-protective drugs</li>
              <li><strong>Holding an umbrella</strong> → antidepressants, anxiolytics, stimulants</li>
            </ul>
            <p className="font-medium">But none of them stop the rain.</p>
          </Details>

          <Details
            title="Why doesn’t my body ever fully relax?"
            answer="Because the body keeps responding to ongoing stress, even when symptoms are controlled."
          >
            <ul className="list-disc pl-6">
              <li>lingering fatigue</li>
              <li>background anxiety</li>
              <li>“something still feels off”</li>
            </ul>
            <p>The body isn’t broken. It’s responding correctly to an unresolved problem.</p>
          </Details>

          <Details
            title="What is the Biopsychosocial-Spiritual (BPSS) view of health?"
            answer="BPSS views health as the result of how the body, mind, social conditions, and sense of meaning interact together."
          >
            <ul className="list-disc pl-6">
              <li><strong>Biological</strong> — body and physiology</li>
              <li><strong>Psychological</strong> — mind and emotions</li>
              <li><strong>Social</strong> — environment and relationships</li>
              <li><strong>Spiritual</strong> — meaning, purpose, values</li>
            </ul>
          </Details>

          {/* ================= ROOF SECTION ================= */}
          <Details
            title="How does this relate to the leaking roof?"
            answer="The roof represents all four BPSS layers working together to keep stress out of the body."
          >
            <p>A roof is not one surface.</p>
            <p>It is a system of layers.</p>
            <p>Water leaks only when several layers fail together.</p>
            <p className="mb-6">Human suffering works the same way.</p>

            <SubDetails
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
            </SubDetails>

            <SubDetails
              title="Psychology — the internal load"
              answer="Psychological strain keeps the body in a constant state of alert."
            >
              <p>Chronic stress, fear, unresolved grief, and pressure bend the system over time.</p>
              <p>When this load never lifts, symptoms return — even with treatment.</p>
            </SubDetails>

            <SubDetails
              title="Social conditions — the environment you live in"
              answer="Social conditions decide whether stress keeps returning every day."
            >
              <p>Unsafe work, isolation, instability, and lack of rest are like constant storms.</p>
              <p>If the storm never stops, leaks return.</p>
            </SubDetails>

            <SubDetails
              title="Spiritual / meaning — why you are living this life"
              answer="A lack of meaning keeps the system under strain, even when everything else improves."
            >
              <ul className="list-disc pl-6">
                <li>“Why am I doing this?”</li>
                <li>“Does my life make sense?”</li>
                <li>“Am I living against what matters to me?”</li>
              </ul>
              <p>A house built without purpose gets patched forever.</p>
              <p>So do lives without meaning.</p>
            </SubDetails>

            <SubDetails
              title="When does suffering actually begin?"
              answer="Suffering begins when biological strain, psychological stress, social pressure, and loss of meaning act together."
            >
              <p>Pain, fatigue, anxiety, illness — these are not the roof.</p>
              <p>They are water on the floor.</p>
              <p>Signals, not failures.</p>
            </SubDetails>
          </Details>

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
            <p className="font-medium">
              When all four change together, the leak stops.
            </p>
          </Details>

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

          <Details
            title="One simple thought to leave with"
            answer="If the floor keeps getting wet, it’s time to look up."
          >
            <p>You were never failing.</p>
            <p>You were never ungrateful.</p>
            <p className="font-medium">
              Healing begins the moment the whole roof enters the frame.
            </p>
          </Details>

        </div>

        <footer className="mt-14 border-t pt-6 text-sm text-neutral-600 dark:text-neutral-400">
          ZenTrust, Inc. | EIN 33-4318487 | 501(c)(3)
        </footer>
      </section>
    </main>
  );
}

/* ================= COMPONENTS ================= */

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
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold sm:text-2xl">{title}</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {answer}
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-neutral-300 px-3 py-1 text-xs text-neutral-600 dark:border-neutral-700 dark:text-neutral-400">
          Expand
        </span>
      </summary>
      <div className="mt-5 space-y-3 text-sm leading-relaxed">
        {children}
      </div>
    </details>
  );
}

function SubDetails({
  title,
  answer,
  children,
}: {
  title: string;
  answer: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group mb-6">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold leading-snug">
            {title}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {answer}
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-neutral-300 px-3 py-1 text-xs text-neutral-600 dark:border-neutral-700 dark:text-neutral-400">
          Expand
        </span>
      </summary>
      <div className="mt-3 space-y-3 text-sm leading-relaxed">
        {children}
      </div>
    </details>
  );
}
