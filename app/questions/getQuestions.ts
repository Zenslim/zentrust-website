import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

export type QuestionCategory =
  | "Nature & Land"
  | "Health & Suffering"
  | "Mind & Experience"
  | "Schools & Systems"
  | "Meaning & Seeking"
  | "Tools & Technology";

export type QuestionMeta = {
  slug: string;
  question: string;
  category: QuestionCategory;
  order?: number;
};

const QUESTIONS_DIR = path.join(process.cwd(), "app", "questions");

async function importQuestionMeta(pagePath: string): Promise<QuestionMeta | null> {
  const module = await import(pathToFileURL(pagePath).href);
  const meta = module.questionMeta as QuestionMeta | undefined;

  return meta ?? null;
}

async function loadQuestionsFromFilesystem(): Promise<QuestionMeta[]> {
  const entries = await fs.readdir(QUESTIONS_DIR, { withFileTypes: true });

  const questionDirs = entries.filter(
    (entry) => entry.isDirectory() && !entry.name.startsWith("["),
  );

  const metas = await Promise.all(
    questionDirs.map(async (dir) => {
      const pagePath = path.join(QUESTIONS_DIR, dir.name, "page.tsx");

      try {
        await fs.access(pagePath);
      } catch {
        return null;
      }

      const meta = await importQuestionMeta(pagePath);

      return meta;
    }),
  );
  const validMetas = metas.filter((meta): meta is QuestionMeta => Boolean(meta));

  return validMetas.sort((a, b) => {
    const orderDelta = (a.order ?? 0) - (b.order ?? 0);

    if (orderDelta !== 0) {
      return orderDelta;
    }

    return a.slug.localeCompare(b.slug);
  });
}

const questionsPromise = loadQuestionsFromFilesystem();

export async function getQuestions(): Promise<QuestionMeta[]> {
  return questionsPromise;
}
