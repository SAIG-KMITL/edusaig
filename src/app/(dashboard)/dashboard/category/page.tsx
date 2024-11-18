import { fetchCategoriesAction } from "@/actions/categoryAction";
import CategoryDashboardUI from "@/app/shared/(ui)/CategoryDashboardUI";
import { categories } from "@/constants/category";

export default async function CategoryDashboard() {
  const response = await fetchCategoriesAction();
  if (!response.data) {
    return null;
  }

  return <CategoryDashboardUI categories={response.data} />;
}
