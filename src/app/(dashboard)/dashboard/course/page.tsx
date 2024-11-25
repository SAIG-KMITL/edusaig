import { fetchCourseAction } from "@/actions/courseAction";
import { fetchUserAction } from "@/actions/userAction";
import CourseDashboardUI from "@/app/shared/(ui)/CourseDashboardUI";
import { CourseResponseType } from "@/types/course.type";

export default async function CourseDashboardPage() {

  const response = await fetchUserAction();
  if (!response.data) {
    return null;
  }

  const course = await fetchCourseAction('f32115a6-b631-43e6-a212-a0bbf35731a5');
  if(!course.data?.id) {
    return null;
  }

  const course2 = await fetchCourseAction('bff2ab01-dfda-49b5-84fb-e38c14fcbedb');
  if(!course2.data?.id) {
    return null;
  }
  
  console.log(course);
  const temp:CourseResponseType[] = [course.data as CourseResponseType, course2.data as CourseResponseType];
  return <CourseDashboardUI user={response.data} courses={temp}/>
}