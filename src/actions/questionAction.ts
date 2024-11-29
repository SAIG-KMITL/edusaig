import {
  CreateQuestionType,
  PreTestQuestionResponseType,
  QuestionType,
} from "@/types/question.type";
import { baseApiAction } from "./baseAction";

export async function fetchQuestionsByPretestAction(pretestId: string) {
  return baseApiAction<PreTestQuestionResponseType>(
    `/question/pretest/${pretestId}`,
    {
      method: "GET",
      requiresAuth: true,
    }
  );
}

export async function createQuestionAction(data: CreateQuestionType) {
  return baseApiAction<QuestionType>("/question", {
    method: "POST",
    body: data,
    requiresAuth: true,
  });
}
