import { CourseLevelType, CourseResponseType, CourseStatusType } from "@/types/course.type";
import { baseApiAction } from "./baseAction";

export async function fetchCourseAction(id: string) {
  return baseApiAction<CourseResponseType>(`/course/${id}`, {
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
  return baseApiAction<CourseResponseType>(`/course`, {
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
  return baseApiAction<CourseResponseType>(`/course/${id}`, {
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