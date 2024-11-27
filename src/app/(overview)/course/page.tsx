import CourseUI from "@/app/shared/(ui)/CourseUI";
import {
  fetchCoursesAction,
  fetchCourseMostEnrollAction,
  fetchCourseNewArrivalsAction,
} from "@/actions/courseAction";

export default async function Course() {
  const courses = await fetchCoursesAction();
  const coursePopular = await fetchCourseMostEnrollAction();
  const courseNew = await fetchCourseNewArrivalsAction();
  
  return<>
    {courses.data && (
      <CourseUI
        courses={courses.data.data}
        coursePopular={coursePopular.data?.data}
        courseNew={courseNew.data?.data}
      />
    )}
  </>;
}
