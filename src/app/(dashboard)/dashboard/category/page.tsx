import CategoryDashboardUI from "@/app/shared/(ui)/CategoryDashboardUI";
import { categories } from "@/constants/category";

export default function CategoryDashboard() {
  return <CategoryDashboardUI categories={categories} />;
}
