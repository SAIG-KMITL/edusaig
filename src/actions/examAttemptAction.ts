import { ExamAttempt } from "@/types/exam.type";
import { baseApiAction } from "./baseAction";

export async function fetchExamAttemptsAction() {
  return baseApiAction<ExamAttempt[]>(`/exam-attempt`, {
    method: "GET",
    requiresAuth: true,
  });
}

export async function createExamAttemptAction(
  questionId: string,
  optionText: string,
  isCorrect: boolean,
  explanation: string
) {
  return baseApiAction<ExamAttempt>(`/exam-attempt`, {
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

export async function fetchExamAttemptAction(id: string) {
  return baseApiAction<ExamAttempt>(`/exam-attempt/${id}`, {
    method: "GET",
    requiresAuth: true,
  });
}

export async function updateExamAttemptAction(id: string) {
  return baseApiAction<ExamAttempt>(`/exam-attempt/${id}`, {
    method: "PATCH",
    requiresAuth: true,
  });
}

export async function deleteExamAttemptAction(id: string) {
  return baseApiAction<ExamAttempt>(`/exam-attempt/${id}`, {
    method: "DELETE",
    requiresAuth: true,
  });
}

export async function fetchExamAttemptSubmitAction(id: string) {
  return baseApiAction<ExamAttempt>(`/exam-attempt/submit/${id}`, {
    method: "PATCH",
    requiresAuth: true,
  });
}
