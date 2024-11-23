import { fetchUserAction } from "@/actions/userAction";
import CourseDashboardUI from "@/app/shared/(ui)/CourseDashboardUI";

export default async function CourseDashboardPage() {

  const response = await fetchUserAction();
  if (!response.data) {
    return null;
  }

  return <CourseDashboardUI user={response.data}/>
}