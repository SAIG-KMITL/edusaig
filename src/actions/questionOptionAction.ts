import { PreTestQuestionOptionsResponseType, QuestionOptionType } from "@/types/question.type";
import { baseApiAction } from "./baseAction";

export async function fetchQuestionOptionsAction(questionId: string) {
  return baseApiAction<QuestionOptionType[]>(`/question-option/question/${questionId}`, {
    method: "GET",
    requiresAuth: true,
  });
}

export async function fetchPretestQuestionOptionsAction(pretestId: string) {
  return baseApiAction<PreTestQuestionOptionsResponseType>(`/question-option/pretest/${pretestId}`, {
    method: "GET",
    requiresAuth: true,
  });
}