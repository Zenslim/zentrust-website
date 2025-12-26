import Link from "next/link";
import type { Metadata } from "next";
import type { ReactElement } from "react";
import { GlobalHero } from "@/components/hero/GlobalHero";
import {
  Brain,
  Compass,
  HeartPulse,
  Leaf,
  School,
  Wrench,
} from "lucide-react";

type QuestionCategory =
  | "Nature & Land"
  | "Health & Suffering"
  | "Mind & Experience"
  | "Schools & Systems"
  | "Meaning & Seeking"
  | "Tools & Technology";

type Question = {
  slug: string;
  title: string;
  category: string;
};

const CATEGORY_ORDER: readonly QuestionCategory[] = [
  "Nature & Land",
  "Health & Suffering",
  "Mind & Experience",
  "Schools & Systems",
  "Meaning & Seeking",
  "Tools & Technology",
];

const CATEGORY_ICONS: Partial<Record<QuestionCategory, ReactElement>> = {
  "Nature & Land": <Leaf className="h-5 w-5" aria-hidden />,
  "Health & Suffering": <HeartPulse className="h-5 w-5" aria-hidden />,
  "Mind & Experience": <Brain className="h-5 w-5" aria-hidden />,
  "Schools & Systems": <School className="h-5 w-5" aria-hidden />,
  "Meaning & Seeking": <Compass className="h-5 w-5" aria-hidden />,
  "Tools & Technology": <Wrench className="h-5 w-5" aria-hidden />,
};

const questionModules = import.meta.glob<{ metadata?: Metadata }>(
  "./*/page.tsx",
  { eager: true },
);

function collectQuestions(): Question[] {
  return Object.entries(questionModules)
    .map(([path, module]) => {
      const metadata = module.metadata;
      const slug = path.replace("./", "").split("/")[0];

      if (!metadata || typeof metadata.other?.category !== "string") {
        return null;
      }

      return {
        slug,
        title: metadata.title ?? slug,
        category: metadata.other.category,
      } satisfies Question;
    })
    .filter((entry): entry is Question => Boolean(entry))
    .sort((a, b) => a.title.localeCompare(b.title));
}

function getCategoryWeight(category: string) {
  const index = CATEGORY_ORDER.indexOf(category as QuestionCategory);

  return index === -1 ? CATEGORY_ORDER.length : index;
}

function groupQuestions(questions: Question[]) {
  const grouped = new Map<string, Question[]>();

  for (const question of questions) {
    const existing = grouped.get(question.category) ?? [];
    grouped.set(question.category, [...existing, question]);
  }

  return Array.from(grouped.entries())
    .sort(([categoryA], [categoryB]) =>
      getCategoryWeight(categoryA) - getCategoryWeight(categoryB),
    )
    .map(([category, items]) => ({
      category,
      items: [...items].sort((a, b) => a.title.localeCompare(b.title)),
    }));
}

export default function QuestionsIndexPage() {
  const contentId = "questions-list";

  const questions = collectQuestions();
  const grouped = groupQuestions(questions);

  return (
    <main className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      <GlobalHero
        kicker="ZenTrust Questions"
        headline={`Questions are rooms.
Enter to see clearly.`}
        dek="Each room holds a single question and its clearest available answer. No opinions. No persuasion. Just the conditions required to see reality without noise."
        belowAnchorId={contentId}
        mode="confirm"
        ritual={{ enabled: false }}
      />

      <section
        id={contentId}
        className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16 sm:px-8 lg:px-10"
      >
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">
            Published Questions
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Rooms organized by category
          </h1>
          <p className="max-w-2xl text-sm text-neutral-700 dark:text-neutral-300">
            Browse by category to enter the room you need. Each listing shows
            only the canonical question—no dates, authors, or summaries.
          </p>
        </header>

        {grouped.length === 0 && (
          <div className="rounded-2xl border border-neutral-200 bg-white/70 p-6 text-sm text-neutral-700 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-200">
            Published questions will appear here as they are added.
          </div>
        )}

        <div className="space-y-8">
          {grouped.map(({ category, items }) => (
            <div key={category} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {CATEGORY_ICONS[category]}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-primary/70">
                    Category
                  </p>
                  <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                    {category}
                  </h2>
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white/80 p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/50">
                <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
                  {items.map((question) => (
                    <li key={question.slug} className="py-3">
                      <Link
                        href={`/questions/${question.slug}`}
                        className="group inline-flex items-center gap-2 text-lg font-semibold text-neutral-900 transition hover:text-primary dark:text-neutral-100"
                      >
                        <span className="block max-w-3xl leading-tight">
                          {question.question}
                        </span>
                        <span aria-hidden className="transition group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
