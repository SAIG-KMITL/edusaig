import {
  CreateQuestionType,
  PreTestQuestionResponseType,
  QuestionResponseType,
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

export async function fetchQuestionPretestAction() {
  return baseApiAction<PreTestQuestionResponseType>(`/question/pretest`, {
    method: "GET",
    requiresAuth: true,
  });
}

export async function fetchQuestionsByPretestIdAction(pretestId: string) {
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
export async function fetchQuestionsAction() {
  return baseApiAction<QuestionResponseType>(`/question`, {
    method: "GET",
    requiresAuth: true,
  });
}

export async function fetchQuestionAction(id: string) {
  return baseApiAction<QuestionType>(`/question/${id}`, {
    method: "GET",
    requiresAuth: true,
  });
}

export async function updateQuestionAction(
  examId: string,
  question: string,
  type: string,
  points: number,
  orderIndex: number
) {
  return baseApiAction<QuestionType>(`/question/${examId}`, {
    method: "PATCH",
    body: {
      question,
      type,
      points,
      orderIndex,
    },
    requiresAuth: true,
  });
}

export async function deleteQuestionAction(id: string) {
  return baseApiAction<QuestionType>(`/question/${id}`, {
    method: "DELETE",
    requiresAuth: true,
  });
}

export async function fetchQuestionExamAction(examId: string) {
  return baseApiAction<QuestionType>(`/question/exam/${examId}`, {
    method: "GET",
    requiresAuth: true,
  });
}
