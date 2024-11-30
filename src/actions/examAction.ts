import {
  CreateExamType,
  EditExamType,
  ExamResponseType,
  ExamType,
} from "@/types/exam.type";
import { baseApiAction } from "./baseAction";

export async function fetchExamsAction() {
  return baseApiAction<ExamResponseType>(`/exam`, {
    method: "GET",
    requiresAuth: true,
  });
}

export async function createExamAction(data: CreateExamType) {
  return baseApiAction<ExamType>("/exam", {
    method: "POST",
    body: data,
    requiresAuth: true,
  });
}

export async function editExamAction(id: string, data: EditExamType) {
  return baseApiAction<ExamType>(`/exam/${id}`, {
    method: "GET",
    body: data,
    requiresAuth: true,
  });
}
export async function fetchExamAction(id: string) {
  return baseApiAction<ExamType>(`/exam/${id}`, {
    method: "GET",
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

export async function fetchExamByModuleAction(moduleId: string) {
  return baseApiAction<ExamResponseType>(`/exam/course-module/${moduleId}`, {
    method: "GET",
    requiresAuth: true,
  });
}
