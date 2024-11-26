import { fetchChaptersAction } from "@/actions/chapterAction";
import { fetchCourseAction } from "@/actions/courseAction";
import { fetchCourseModulesAction, fetchCourseModulesByCourseAction } from "@/actions/courseModuleAction";
import { fetchUserAction } from "@/actions/userAction";
import CourseDetailsUI from "@/app/shared/(ui)/CourseDetailsUI";

interface CourseDetailsProps {
  params: { id: string };
  searchParams: Record<string, string>;
}

export default async function CourseDetails({ params }: CourseDetailsProps) {
  const { id } = await params;
  const userResponse = await fetchUserAction();
  const courseResponse = await fetchCourseAction(id);
  const courseModuleResponse = await fetchCourseModulesAction();
  const chaptersResponse = await fetchChaptersAction();

  if(!userResponse.data) {
    return null;
  }

  if (!courseResponse.data) {
    return <div>Course not found</div>;
  }

  if(!courseModuleResponse.data?.data) {
    return  <div>Course module not found</div>;
  }

  if(!chaptersResponse.data?.data) {
    return  <div>Chapter not found</div>;;
  }

  return (
    <CourseDetailsUI 
      user={userResponse.data} 
      course={courseResponse.data} 
      courseModules={courseModuleResponse.data.data}
      chapters={chaptersResponse.data.data.filter((chapter) => courseModuleResponse.data?.data.some((courseModule) => courseModule.id == chapter.moduleId))}
    />
  );
}
