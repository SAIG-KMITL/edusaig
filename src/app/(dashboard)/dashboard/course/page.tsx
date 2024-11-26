import { fetchCourseAction, fetchCoursesAction } from "@/actions/courseAction";
import { fetchUserAction } from "@/actions/userAction";
import CourseDashboardUI from "@/app/shared/(ui)/CourseDashboardUI";
import { CourseType } from "@/types/course.type";

export default async function CourseDashboardPage() {

  const response = await fetchUserAction();
  if (!response.data) {
    return null;
  }

  const courses = await fetchCoursesAction();
  
  if(!courses.data?.data) {
    return null;
  }

  return <CourseDashboardUI user={response.data} courses={courses.data.data}/>
}