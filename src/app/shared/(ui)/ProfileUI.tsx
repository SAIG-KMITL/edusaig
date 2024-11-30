"use client";

import CourseCard from "@/components/Cards/CourseCard";
import { CourseType } from "@/types/course.type";
import { EnrollmentResponseType } from "@/types/enrollment.type";
import { UserResponseType } from "@/types/user.type";
import { formatDate } from "@/utils/format";
import { Award, Mail, User } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type ProfileUIProps = {
  user: UserResponseType;
  enrolls: EnrollmentResponseType[];
  courses: CourseType[];
};

export default function ProfileUI({ user, enrolls, courses }: ProfileUIProps) {
  const [myCourseProgress, setMyCourseProgress] =
    useState<EnrollmentResponseType[]>();

  useEffect(() => {
    setMyCourseProgress(enrolls.filter((enroll) => enroll.user.id === user.id));
  }, []);

  console.log("My Course Progress : ", myCourseProgress);

  return (
    <div className="text-white">
      <div className="bg-transparent/20 w-full h-[250px] flex md:justify-between justify-center items-center">
        <div className="flex items-center gird gap-8">
          <Image
            className="object-cover w-[192px] h-[192px] md:ml-[68px] rounded-xl"
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
          </div>
        </div>
        <div className="flex-col h-[192px] justify-center items-end mr-[68px] hidden md:flex">
          <h1>My Point</h1>
          <p className="font-semibold text-[28px]">{user.points} pts</p>
        </div>
      </div>
      <div className="mx-14">
        {/* <div className="mt-4 grid gap-2">
          <h1 className="text-[24px] font-semibold">My Course</h1>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-8 gap-y-4">
            {myCourse?.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div> */}
        <div className="mt-4 grid gap-2">
          <h1 className="text-[24px] font-semibold">On Progress</h1>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-8 gap-y-4">
            {myCourseProgress?.map((course) => (
              <CourseCard key={course.id} course={course.course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
