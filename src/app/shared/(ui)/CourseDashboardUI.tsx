"use client";

import { courses } from "@/constants/course";
import { UserResponseType } from "@/types/user.type";
import Image from "next/image";
import { motion } from "framer-motion";
import CourseCard from "@/components/Cards/CourseCard";
import Link from "next/link";
import { Award, Mail, PlusIcon, User } from "lucide-react";
import { formatDate } from "@/utils/format";
import { CourseResponseType, CourseType } from "@/types/course.type";
import { useState } from "react";
import DeleteCourseModal from "@/components/Modals/DeleteCourseModal";

interface CourseDashboardUI {
  user: UserResponseType;
  courses: CourseResponseType[];
}

export default function CourseDashboardUI({ user, courses }: CourseDashboardUI) {
  const [selectedCourse, setSelectedCourse] = useState<CourseResponseType | null>(null);

  const handleCourseSelected = (course: CourseResponseType) => {
    setSelectedCourse(course);
  }

  const handleCourseDeselected = () => {
    setSelectedCourse(null);
  }

  return (
    <div>
      <DeleteCourseModal course={selectedCourse} handleCourseDeselected={handleCourseDeselected} />
      <div className="bg-transparent/20 w-full h-[250px] flex items-center justify-center text-white">
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex md:justify-between justify-center items-center">
          <div className="flex items-center gird gap-8">
            <Image
              className="object-cover w-[192px] h-[192px] rounded-xl"
              src="https://plus.unsplash.com/premium_photo-1682089892133-556bde898f2c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3R1ZGVudCUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
              alt=""
              width={192}
              height={192}
            />
            <div className="my-4">
              <h1 className="text-2xl font-semibold">{user.fullname}</h1>
              <div className="mt-3 gap-1 grid">
                <p className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  {user.email}
                </p>
                <p className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  {user.role}
                </p>
              </div>
              <div className="mt-3 text-silver/90">
                Member since{" "}
                <p className="font-semibold text-white">
                  {formatDate(user.createdAt)}
                </p>
              </div>
              <div className="md:hidden flex mt-1">
                <p className="flex border border-yellow-500 px-2 rounded-2xl py-1 items-center">
                  <Award className="w-5 h-5 text-yellow-500" /> X,XXX pts
                </p>
              </div>
            </div>
          </div>
          <div className="flex-col h-[192px] justify-center hidden md:flex">
            <h1>My Point</h1>
            <p className="font-semibold text-[28px]">X,XXX pts</p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="mb-6 text-2xl font-semibold text-white">{`My Courses (${courses.length})`}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="min-h-[192px] border-2 border-white/20 border-dashed rounded-2xl overflow-hidden"
          >
            <Link
              href={"/dashboard/course/create-course"}
              className="w-full h-full flex flex-col justify-center items-center"
            >
              <PlusIcon className="w-12 h-12 text-silver" />
              <p className="text-lg font-medium text-white">Add Course</p>
            </Link>
          </motion.div>
          {courses.map((course) => (
            <div key={course.id}>
              <CourseCard course={course} showOptionButton={true} handleCourseSelected={handleCourseSelected}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
