import { ExamAnswerType } from "@/types/exam.type";
import { baseApiAction } from "./baseAction";

export async function fetchExamAnswersAction() {
  return baseApiAction<ExamAnswerType[]>(`/exam-answer`, {
    method: "GET",
    requiresAuth: true,
  });
}

export async function createExamAnswerAction(
    examAttemptId: string,
    questionId: string,
    selectedOptionId: string,
    answerText: string,
    isCorrect: boolean,
    points: number,
) {
  return baseApiAction<ExamAnswerType>(`/exam-answer`, {
    method: "POST",
    body: {
        examAttemptId,
        questionId,
        selectedOptionId,
        answerText,
        isCorrect,
        points
    },
    requiresAuth: true,
  });
}

export async function fetchExamAnswerAction(id: string) {
  return baseApiAction<ExamAnswerType>(`/exam-answer/${id}`, {
    method: "GET",
    requiresAuth: true,
  });
}

export async function updateExamAnswerAction(id: string) {
  return baseApiAction<ExamAnswerType>(`/exam-answer/${id}`, {
    method: "PATCH",
    requiresAuth: true,
  });
}

export async function deleteExamAnswerAction(id: string) {
  return baseApiAction<ExamAnswerType>(`/exam-answer/${id}`, {
    method: "DELETE",
    requiresAuth: true,
  });
}
