import React from "react";
import CourseCard from "./CourseCard";
import { CourseType } from "@/types/course.type";

export interface RoadMapCardProps {
  number: number;
  data: CourseType;
  position: "left" | "right";
}

export const RoadMapCard = ({ number, data, position }: RoadMapCardProps) => {
  const isLeft = position === "left";

  return (
    <div
      className={`relative px-8 py-4 flex items-center drop-shadow-md w-1/2 group my-8 ${
        isLeft ? "left-[16px] md:left-0" : "left-[16px] md:left-1/2"
      }`}
    >
      {/* Date label */}
      <div
        className={`absolute top-[-15px] ${
          isLeft ? "md:right-[32px]" : "left-[32px]"
        }`}
      >
        <h1 className="text-black text-xl font-bold">Step {number}</h1>
      </div>

      {/* Connector dot */}
      <div
        className={`absolute w-4 h-4 border-4 bg-white border-blue-400 rounded-full top-[15px] z-10 ${
          isLeft ? "left-[-8px] md:left-[calc(100%-8px)]" : "left-[-8px]"
        }`}
      ></div>

      {/* Connector line */}
      <div
        className={`absolute h-[6px] w-full md:w-48 bg-blue-400 rounded-full top-[20px] ${
          isLeft ? "right-0" : "left-0"
        }`}
      ></div>

      {/* Content */}
      <div
        className={`relative flex mt-4 gap-4 min-h-96 w-full ${
          isLeft ? "justify-end" : "justify-start"
        }`}
      >
        <div className={`absolute top-4 ${isLeft ? "left-0" : "md:right-0"}`}>
          <CourseCard data={data} />
        </div>
        <div
          className={`w-32 hidden lg:block ${
            isLeft ? "text-right" : "text-left"
          }`}
        >
          <h1 className="font-bold text-lg text-black">{data.title}</h1>
          <p className="text-sm text-gray-500">{data.description}</p>
        </div>
      </div>
    </div>
  );
};
