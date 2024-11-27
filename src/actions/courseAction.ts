"use server";
import {
  CourseLevelType,
  CoursesResponseType,
  CourseStatusType,
  CourseType,
} from "@/types/course.type";
import { baseApiAction } from "./baseAction";

export async function fetchCoursesAction() {
  return baseApiAction<CoursesResponseType>("/course?page=1&limit=100", {
    method: "GET",
    requiresAuth: true,
  });
}

export async function uploadCourseThumbnail(id: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return baseApiAction<void>(`/course/${id}/thumbnail`, {
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
  status: CourseStatusType
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
  thumbnailKey: string
) {
  return baseApiAction<CourseType>(`/course/${id}`, {
    method: "PATCH",
    body: {
      title,
      description,
      categoryId,
      duration,
      level,
      price,
      status,
      thumbnailKey,
    },
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

export async function fetchCourseMostEnrollAction(){
  return baseApiAction<CoursesResponseType>(`/course/most-enroll?page=1&limit=10`,{
    method: "GET",
    requiresAuth:true
  })
}

export async function fetchCourseNewArrivalsAction(){
  return baseApiAction<CoursesResponseType>(`/course/new-arrivals?page=1&limit=10`,{
    method: "GET",
    requiresAuth:true
  })
}
export async function fetchCoursesByTeacherAction(teacherId: string) {
  return baseApiAction<CoursesResponseType>(`/course/by-teacher/${teacherId}?limit=100`, {
    method: "GET",
    requiresAuth: true,
  });
}

export async function fetchCoursesWithOwnershipAction() {
  return baseApiAction<CoursesResponseType>(`/course/with-ownership?limit=100`, {
    method: "GET",
    requiresAuth: true,
  });
}

export async function fetchCourseWithOwnershipAction(id: string) {
  return baseApiAction<CourseType>(`/course/with-ownership/${id}`, {
    method: "GET",
    requiresAuth: true,
  });
}
