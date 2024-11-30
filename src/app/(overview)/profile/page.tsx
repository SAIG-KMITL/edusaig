import { fetchCoursesWithOwnershipAction } from "@/actions/courseAction";
import { fetchEnrollmentsAction } from "@/actions/enrollment.Action";
import { fetchUserAction } from "@/actions/userAction";
import ProfileUI from "../../shared/(ui)/ProfileUI";

export default async function Profile() {
  const user = await fetchUserAction();
  const courses = await fetchCoursesWithOwnershipAction();
  const enroll = await fetchEnrollmentsAction();

  if (!user.data) {
    return null;
  }

  if (!courses.data) {
    return null;
  }

  if (!enroll.data) {
    return null;
  }

  return (
    <ProfileUI
      user={user.data}
      courses={courses.data.data}
      enrolls={enroll.data.data}
    />
  );
}
