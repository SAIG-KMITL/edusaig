import { fetchCourseAction } from "@/actions/courseAction";
import CourseDetailsUI from "@/app/shared/(ui)/CourseDetailsUI";

interface CourseDetailsProps {
  params: { id: string };
  searchParams: Record<string, string>;
}

export default async function CourseDetails({ params }: CourseDetailsProps) {
  const id = params.id;
  const course = await fetchCourseAction(id);

  if (!course.data) {
    return <div>Course not found</div>;
  }

  return <CourseDetailsUI course={course.data} />;
}
