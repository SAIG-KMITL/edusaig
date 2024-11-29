import {
  fetchChaptersAction,
  fetchChaptersByModuleAction,
  fetchChaptersWithOwnershipAction,
} from "@/actions/chapterAction";
import { fetchCourseAction } from "@/actions/courseAction";
import {
  fetchCourseModulesAction,
  fetchCourseModulesByCourseAction,
} from "@/actions/courseModuleAction";
import { fetchEnrollmentsAction } from "@/actions/enrollment.Action";
import { fetchProgressesAction } from "@/actions/progress.Action";
import { fetchUserAction } from "@/actions/userAction";
import CourseDetailsUI from "@/app/shared/(ui)/CourseDetailsUI";

interface CourseDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function CourseDetails({ params }: CourseDetailsProps) {
  const { id } = await params;
  const userResponse = await fetchUserAction();
  const courseResponse = await fetchCourseAction(id);
  const enrollmentsResponse = await fetchEnrollmentsAction();
  const courseModuleResponse = await fetchCourseModulesByCourseAction(id);
  const chaptersResponse = userResponse.data
    ? await fetchChaptersWithOwnershipAction()
    : await fetchChaptersAction();
  const progressesResponse = await fetchProgressesAction();

  let enrollment = enrollmentsResponse.data?.data.find(
    (enrollment) => enrollment.course.id == id
  );

  if (!courseResponse.data) {
    return <div>Course not found</div>;
  }

  if (!courseModuleResponse.data) {
    return <div>Course module not found</div>;
  }

  if (!chaptersResponse.data?.data) {
    return <div>Chapter not found</div>;
  }

  return (
    <CourseDetailsUI
      user={userResponse.data}
      course={courseResponse.data}
      courseModules={courseModuleResponse.data}
      chapters={chaptersResponse.data.data.filter((chapter) =>
        courseModuleResponse.data?.some(
          (courseModule) => courseModule.id == chapter.moduleId
        )
      )}
      progresses={progressesResponse.data?.data}
      enrollment={enrollment}
    />
  );
}
