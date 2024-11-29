"use server";

import { CreateExamType, EditExamType, ExamType } from "@/types/exam.type";
import { baseApiAction } from "./baseAction";
import { ExamResponseType } from "@/types/exam.type";

export async function fetchExamsAction() {
  return baseApiAction<ExamType[]>("/exam", {
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

export async function deleteExamAction(id: string) {
  return baseApiAction<void>(`/exam/${id}`, {
    method: "DELETE",
    requiresAuth: true,
  });
}

export async function fetchExamByCourseModuleIdAction(courseModuleId: string) {
  return baseApiAction<ExamResponseType>(`/exam/course-module/${courseModuleId}`, {
    method: "GET",
    requiresAuth: true,
  });
}
