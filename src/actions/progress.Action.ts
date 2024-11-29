"use server";

import {
  ProgressesResponseType,
  ProgressResponseType,
  ProgressStatusType,
} from "@/types/progress.type";
import { baseApiAction } from "./baseAction";

export async function fetchProgressesAction() {
  return baseApiAction<ProgressesResponseType>(`/progress?limit=100`, {
    method: "GET",
    requiresAuth: true,
  });
}

export async function fetchProgressByUserAction() {
  return baseApiAction<ProgressesResponseType>(`/progress/user`, {
    method: "GET",
    requiresAuth: true,
  });
}

export async function fetchProgressAction(id: string) {
  return baseApiAction<ProgressResponseType>(`/progress/${id}?limit=100`, {
    method: "GET",
    requiresAuth: true,
  });
}

export async function createProgressAction(
  enrollmentId: string,
  chapterId: string,
  status: ProgressStatusType,
  watchTime: number,
  lastAccessedAt: Date,
  completedAt: Date | null
) {
  return baseApiAction<ProgressResponseType>(`/progress`, {
    method: "POST",
    body: {
      enrollmentId,
      chapterId,
      status,
      watchTime,
      lastAccessedAt,
      completedAt,
    },
    requiresAuth: true,
  });
}

export async function updateProgressAction(id: string) {
  return baseApiAction<ProgressResponseType>(`/progress/${id}`, {
    method: "PATCH",
    body: {},
    requiresAuth: true,
  });
}

export async function deleteProgressAction(id: string) {
  return baseApiAction<ProgressResponseType>(`/progress/${id}`, {
    method: "DELETE",
    requiresAuth: true,
  });
}
