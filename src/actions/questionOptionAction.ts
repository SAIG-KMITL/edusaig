import {
  PreTestQuestionOptionsResponseType,
  QuestionOptionType,
  QuestionOptionResponseType
} from "@/types/question.type";
import { baseApiAction } from "./baseAction";

export async function fetchPretestQuestionOptionAction(questionId: string) {
  return baseApiAction<QuestionOptionType>(
    `/question-option/question/${questionId}`,
    {
      method: "GET",
      requiresAuth: true,
    }
  );
}

export async function fetchPretestQuestionOptionsAction(pretestId: string) {
  return baseApiAction<PreTestQuestionOptionsResponseType>(
    `/question-option/pretest/${pretestId}`,
    {
      method: "GET",
      requiresAuth: true,
    }
  );
}

export async function fetchQuestionOptionsAction() {
  return baseApiAction<QuestionOptionResponseType>(`/question-option`, {
    method: "GET",
    requiresAuth: true,
  });
}

export async function createQuestionOptionAction(
  questionId: string,
  optionText: string,
  isCorrect: boolean,
  explanation: string
) {
  return baseApiAction<QuestionOptionType>(`/question-option`, {
    method: "POST",
    body: {
      questionId,
      optionText,
      isCorrect,
      explanation,
    },
    requiresAuth: true,
  });
}

export async function fetchQuestionOptionAction(id: string) {
  return baseApiAction<QuestionOptionType>(`/question-option/${id}`, {
    method: "GET",
    requiresAuth: true,
  });
}

export async function updateQuestionOptionAction(
  id: string,
  optionText: string,
  isCorrect: boolean,
  explanation: string
) {
  return baseApiAction<QuestionOptionType>(`/question-option/${id}`, {
    method: "PATCH",
    body: {
      optionText,
      isCorrect,
      explanation,
    },
    requiresAuth: true,
  });
}

export async function deleteQuestionOptionAction(id: string) {
  return baseApiAction<QuestionOptionType>(`/question-option/${id}`, {
    method: "DELETE",
    requiresAuth: true,
  });
}

export async function fetchQuestionOptionExamAction(questionId: string) {
  return baseApiAction<QuestionOptionType>(
    `/question-option/question/${questionId}`,
    {
      method: "GET",
      requiresAuth: true,
    }
  );
}
