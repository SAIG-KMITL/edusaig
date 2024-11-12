import { CourseType } from "@/types/course.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CourseCardProps {
  data: CourseType;
}

const CourseCard: React.FC<CourseCardProps> = ({ data }) => {
  return (
    <Link href={`/course/${data.id}`}>
      <div className="border border-gray-300 drop-shadow-md bg-white w-72 rounded-md overflow-hidden">
        <div className="relative aspect-video h-48 w-full">
          <Image
            src={data.thumbnail}
            alt={data.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4 pt-2 flex flex-col">
          <h2 className="text-xl font-semibold text-black">{data.title}</h2>
          <p className="text-gray-500">{data.teacher}</p>
          <div className="flex flex-col mt-2 text-sm mb-2">
            <p className="text-gray-500 line-clamp-1">{data.description}</p>
            <p className="text-gray-500">{data.duration} mins</p>
            <p className="text-gray-500">{data.level}</p>
          </div>
          <p className="text-black font-bold text-lg">${data.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
