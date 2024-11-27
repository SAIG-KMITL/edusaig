import CourseCard from "@/components/Cards/CourseCard";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { CourseType } from "@/types/course.type";
import Link from "next/link";

export default function CourseUI({
  courses,
  coursePopular,
  courseNew,
}: {
  courses: CourseType[];
  coursePopular: CourseType[] | undefined;
  courseNew: CourseType[] | undefined;
}) {
  const shuffle = (array: CourseType[]) => {
    return array.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="flex flex-col mb-6 lg:mb-10">
        <h1 className="text-5xl font-bold text-white">
          Discover New Skills with Our Courses
        </h1>
        <p className="text-silver">
          Find the best course to enhance your skills.
        </p>
      </div>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-semibold text-white">
                Featured Courses
              </h2>
              <p className="text-silver">Explore our most popular courses</p>
            </div>
            <Link
              href=""
              className="flex items-center text-skyBlue hover:text-electricViolet transition-colors"
            >
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {coursePopular?.slice(0, 4).map((course: any) => (
              <motion.div
                key={course.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <CourseCard key={course.id} course={course} />
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-semibold text-white">
                New Arrivals
              </h2>
              <p className="text-silver">
                Be the first to explore our latest courses
              </p>
            </div>
            <Link
              href=""
              className="flex items-center text-skyBlue hover:text-electricViolet transition-colors"
            >
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courseNew?.slice(0, 4).map((course: any) => (
              <motion.div
                key={course.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <CourseCard key={course.id} course={course} />
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-semibold text-white">
                Recommended for You
              </h2>
              <p className="text-silver">
                Handpicked courses tailored just for you
              </p>
            </div>
            <Link
              href=""
              className="flex items-center text-skyBlue hover:text-electricViolet transition-colors"
            >
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {shuffle(courses).slice(0, 4).map((course) => (
              <motion.div
                key={course.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <CourseCard key={course.id} course={course} />
              </motion.div>
            ))}
          </div>
        </div>
        <div className="pt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 border-t border-white/20">
          {courses.map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <CourseCard key={course.id} course={course} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
