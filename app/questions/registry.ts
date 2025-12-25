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

export const QUESTIONS: QuestionMeta[] = [
  {
    slug: "visual-modeling",
    question: "Why do some systems need to be seen, not just described?",
    category: "Tools & Technology",
    order: 10,
  },
  {
    slug: "syntropic-ecology",
    question: "Why does land keep degrading, even as we invest more into fixing it?",
    category: "Nature & Land",
    order: 10,
  },
  {
    slug: "bpss-health",
    question: "Why did things improve, but still not feel better?",
    category: "Health & Suffering",
    order: 10,
  },
];
