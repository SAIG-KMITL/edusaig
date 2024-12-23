import { CourseModuleResponseType, CourseModulesResponseType } from "@/types/course.type";
import { baseApiAction } from "./baseAction";

export async function fetchCourseModuleAction(id: string) {
  return baseApiAction<CourseModuleResponseType>(`/course-module/${id}`, {
    method: "GET",
    requiresAuth: false,
  });
}

export async function fetchCourseModulesAction() {
  return baseApiAction<CourseModulesResponseType>(`/course-module?limit=100`, {
    method: "GET",
    requiresAuth: false,
  });
}

export async function fetchCourseModulesWithOwnershipAction() {
  return baseApiAction<CourseModulesResponseType>(`/course-module/with-ownership?limit=100`, {
    method: "GET",
    requiresAuth: true,
  });
}

export async function fetchCourseModuleWithOwnershipAction(id: string) {
  return baseApiAction<CourseModulesResponseType>(`/course-module/with-ownership/${id}?limit=100`, {
    method: "GET",
    requiresAuth: true,
  });
}

export async function fetchCourseModulesByCourseAction(courseId: string) {
  return baseApiAction<CourseModuleResponseType[]>(`/course-module/course/${courseId}`, {
    method: "GET",
    requiresAuth: false,
  });
}

export async function createCourseModuleAction(
  title: string,
  description: string,
  courseId: string
) {
  return baseApiAction<CourseModuleResponseType>(`/course-module`, {
    method: "POST",
    body: { title, description, courseId },
    requiresAuth: true,
  });
}

export async function editCourseModuleAction(
  courseModuleId: string,
  title: string,
  description: string,
  courseId: string,
  orderIndex: number,
) {
  return baseApiAction<CourseModuleResponseType>(`/course-module/${courseModuleId}`, {
    method: "PATCH",
    body: { title, description, courseId, orderIndex },
    requiresAuth: true,
  });
}

export async function deleteCourseModuleAction(id: string) {
  baseApiAction<null>(`/course-module/${id}`, {
    method: "DELETE",
    requiresAuth: true,
  });
}