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
      <div className="gradient-border p-2 rounded-2xl bg-gradient-to-t from-white/5 to-white/25 hover:to-white/30 overflow-hidden">
        <div className="relative aspect-video h-48 w-full">
          <Image
            src={data.thumbnail}
            alt={data.title}
            fill
            className="rounded-xl object-cover"
          />
          <div className="absolute right-2 bottom-2 flex flex-row-reverse gap-2">
            <span className="py-1 px-2 rounded-sm bg-gray-800 bg-opacity-50 text-sm font-medium text-white">{`${data.duration} mins`}</span>
            <span className="py-1 px-2 rounded-sm bg-gray-800 bg-opacity-50 text-sm font-medium text-white">{`$${data.price}`}</span>
          </div>
        </div>
        <div className="pt-2 flex flex-row items-start gap-2">
          <Image
            src={"/pictures/profile-picture-01.svg"}
            width={32}
            height={32}
            alt="teacher profile image"
          />
          <div className="pt-1 flex flex-col gap-2">
            <h2 className="text-lg font-semibold leading-[100%] text-white">{data.title}</h2>
            <p className="text-sm  leading-[100%] text-silver">{data.teacher}</p>
            <div className="-ml-3 flex flex-row gap-2">
              <CourseLevelTag level={data.level} />
              <span className="py-1 px-3 rounded-full border border-skyBlue text-xs text-skyBlue font-light">
                {data.category}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
