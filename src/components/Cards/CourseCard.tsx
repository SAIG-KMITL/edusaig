import { CourseType } from "@/types/course.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CourseLevelTag from "../Tags/CourseLevelTag";

interface CourseCardProps {
  data: CourseType;
}

const CourseCard: React.FC<CourseCardProps> = ({ data }) => {
  return (
    <Link href={`/course/${data.id}`}>
      <div className="border border-gray-300 shadow-card drop-shadow-md bg-white w-72 rounded-xl overflow-hidden">
        <div className="relative aspect-video h-48 w-full">
          <Image
            src={data.thumbnail}
            alt={data.title}
            fill             
            className="object-cover"
          />
          <span className="absolute right-2 bottom-2 py-1 px-2 rounded-sm bg-gray-700 bg-opacity-50 text-sm font-medium text-white">{`${data.duration} hour`}</span>
        </div>
        <div className="p-4 py-2 flex flex-col">
          <h2 className="text-xl font-semibold">{data.title}</h2>
          <div className="mt-1 flex flex-row gap-2">
            <CourseLevelTag level={data.level}/>
            <span className="py-1 px-2 rounded-sm bg-gray-300 text-xs font-light">{data.category}</span>
          </div>
          <div className="mt-2 flex flex-row justify-between items-center">
            <div className="flex flex-row items-center gap-2">
              <Image 
                src={"/pictures/profile-picture-01.svg"}
                width={24}
                height={24}
                alt="teacher profile image"
              />
              <p className="text-sm text-gray-500">{`course by ${data.teacher}`}</p>
            </div>
            <p className="text-black font-bold text-lg">{`$${data.price}`}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
