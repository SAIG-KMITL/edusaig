import { fetchChaptersAction, fetchChaptersWithOwnershipAction } from "@/actions/chapterAction";
import { fetchCourseAction } from "@/actions/courseAction";
import { fetchCourseModulesAction, fetchCourseModulesByCourseAction } from "@/actions/courseModuleAction";
import { fetchEnrollmentsAction } from "@/actions/enrollment.Action";
import { fetchProgressesAction } from "@/actions/progress.Action";
import { fetchUserAction } from "@/actions/userAction";
import CourseChapterUI from "@/app/shared/(ui)/CourseChapterUI";

interface ChapterProps {
  params: { id: string, chapterId: string };
  searchParams: Record<string, string>;
}

export default async function Chapter({ params }: ChapterProps) {
  const { id, chapterId } = await params;
  const userResponse = await fetchUserAction();
  const courseResponse = await fetchCourseAction(id);
  const enrollmentsResponse = await fetchEnrollmentsAction();
  const courseModuleResponse = await fetchCourseModulesByCourseAction(id);
  const chaptersResponse = await fetchChaptersWithOwnershipAction();
  const progressesResponse = await fetchProgressesAction();

  let enrollment = enrollmentsResponse.data?.data.find((enrollment) => enrollment.course.id == id);
  let chapter = chaptersResponse.data?.data.find((chapter) => chapter.id == chapterId);

  if(!userResponse.data) {
    return null;
  }

  if(!courseResponse.data) {
    return  <div>Course not found</div>;
  }

  if(!courseModuleResponse.data) {
    return  <div>Course module not found</div>;
  }


  if(!chaptersResponse.data?.data || !chapter) {
    return  <div>Chapter not found</div>;;
  }

  if(!progressesResponse.data?.data) {
    return  <div>progresses not found</div>;;
  }

  return (
    <CourseChapterUI 
      user={userResponse.data} 
      enrollment={enrollment} 
      course={courseResponse.data}
      courseModules={courseModuleResponse.data}
      currentChapter={chapter}
      chapters={chaptersResponse.data.data.filter((chapter) => courseModuleResponse.data?.some((courseModule) => courseModule.id == chapter.moduleId))}
      progresses={progressesResponse.data.data}
    />
  )
}
