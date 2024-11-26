import { fetchCategoriesAction } from "@/actions/categoryAction";
import CreateCourseUI from "@/app/shared/(ui)/CreateCourseUI";

export default async function CreteCoursePage() {
  const response = await fetchCategoriesAction();
  if (!response.data?.data) {
    return null;
  }
  return <CreateCourseUI categories={response.data.data}/>
}