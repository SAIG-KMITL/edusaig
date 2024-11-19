import CourseCard from "@/components/Cards/CourseCard";
import { courses } from "@/constants/course";

export default function CourseUI() {
  return (
    <div className="flex flex-1 min-h-screen w-full bg-white justify-center">
      <div className="bg-white container flex-col p-4 lg:p-6">
        <div className="flex flex-col mb-6 lg:mb-10">
          <h1 className="text-3xl font-semibold text-black">
            Discover New Skills with Our Courses
          </h1>
          <p className="text-gray-500">
            Find the best course to enhance your skills.
          </p>
        </div>
        <div className="flex">
          <div className="flex flex-wrap gap-8 justify-center">
            {courses.map((course) => (
              <CourseCard key={course.id} data={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
