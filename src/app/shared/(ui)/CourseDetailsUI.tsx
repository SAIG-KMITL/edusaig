"use client";

import SidebarChapter from "@/components/Navbar/SidebarChapter";
import { chapters } from "@/constants/chapter";
import { courseModule } from "@/constants/courseModule";
import { CourseType } from "@/types/course.type";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CourseDetailsUI({
  courses,
}: {
  courses: CourseType[];
}) {
  const [course, setCourse] = useState<CourseType | null>(null);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    setCourse(courses.find((course) => course.id == params.id) ?? null);
  }, [params.id]);

  if (!course) {
    return null;
  }

  console.log(course);

  return (
    <div>
      <div className="flex justify-center mb-8">
        <div className="w-[1080px] text-white md:flex mt-16">
          <div className="absolute top-[85px] w-[360px] h-[40px]">
            <div className="flex">
              <Link
                href={`/course`}
                className="px-6 py-2 flex h-full justify-center items-center bg-royalPurple/20 hover:bg-royalPurple/30 rounded-full"
              >
                <ChevronLeft className="mr-2 w-5 h-5" />
                Back
              </Link>
            </div>
          </div>
          <div className="flex justify-center mb-6">
            <div>
              <Image
                src={course.thumbnail}
                height={230}
                width={400}
                alt="thumbnail"
                className="object-cover rounded-2xl"
              />
              <div className="flex mx-3 mt-5">
                <Image
                  src="/icons/book-white.svg"
                  height={25}
                  width={25}
                  alt="book icon"
                  className="mr-3"
                />
                <div>{course.category}</div>
              </div>
              <div className="flex mx-3 mt-4 mb-5">
                <Image
                  src="/icons/clock-white.svg"
                  height={25}
                  width={25}
                  alt="clock icon"
                  className="mr-3"
                />
                <div className="">{course.duration} mins</div>
              </div>
              <div className="flex">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  className="w-full flex justify-center p-3 rounded-xl bg-darkMagenta hover:bg-darkMagenta/90"
                >
                  Enroll Now
                </motion.button>
              </div>
            </div>
          </div>
          <div className="md:w-2/3 md:ml-[70px] flex justify-center">
            <div className="grid grid-cols-1 gap-8">
              <div>
                <div className="flex items-center">
                  <div className="text-2xl mr-8 font-semibold">
                    {course.title}
                  </div>
                  <div className="text-gray-400">by {course.teacher}</div>
                </div>
                <div className="border rounded-xl p-[25px] mt-1 bg-steelGray">
                  {course.description}. Popular programming language courses,
                  tutorials, programming certifications, and coding boot camps
                  on the web offer a wealth of resources designed to keep you on
                  top of your game.
                </div>
              </div>
              <div>
                <div className="border rounded-xl mt-1">
                  <SidebarChapter
                    courseModule={courseModule}
                    chapters={chapters}
                    onChapterSelect={function (id: string): void {
                      router.push(`/course/chapter/${id}`);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
