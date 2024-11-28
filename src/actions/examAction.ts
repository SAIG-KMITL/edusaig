import { ExamType,ExamResponseType } from "@/types/exam.type";
import { baseApiAction } from "./baseAction";

export async function fetchExamsAction() {
  return baseApiAction<ExamResponseType>(`/exam`, {
    method: "GET",
    requiresAuth: true,
  });
}

export async function fetchExamAction(id: string) {
  return baseApiAction<ExamType>(`/exam/${id}`, {
    method: "GET",
    requiresAuth: true,
  });
}

export async function createExamAction(
  courseModuleId: string,
  title: string,
  description: string,
  timeLimit: string,
  passingScore: number,
  maxAttempts: number,
  shuffleQuestions: boolean,
  status: string
) {
  return baseApiAction<ExamType>(`/exam`, {
    method: "POST",
    body: {
      courseModuleId,
      title,
      description,
      timeLimit,
      passingScore,
      maxAttempts,
      shuffleQuestions,
      status,
    },
    requiresAuth: true,
  });
}

export async function updateExamAction(
  id: string,
  title: string,
  description: string,
  timeLimit: string,
  passingScore: number,
  maxAttempts: number,
  shuffleQuestions: boolean,
  status: string
) {
  return baseApiAction<ExamType>(`/exam/${id}`, {
    method: "PATCH",
    body: {
      title,
      description,
      timeLimit,
      passingScore,
      maxAttempts,
      shuffleQuestions,
      status,
    },
    requiresAuth: true,
  });
}

export async function deleteExamAction(id: string) {
  return baseApiAction<ExamType>(`/exam/${id}`, {
    method: "DELETE",
    requiresAuth: true,
  });
}

export async function generateExamAction(
  examId: string,
  courseModuleId: string,
  title: string,
  description: string,
  timeLimit: string,
  passingScore: number,
  maxAttempts: number,
  shuffleQuestions: boolean,
  status: string
) {
  return baseApiAction<ExamType>(`/exam/generate/${examId}`, {
    method: "POST",
    body: {
      courseModuleId,
      title,
      description,
      timeLimit,
      passingScore,
      maxAttempts,
      shuffleQuestions,
      status,
    },
    requiresAuth: true,
  });
}
