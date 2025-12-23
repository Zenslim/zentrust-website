import { questionsContent, type QuestionContent } from "@/content/questions/questions.content";

export type QuestionDocument = QuestionContent;

const LEGACY_CANONICAL_SLUGS: Record<string, string> = {
  "bpss-health": "bpss-health",
  "syntropic-ecology": "syntropic-ecology",
  "why-did-things-improve-but-still-not-feel-better": "bpss-health",
  "why-does-land-keep-degrading": "syntropic-ecology",
};

function getCanonicalSlug(slug: string): string {
  return LEGACY_CANONICAL_SLUGS[slug] ?? slug;
}

function dedupeByCanonicalSlug(questions: QuestionDocument[]): QuestionDocument[] {
  const map = new Map<string, QuestionDocument>();

  for (const question of questions) {
    const canonical = getCanonicalSlug(question._sys.filename);
    const existing = map.get(canonical);
    const isCanonical = canonical === question._sys.filename;

    if (!existing || isCanonical) {
      map.set(canonical, {
        ...question,
        slug: canonical,
        _sys: { ...question._sys, filename: canonical },
      });
    }
  }

  return Array.from(map.values());
}

export async function fetchQuestions(): Promise<QuestionDocument[]> {
  return dedupeByCanonicalSlug(questionsContent).sort((a, b) =>
    a.question.localeCompare(b.question),
  );
}

export async function fetchQuestionBySlug(
  slug: string,
): Promise<QuestionDocument | null> {
  const canonicalSlug = getCanonicalSlug(slug);
  const fallback = dedupeByCanonicalSlug(questionsContent).find(
    (question) => question._sys.filename === canonicalSlug,
  );

  if (fallback && fallback.status === "published") {
    return {
      ...fallback,
      slug: canonicalSlug,
      _sys: { ...fallback._sys, filename: canonicalSlug },
    };
  }

  return null;
}

export function getPublishedQuestionSlugsFromFiles(): string[] {
  const deduped = dedupeByCanonicalSlug(questionsContent);

  return deduped
    .filter((question) => question.status === "published")
    .map((question) => question._sys.filename);
}

export { getCanonicalSlug };
