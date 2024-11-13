import CourseDetailsUI from "@/app/shared/(ui)/CourseDetailsUI";
import { courses } from "@/constants/course";

export default function CourseDetails() {
  return <CourseDetailsUI courses={courses}/>;
}
