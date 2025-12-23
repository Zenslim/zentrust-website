import Link from "next/link";
import { GlobalHero } from "@/components/hero/GlobalHero";
import { fetchQuestions } from "@/lib/questions";

const CATEGORY_ORDER = [
  "Nature & Land",
  "Health & Suffering",
  "Mind & Experience",
  "Schools & Systems",
  "Meaning & Seeking",
  "Tools & Technology",
] as const;

export default async function QuestionsIndexPage() {
  const contentId = "questions-list";
  const questions = await fetchQuestions();

  const published = questions.filter(
    (question) => question.status === "published",
  );

  const grouped = CATEGORY_ORDER.map((category) => ({
    category,
    items: published.filter((question) => question.category === category),
  })).filter(({ items }) => items.length > 0);

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
                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
                  {category
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
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
                    <li key={question._sys.filename} className="py-3">
                      <Link
                        href={`/questions/${question._sys.filename}`}
                        className="group inline-flex items-center gap-2 text-lg font-semibold text-neutral-900 transition hover:text-primary dark:text-neutral-100"
                      >
                        <span className="block max-w-3xl leading-tight">
                          {question.question}
                        </span>
                        <span
                          aria-hidden
                          className="transition group-hover:translate-x-1"
                        >
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
