import { fetchCourseAction } from "@/actions/courseAction";
import { fetchUserAction } from "@/actions/userAction";
import CourseDetailsUI from "@/app/shared/(ui)/CourseDetailsUI";

interface CourseDetailsProps {
  params: { id: string };
  searchParams: Record<string, string>;
}

export default async function CourseDetails({ params }: CourseDetailsProps) {
  const { id } = await params;
  const user = await fetchUserAction();
  const course = await fetchCourseAction(id);

  if(!user.data) {
    return null;
  }

  if (!course.data) {
    return <div>Course not found</div>;
  }

  return <CourseDetailsUI user={user.data} course={course.data} />;
}
