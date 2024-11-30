"use server";
import {
  EnrollmentResponseType,
  EnrollmentsResponseType,
  EnrollmentStatusType,
} from "@/types/enrollment.type";
import { baseApiAction } from "./baseAction";

export async function fetchEnrollmentsAction(
  page?: number,
  limit: number = 100,
  search?: string
) {
  let url = "/enrollment";
  const queryParams: string[] = [];

  if (page) queryParams.push(`page=${page}`);
  if (limit) queryParams.push(`limit=${limit}`);
  if (search) queryParams.push(`search=${search}`);

  if (queryParams.length > 0) {
    url += "?" + queryParams.join("&");
  }

  return baseApiAction<EnrollmentsResponseType>(url, {
    method: "GET",
    requiresAuth: true,
  });
}

export async function fetchEnrollmentsByUserAction() {
  return baseApiAction<EnrollmentsResponseType>(`/enrollment/user`, {
    method: "GET",
    requiresAuth: true,
  });
}

export async function fetchEnrollmentAction(id: string) {
  return baseApiAction<EnrollmentResponseType>(`/enrollment/${id}`, {
    method: "GET",
    requiresAuth: true,
  });
}

export async function createEnrollmentAction(
  userId: string,
  courseId: string,
  certificateIssued: boolean,
  completionRate: number,
  status: EnrollmentStatusType,
  enrolledAt: Date,
  completedAt: Date | null
) {
  return baseApiAction<EnrollmentResponseType>(`/enrollment`, {
    method: "POST",
    body: {
      userId,
      courseId,
      certificateIssued,
      completionRate,
      status,
      enrolledAt,
      completedAt,
    },
    requiresAuth: true,
  });
}

export async function updateEnrollmentAction(id: string) {
  return baseApiAction<EnrollmentResponseType>(`/enrollment/${id}`, {
    method: "PATCH",
    requiresAuth: true,
  });
}

export async function deleteEnrollmentAction(id: string) {
  return baseApiAction<EnrollmentResponseType>(`/enrollment/${id}`, {
    method: "DELETE",
    requiresAuth: true,
  });
}
