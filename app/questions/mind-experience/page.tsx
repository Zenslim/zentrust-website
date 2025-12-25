import type { Metadata } from "next";
import { GlobalHero } from "@/components/hero/GlobalHero";
import { type QuestionMeta } from "../getQuestions";

export const questionMeta: QuestionMeta = {
  slug: "mind-experience",
  question: "Why does the mind keep returning to thoughts that make life harder?",
  category: "Mind & Experience",
  order: 10,
};

export const metadata: Metadata = {
  title: "Why does the mind keep returning to thoughts that make life harder?",
  description:
    "A question-led exploration of why the mind repeats painful thoughts, using simple stories to explain loops, effort, and release.",
};

export default function MindExperienceQuestionPage() {
  const contentId = "content";

  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      {/* ================= HERO ================= */}
      <GlobalHero
        headline={`Why does the mind keep returning to thoughts
that make life harder?`}
        dek={
          <>
            <p>
              Some thoughts feel like they make life smaller, heavier, harder to
              live.
            </p>
            <p>
              And yet they return — quietly, stubbornly, sometimes endlessly.
            </p>
            <p className="mt-4">
              This doesn’t happen because the mind is cruel.
            </p>
            <p>
              It happens because the mind once learned something important and
              refuses to forget.
            </p>
            <p className="mt-4 italic">
              What the mind is protecting — and why letting go cannot be forced —
              is explained below.
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
            title="Why does the mind keep bringing the same thoughts back?"
            answer="Because pain teaches faster than comfort."
          >
            <p>A dog once touched fire.</p>
            <p>The pain was immediate. Sharp enough to be unforgettable.</p>
            <p>
              From that day on, the dog never touched fire again. Years later,
              lightning split the sky — bright, loud, far away — and the dog
              panicked and ran.
            </p>
            <p>
              Fire and lightning are not the same. But the mind remembers pain,
              not categories.
            </p>
            <p className="font-medium">
              The mind isn’t confused. It is cautious.
            </p>
          </Details>

          <Details
            title="Why do these thoughts feel impossible to stop?"
            answer="Because they were trained, not chosen."
          >
            <p>
              Imagine learning to duck every time a stick flies past your head.
            </p>
            <p>
              At first, someone throws sticks on purpose. Later, leaves fall from
              a tree — and you still duck.
            </p>
            <p>
              You don’t decide to duck. Your body moves before thought arrives.
            </p>
            <p className="font-medium">
              Thought loops work the same way.
            </p>
          </Details>

          <Details
            title="Why does effort make the loop stronger?"
            answer="Because attention feeds what it tries to control."
          >
            <p>Someone looks you in the eye and says:</p>
            <p className="italic">
              “Whatever you do, do not think about monkeys.”
            </p>
            <p>
              Instantly, monkeys appear — jumping, screeching, swinging from
              trees.
            </p>
            <p>
              Not because you want them, but because attention has already been
              aimed.
            </p>
            <p className="font-medium">
              Effort shines a spotlight. And whatever is lit tends to stay.
            </p>
          </Details>

          <Details
            title="Why doesn’t understanding fix the problem?"
            answer="Because the body updates slower than ideas."
          >
            <p>You know a bridge is safe.</p>
            <p>You trust the math. You trust the engineers.</p>
            <p>
              But once — long ago — the bridge shook beneath your feet.
            </p>
            <p>
              Now, every time you cross, your stomach tightens.
            </p>
            <p className="font-medium">
              Understanding didn’t fail. The body just hasn’t updated yet.
            </p>
          </Details>

          <Details
            title="What actually allows the loop to loosen?"
            answer="When vigilance proves unnecessary."
          >
            <p>
              You forget to triple-check something you always obsess over.
            </p>
            <p>Your heart races. Your mind waits for punishment.</p>
            <p>Nothing happens.</p>
            <p className="font-medium">
              The system takes note — quietly.
            </p>
          </Details>

          <Details
            title="Is something wrong with the mind?"
            answer="No. It’s doing an old job too well."
          >
            <p>
              A smoke alarm once saved a family from a real fire.
            </p>
            <p>
              Years later, it screams every time toast burns.
            </p>
            <p className="font-medium">
              It isn’t malicious. It just never learned when danger ended.
            </p>
          </Details>

          <Details
            title="So what is this question really pointing toward?"
            answer="That release happens when force stops feeding the system."
          >
            <p>
              You try to untangle a knot by pulling harder. The knot tightens.
            </p>
            <p>
              Frustrated, you stop. Your hands soften.
            </p>
            <p className="font-medium">
              Almost by accident, the knot loosens.
            </p>
            <p>The mind behaves the same way.</p>
          </Details>
        </div>

        <footer className="mt-14 border-t pt-6 text-sm text-neutral-600 dark:text-neutral-400">
          ZenTrust, Inc. | EIN 33-4318487 | 501(c)(3)
        </footer>
      </section>
    </main>
  );
}

/* ================= DETAILS COMPONENT ================= */

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
