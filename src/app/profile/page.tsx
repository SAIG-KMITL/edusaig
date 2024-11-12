import { fetchUserAction } from "@/actions/userAction";
import ProfileUI from "../shared/(ui)/ProfileUI";

export default async function Profile() {
  const response = await fetchUserAction();
  if (!response.data) {
    return null;
  }
  return <ProfileUI user={response.data} />;
}
