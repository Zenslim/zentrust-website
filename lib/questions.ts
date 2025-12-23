import { questionsContent, type QuestionContent } from "@/content/questions/questions.content";

export type QuestionDocument = QuestionContent;

export async function fetchQuestions(): Promise<QuestionDocument[]> {
  return [...questionsContent].sort((a, b) => a.question.localeCompare(b.question));
}

export async function fetchQuestionBySlug(
  slug: string,
): Promise<QuestionDocument | null> {
  return questionsContent.find((question) => question.slug === slug) ?? null;
}

export function getPublishedQuestionSlugsFromFiles(): string[] {
  return questionsContent
    .filter((question) => question.status === "published")
    .map((question) => question._sys.filename);
}
