import { PreTestQuestionOptionsResponseType, QuestionOptionType } from "@/types/question.type";
import { baseApiAction } from "./baseAction";

export async function fetchQuestionOptionsAction(questionId: string) {
  return baseApiAction<QuestionOptionType[]>(`/question-option/question/${questionId}`, {
    method: "GET",
    requiresAuth: true,
  });
}

export async function fetchQuestionOptionsByIdAction(id: string) {
  return baseApiAction<PreTestQuestionOptionsResponseType>(`/question-option/pretest/${id}`, {
    method: "GET",
    requiresAuth: true,
  });
}

export async function fetchQuestionOptionsPretestAction() {
  return baseApiAction<PreTestQuestionOptionsResponseType>(`/question-option/pretest`, {
    method: "GET",
    requiresAuth: true,
  });
}