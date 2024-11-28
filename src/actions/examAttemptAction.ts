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
