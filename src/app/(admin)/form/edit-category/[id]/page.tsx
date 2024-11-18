import { fetchCategoriesAction } from "@/actions/categoryAction";
import EditCategoryUI from "@/app/shared/(ui)/EditCategoryUI";
import { categories } from "@/constants/category";

export default async function EditCategoryPage() {
  const response = await fetchCategoriesAction();

  if (!response.data) {
    return null;
  }

  return <EditCategoryUI categories={response.data} />;
}
