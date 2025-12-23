import client from "@/tina/__generated__/client";
import { questionsContent, type QuestionContent } from "@/content/questions/questions.content";

type TinaQuestionNode = {
  question: string;
  heroMode: string;
  heroText: string;
  youtubeUrl?: string | null;
  category: string;
  adEligible?: boolean | null;
  status: string;
  body?: any;
  _sys: { filename: string };
};

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

function normalizeQuestion(question: QuestionContent | TinaQuestionNode): QuestionDocument {
  const slug = (question as QuestionContent).slug ?? question._sys.filename;

  return {
    ...question,
    slug,
    heroMode: question.heroMode as QuestionDocument["heroMode"],
    heroText: question.heroText,
    youtubeUrl: question.youtubeUrl ?? "",
    category: question.category,
    adEligible: Boolean(question.adEligible),
    status: question.status,
    body: (question as QuestionContent).body,
    _sys: question._sys,
  };
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

async function fetchQuestionsFromTina(): Promise<QuestionDocument[] | null> {
  try {
    const res = await client.queries.questionsConnection();
    const edges = res?.data?.questionsConnection?.edges ?? [];
    const nodes = edges
      .map((edge) => edge?.node)
      .filter(Boolean) as TinaQuestionNode[];

    if (!nodes.length) return null;

    return nodes.map(normalizeQuestion);
  } catch {
    return null;
  }
}

export async function fetchQuestions(): Promise<QuestionDocument[]> {
  const tinaQuestions = await fetchQuestionsFromTina();
  const source = tinaQuestions ?? questionsContent;

  return dedupeByCanonicalSlug(source).sort((a, b) =>
    a.question.localeCompare(b.question),
  );
}

async function fetchQuestionFromTinaBySlug(
  slug: string,
): Promise<QuestionDocument | null> {
  try {
    const res = await client.queries.questions({
      variables: { relativePath: `${slug}.mdx` },
    });

    const tinaQuestion = res?.data?.questions;
    if (!tinaQuestion) return null;

    return normalizeQuestion({
      ...tinaQuestion,
      _sys: { filename: tinaQuestion._sys.filename },
    });
  } catch {
    return null;
  }
}

export async function fetchQuestionBySlug(
  slug: string,
): Promise<QuestionDocument | null> {
  const canonicalSlug = getCanonicalSlug(slug);
  const tinaQuestion = await fetchQuestionFromTinaBySlug(canonicalSlug);

  if (tinaQuestion && tinaQuestion.status === "published") {
    return {
      ...tinaQuestion,
      slug: canonicalSlug,
      _sys: { ...tinaQuestion._sys, filename: canonicalSlug },
    };
  }

  const fallback = questionsContent.find(
    (question) => question.slug === canonicalSlug,
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
