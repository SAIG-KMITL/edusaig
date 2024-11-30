import {  fetchCoursesWithOwnershipAction } from "@/actions/courseAction";
import { fetchUserAction } from "@/actions/userAction";
import CourseDashboardUI from "@/app/shared/(ui)/CourseDashboardUI";

export default async function CourseDashboardPage() {

  const response = await fetchUserAction();
  if (!response.data) {
    return null;
  }

  const courses = await fetchCoursesWithOwnershipAction();
  
  if(!courses.data?.data) {
    return null;
  }

  return <CourseDashboardUI user={response.data} courses={courses.data.data}/>
}