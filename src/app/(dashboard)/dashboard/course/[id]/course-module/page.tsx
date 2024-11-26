import { fetchChaptersAction, fetchChaptersByModuleAction, fetchChaptersWithOwnershipAction } from "@/actions/chapterAction";
import { fetchCourseAction } from "@/actions/courseAction";
import { fetchCourseModulesByCourseAction } from "@/actions/courseModuleAction";
import { fetchUserAction } from "@/actions/userAction";
import CourseModuleDashboardUI from "@/app/shared/(ui)/CourseModuleDashboardUI";
import { ChapterResponseType } from "@/types/chapter.type";

interface CourseModulePageProps {
  params: Promise<{ id: string }>;
}

export default async function CourseModulePage({ params }: CourseModulePageProps) {
  const { id } = await params;

  const userResponse = await fetchUserAction();
  if (!userResponse.data) {
    return null;
  }

  const courseResponse = await fetchCourseAction(id);
  if (!courseResponse.data) {
    return <div>Course not found</div>;
  }

  const courseModulesResponse = await fetchCourseModulesByCourseAction(id);
  if (!courseModulesResponse.data) {
    return <div>Course module not found</div>;
  }

  const chaptersResponse = await fetchChaptersWithOwnershipAction();
  if(!chaptersResponse.data?.data) {
    return <div>Chapter not found</div>;
  }

  return <CourseModuleDashboardUI 
    user={userResponse.data}
    course={courseResponse.data} 
    courseModules={courseModulesResponse.data}
    chapters={chaptersResponse.data.data}
  />
}