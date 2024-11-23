"use client";

import { courses } from "@/constants/course";
import { UserResponseType } from "@/types/user.type";
import Image from "next/image";
import { motion } from "framer-motion";
import CourseCard from "@/components/Cards/CourseCard";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

interface CourseDashboardUI {
  user: UserResponseType;
}

export default function CourseDashboardUI({ user }: CourseDashboardUI) {
  return (
    <div>
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
              <PlusIcon className="w-12 h-12 text-silver"/>
              <p className="text-lg font-medium text-white">Add a course</p>
            </Link>  
          </motion.div>
          {courses.map((course) => (
            <div
              key={course.id}
            >
              <CourseCard data={course} showOptionButton={true}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}