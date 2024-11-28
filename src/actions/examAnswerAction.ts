import { ExamAnswerResponse, ExamAnswerType,ExamAnswerResponseType } from "@/types/exam.type";
import { baseApiAction } from "./baseAction";

export async function createExamAnswerAction(
  examAttemptId: string,
  selectedOptionId: string,
  answerText: string,
  isCorrect: boolean,
  points: number
) {
  return baseApiAction<ExamAnswerResponse>("/exam-answer", {
    method: "POST",
    requiresAuth: true,
    body: { examAttemptId, selectedOptionId, answerText, isCorrect, points },
  });
}

export async function fetchExamAnswersAction() {
  return baseApiAction<ExamAnswerResponseType>(`/exam-answer`, {
    method: "GET",
    requiresAuth: true,
  });
}

export async function fetchExamAnswerAction(id: string) {
  return baseApiAction<ExamAnswerType>(`/exam-answer/${id}`, {
    method: "GET",
    requiresAuth: true,
  });
}

export async function updateExamAnswerAction(
  examAttemptId: string,
  answerText: string,
  isCorrect: boolean,
  points: number
) {
  return baseApiAction<ExamAnswerType>(`/exam-answer/${examAttemptId}`, {
    method: "PATCH",
    body: { examAttemptId, answerText, isCorrect, points },
    requiresAuth: true,
  });
}

export async function deleteExamAnswerAction(id: string) {
  return baseApiAction<ExamAnswerType>(`/exam-answer/${id}`, {
    method: "DELETE",
    requiresAuth: true,
  });
}
