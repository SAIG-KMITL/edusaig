import { fetchChaptersAction } from "@/actions/chapterAction";
import { fetchCourseAction } from "@/actions/courseAction";
import { fetchCourseModulesByCourseAction } from "@/actions/courseModuleAction";
import CourseModuleDashboardUI from "@/app/shared/(ui)/CourseModuleDashboardUI";

interface CourseModulePageProps {
  params: Promise<{ id: string }>;
}

export default async function CourseModulePage({ params }: CourseModulePageProps) {
  const { id } = await params;

  const courseResponse = await fetchCourseAction(id);
  if (!courseResponse.data) {
    return null;
  }

  const courseModulesResponse = await fetchCourseModulesByCourseAction(id);
  if (!courseModulesResponse.data) {
    return null;
  }

  const chaptersResponse = await fetchChaptersAction();
  if(!chaptersResponse.data?.data) {
    return null;
  }

  return <CourseModuleDashboardUI 
    course={courseResponse.data} 
    courseModules={courseModulesResponse.data}
    chapters={chaptersResponse.data.data}
  />
}