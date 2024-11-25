"use server";
import { CourseLevelType, CoursesResponseType, CourseStatusType, CourseType } from "@/types/course.type";
import { baseApiAction } from "./baseAction";

export async function fetchCoursesAction() {
  return baseApiAction<CoursesResponseType>("/course?page=1&limit=10", {
    method: "GET",
    requiresAuth: true,
  });
}

export async function uploadCourseThumbnail(id: string, file: File) {
  const formData = new FormData();
  formData.append('file', file);

  return baseApiAction<File>(`/course/${id}/thumbnail`, {
    method: "PATCH",
    body: formData,
    requiresAuth: true,
  });
}

export async function createCourseAction(
  title: string,
  description: string,
  categoryId: string,
  duration: number,
  level: CourseLevelType,
  price: number,
  status: CourseStatusType,
) {
  return baseApiAction<CourseType>(`/course`, {
    method: "POST",
    body: { title, description, categoryId, duration, level, price, status },
    requiresAuth: true,
  }); 
}

export async function editCourseAction(
  id: string,
  title: string,
  description: string,
  categoryId: string,
  duration: number,
  level: CourseLevelType,
  price: number,
  status: CourseStatusType,
  thumbnailKeys: string,
) {
  return baseApiAction<CourseType>(`/course/${id}`, {
    method: "PATCH",
    body: { title, description, categoryId, duration, level, price, status, thumbnailKeys },
    requiresAuth: true,
  }); 
}

export async function deleteCourseAction(id: string) {
  baseApiAction(`/course/${id}`, {
    method: "DELETE",
    requiresAuth: true,
  });
}

export async function fetchCourseAction(id: string) {
  return baseApiAction<CourseType>(`/course/${id}`, {
    method: "GET",
    requiresAuth: true,
  });
}
