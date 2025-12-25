
import type { Metadata } from "next";
import { GlobalHero } from "@/components/hero/GlobalHero";
import { type QuestionMeta } from "../getQuestions";

export const questionMeta: QuestionMeta = {
  slug: "visual-modeling",
  question: "Why do some systems need to be seen, not just described?",
  category: "Tools & Technology",
  order: 10,
};

export const metadata: Metadata = {
  title: "Why do some systems need to be seen, not just described?",
  description:
    "An answer-first explanation of why regenerative systems require visual modeling — and how seeing change over time prevents false certainty.",
};

export default function VisualModelingQuestionPage() {
  const contentId = "content";

  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      {/* ================= HERO (DO NOT TOUCH) ================= */}
      <GlobalHero
        headline={`Why do some systems need to be seen,
not just described?`}
        dek={
          <>
            <p>
              Some systems don’t make sense in still pictures or single
              explanations.
            </p>
            <p>
              When change, relationships, and time matter, description alone can
              quietly distort the truth.
            </p>
            <p className="mt-4 font-medium">
              The answer isn’t more detail.
            </p>
            <p className="italic">It’s seeing how the system actually moves.</p>
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
            title="Why isn’t description alone enough for regenerative systems?"
            answer="Because regenerative systems change through time, not just parts."
          >
            <p>Imagine trying to understand a storm from a single photograph.</p>
            <p>
              You might see clouds. You might see rain. But you would not see
              pressure building, wind shifting, or when the storm will pass.
            </p>
            <p>
              Regenerative systems behave the same way. Soil, ecosystems, and
              health do not respond instantly. They accumulate, adapt, and
              sometimes collapse only after long delays.
            </p>
            <p className="font-medium">
              When we rely only on description, we mistake snapshots for
              understanding.
            </p>
          </Details>

          <Details
            title="What kind of systems need to be seen over time?"
            answer="Systems where outcomes emerge from relationships, not single causes."
          >
            <p>Healthy soil is not one ingredient.</p>
            <p>Recovery is not one intervention.</p>
            <p>Stability is not one number.</p>
            <p>
              These outcomes emerge from relationships — between organisms,
              environment, behavior, stress, and recovery.
            </p>
            <p>
              When relationships are separated into parts, they stop explaining
              the whole.
            </p>
            <p className="font-medium">
              Seeing them interact restores meaning.
            </p>
          </Details>

          <Details
            title="What goes wrong when we don’t visualize these systems?"
            answer="We develop confidence in explanations that are incomplete."
          >
            <p>Some systems look stable right before they fail.</p>
            <p>Others look chaotic right before they recover.</p>
            <p>
              Without visual continuity, we often confuse short-term improvement
              with long-term health, or adaptation with healing.
            </p>
            <p className="font-medium">
              Visualization does not guarantee truth.
            </p>
            <p>But avoiding it often guarantees distortion.</p>
          </Details>

          <Details
            title="Why isn’t this just about making things easier to understand?"
            answer="Because visualization here is about accuracy, not simplification."
          >
            <p>This is not about making research entertaining.</p>
            <p>It is about preventing misunderstanding.</p>
            <p>
              Some truths become less accurate when over-simplified. Visual
              models help preserve complexity without overwhelming language.
            </p>
            <p className="font-medium">
              In these cases, seeing is not a shortcut.
            </p>
            <p>It is a safeguard.</p>
          </Details>

          <Details
            title="Where do computation and AI enter this process?"
            answer="When systems become too complex to follow by hand."
          >
            <p>
              Some models involve many interacting variables, repeated
              simulations, comparisons across scenarios, and changes unfolding
              over months or years.
            </p>
            <p>
              Computational tools, including AI-assisted workflows, help trace
              these consequences without inventing them.
            </p>
            <p className="font-medium">
              The role of AI here is not creativity.
            </p>
            <p>It is continuity.</p>
          </Details>

          <Details
            title="Why translate research into visual explanations for the public?"
            answer="Because misunderstood research can do as much harm as no research."
          >
            <p>ZenTrust conducts non-commercial research for public benefit.</p>
            <p>
              But research that cannot be understood is incomplete. Some
              findings must be shown so educators, practitioners, and
              communities can see what the research shows, what it does not
              claim, and where uncertainty remains.
            </p>
            <p className="font-medium">
              Visual explanations are derived from research results.
            </p>
            <p>They are not narratives added afterward.</p>
          </Details>

          <Details
            title="So what is visual modeling really for?"
            answer="To avoid mistaking clarity for truth."
          >
            <p>
              Visual modeling does not replace theory, measurement, or lived
              experience.
            </p>
            <p>It supports them when description alone would flatten reality.</p>
            <p className="font-medium">
              The real question is not whether we should visualize everything,
            </p>
            <p>
              but when avoiding visualization would hide the truth instead of
              protecting it.
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
