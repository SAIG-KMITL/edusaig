import { fetchChaptersAction } from "@/actions/chapterAction";
import { fetchCourseAction } from "@/actions/courseAction";
import { fetchCourseModulesAction } from "@/actions/courseModuleAction";
import { fetchUserAction } from "@/actions/userAction";
import CourseChapterUI from "@/app/shared/(ui)/CourseChapterUI";
import { chapters } from "@/constants/chapter";

interface ChapterProps {
  params: { id: string, chapterId: string };
  searchParams: Record<string, string>;
}

export default async function Chapter({ params }: ChapterProps) {
  const { id, chapterId } = await params;
  const userResponse = await fetchUserAction();
  const courseResponse = await fetchCourseAction(id);
  const courseModuleResponse = await fetchCourseModulesAction();
  const chaptersResponse = await fetchChaptersAction();

  let chapter = chaptersResponse.data?.data.find((chapter) => chapter.id == chapterId);

  if(!userResponse.data) {
    return null;
  }

  if (!courseResponse.data) {
    return <div>Course not found</div>;
  }

  if(!courseModuleResponse.data?.data) {
    return  <div>Course module not found</div>;
  }

  if(!chaptersResponse.data?.data || !chapter) {
    return  <div>Chapter not found</div>;;
  }

  return (
    <CourseChapterUI 
      user={userResponse.data} 
      course={courseResponse.data} 
      courseModules={courseModuleResponse.data.data}
      chapter={chapter}
      chapters={chaptersResponse.data.data.filter((chapter) => courseModuleResponse.data?.data.some((courseModule) => courseModule.id == chapter.moduleId))}
    />
  )
}
