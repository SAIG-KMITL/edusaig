import EditCategoryUI from "@/app/shared/(ui)/EditCategoryUI";
import { categories } from "@/constants/category";

export default function EditCategoryPage() {
  return <EditCategoryUI categories={categories}/>;
}
