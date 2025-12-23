import client from "@/tina/__generated__/client";
import type { QuestionsConnectionQuery } from "@/tina/__generated__/types";

type QuestionsEdge = NonNullable<
  NonNullable<QuestionsConnectionQuery["questionsConnection"]>["edges"]
>[number];

export type QuestionDocument = NonNullable<QuestionsEdge>["node"];

export async function fetchQuestions(): Promise<QuestionDocument[]> {
  const questionsRes = await client.queries
    .questionsConnection()
    .catch(() => null);

  const questions =
    questionsRes?.data?.questionsConnection?.edges
      ?.map((edge) => edge?.node)
      .filter((node): node is QuestionDocument => Boolean(node)) ?? [];

  return questions;
}
