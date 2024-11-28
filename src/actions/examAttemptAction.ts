import { ExamAttempt, ExamAttemptPretestResponseType, ExamAttemptPretestType } from "@/types/exam.type";
import { baseApiAction } from "./baseAction";
import { ExamAttemptStatus } from "@/utils/enums/examAttempt";

export async function createExamAttemptByPretestAction(pretestId: string) {
  return baseApiAction<ExamAttempt>("/exam-attempt/pretest", {
    method: "POST",
    requiresAuth: true,
    body: { pretestId: pretestId, score: 0, status: ExamAttemptStatus.IN_PROGRESS },
  });
}

export async function fetchExamAttemptByPretestAction() {
  return baseApiAction<ExamAttemptPretestResponseType>("/exam-attempt/pretest/", {
    method: "GET",
    requiresAuth: true,
  });
}

export async function updateExamAttemptPretestAction(id: string, score: number, status: ExamAttemptStatus) {
  return baseApiAction<ExamAttempt>(`/exam-attempt/pretest/${id}`, {
    method: "PATCH",
    requiresAuth: true,
    body: { score, status },
  });
}

export async function updateExamAttemptPretestBySubmitAction(id: string) {
  return baseApiAction<ExamAttempt>(`/exam-attempt/pretest/submit/${id}`, {
    method: "PATCH",
    requiresAuth: true,
  });
}