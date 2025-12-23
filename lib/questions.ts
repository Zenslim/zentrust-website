import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type QuestionDocument = {
  question: string;
  heroMode: string;
  heroText: string;
  youtubeUrl: string;
  category?: string;
  adEligible: boolean;
  status: string;
  body: string;
  _sys: { filename: string };
};

const QUESTIONS_DIR = path.join(process.cwd(), "content", "questions");

function getQuestionFilePaths() {
  if (!fs.existsSync(QUESTIONS_DIR)) return [];

  return fs
    .readdirSync(QUESTIONS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => path.join(QUESTIONS_DIR, file));
}

function parseQuestionFile(filePath: string): QuestionDocument | null {
  if (!fs.existsSync(filePath)) return null;

  const slug = path.parse(filePath).name;
  const rawContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(rawContent);

  return {
    question: data?.question ?? slug,
    heroMode: data?.heroMode ?? "answer_below",
    heroText: data?.heroText ?? "",
    youtubeUrl: data?.youtubeUrl ?? "",
    category: data?.category,
    adEligible: Boolean(data?.adEligible),
    status: data?.status ?? "draft",
    body: content.trim(),
    _sys: { filename: slug },
  } satisfies QuestionDocument;
}

export async function fetchQuestions(): Promise<QuestionDocument[]> {
  const questions = getQuestionFilePaths()
    .map((filePath) => parseQuestionFile(filePath))
    .filter((question): question is QuestionDocument => Boolean(question));

  return questions.sort((a, b) => a.question.localeCompare(b.question));
}

export async function fetchQuestionBySlug(
  slug: string,
): Promise<QuestionDocument | null> {
  const filePath = path.join(QUESTIONS_DIR, `${slug}.mdx`);
  return parseQuestionFile(filePath);
}

export function getPublishedQuestionSlugsFromFiles(): string[] {
  return getQuestionFilePaths()
    .map((filePath) => parseQuestionFile(filePath))
    .filter(
      (question): question is QuestionDocument =>
        Boolean(question && question.status === "published"),
    )
    .map((question) => question._sys.filename);
}
