import {
  fetchCourseMostEnrollAction,
  fetchCourseNewArrivalsAction,
  fetchCoursesAction,
} from "@/actions/courseAction";
import CourseUI from "@/app/shared/(ui)/CourseUI";

export default async function Course() {
  const courses = await fetchCoursesAction();
  const coursePopular = await fetchCourseMostEnrollAction();
  const courseNew = await fetchCourseNewArrivalsAction();

  return (
    <>
      {courses.data && (
        <CourseUI
          courses={courses.data.data}
          coursePopular={coursePopular.data?.data}
          courseNew={courseNew.data?.data}
        />
      )}
    </>
  );
}
