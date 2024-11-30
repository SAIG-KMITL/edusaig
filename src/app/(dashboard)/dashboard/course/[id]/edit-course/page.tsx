import { fetchCategoriesAction } from "@/actions/categoryAction";
import { fetchCourseAction } from "@/actions/courseAction";
import EditCourseUI from "@/app/shared/(ui)/EditCourseUI";

interface EditCoursePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCoursePage({ params }: EditCoursePageProps) {
  const { id } = await params;

  const courseResponse = await fetchCourseAction(id);
  if (!courseResponse.data) {
    return null;
  }

  const categoriesResponse = await fetchCategoriesAction();
  if (!categoriesResponse.data?.data) {
    return null;
  }

  return <EditCourseUI course={courseResponse.data} categories={categoriesResponse.data.data}/>
}