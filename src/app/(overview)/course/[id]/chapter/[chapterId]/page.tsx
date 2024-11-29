import {
  fetchChaptersAction,
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
import CourseChapterUI from "@/app/shared/(ui)/CourseChapterUI";

interface ChapterProps {
  searchParams: Record<string, string>;
  params: Promise<{ id: string, chapterId: string }>;
}

export default async function Chapter({ params }: ChapterProps) {
  const { id, chapterId } = await params;
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
  let chapter = chaptersResponse.data?.data.find(
    (chapter) => chapter.id == chapterId
  );

  if (!courseResponse.data) {
    return <div>Course not found</div>;
  }

  if (!courseModuleResponse.data) {
    return <div>Course module not found</div>;
  }

  if (!chaptersResponse.data?.data || !chapter) {
    return <div>Chapter not found</div>;
  }

  return (
    <CourseChapterUI
      user={userResponse.data}
      enrollment={enrollment}
      course={courseResponse.data}
      courseModules={courseModuleResponse.data}
      currentChapter={chapter}
      chapters={chaptersResponse.data.data.filter((chapter) =>
        courseModuleResponse.data?.some(
          (courseModule) => courseModule.id == chapter.moduleId
        )
      )}
      progresses={progressesResponse.data?.data}
    />
  );
}
