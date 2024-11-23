"use client";

import { CourseType } from "@/types/course.type";
import { motion } from "framer-motion";
import CourseCard from "./CourseCard";

interface RoadMapCardProps {
  number: number;
  data: CourseType;
  position: "left" | "right";
}

export const RoadMapCardResult = ({ number, data, position }: RoadMapCardProps) => {
  const isLeft = position === "left";

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: number * 0.2 }}
      className={`relative pl-4 pt-4 flex items-center w-1/2 group my-8 ${
        isLeft ? "left-[16px] md:left-0" : ""
      }`}
    >
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        className={`absolute top-[-15px] ${
          isLeft ? "md:right-[32px]" : "left-[32px]"
        }`}
      >
        <h1 className="text-electricViolet text-xl font-bold">Step {number}</h1>
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        className={`absolute w-4 h-4 border-4 bg-steelGray border-electricViolet rounded-full top-[15px] z-10 ${
          isLeft ? "left-[-8px] md:left-[calc(100%-8px)]" : "left-[-8px]"
        }`}
      />

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
        className={`absolute h-[6px] w-full md:w-48 bg-gradient-to-r from-electricViolet to-skyBlue rounded-full top-[20px] ${
          isLeft ? "right-0 origin-right" : "left-0 origin-left"
        }`}
      />

      <motion.div
        className={`relative flex mt-4 gap-4 min-h-96 w-full ${
          isLeft ? "justify-end" : "justify-start"
        }`}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={"py-3 w-[190px] md:w-auto  sm:w-[300px]"}
        >
          <CourseCard data={data} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className={`w-full hidden lg:block ${
            isLeft ? "text-right" : "text-left"
          }`}
        >
          <h1 className="font-bold text-lg text-white">{data.title}</h1>
          <p className="text-sm text-silver">{data.description}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
