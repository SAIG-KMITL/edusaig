"use server";
import { CoursesResponseType, CourseType } from "@/types/course.type";
import { baseApiAction } from "./baseAction";

export async function fetchCoursesAction() {
  return baseApiAction<CoursesResponseType>("/course?page=1&limit=10", {
    method: "GET",
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
