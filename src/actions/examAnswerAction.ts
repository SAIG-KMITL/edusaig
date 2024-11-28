import { ExamAnswerResponse, ExamAnswerType } from "@/types/exam.type";
import { baseApiAction } from "./baseAction";

export async function createExamAnswerAction(examAttemptId: string, selectedOptionId: string, answerText: string, isCorrect: boolean, points: number) {
  return baseApiAction<ExamAnswerResponse>("/exam-answer", {
    method: "POST",
    requiresAuth: true,
    body: { examAttemptId, selectedOptionId, answerText, isCorrect, points },
  });
}