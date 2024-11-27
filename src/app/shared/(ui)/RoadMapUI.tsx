"use client";

import { RoadMapCard } from "@/components/Cards/RoadMapCard";
import { RoadMapType } from "@/types/roadmap.type";
import { motion } from "framer-motion";

export default function RoadMapUI({ roadmap }: { roadmap: RoadMapType[] }) {
  return (
    <div className="flex flex-1 flex-col min-h-screen justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-start md:justify-center w-full pt-8 px-4 lg:px-8"
      >
        <h1 className="text-electricViolet text-3xl font-bold">
          Start Your Journey
        </h1>
      </motion.div>

      <div className="relative max-w-[1200px] w-full h-full p-4 lg:p-8">
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1 }}
          className="absolute w-[6px] bg-gradient-to-b from-electricViolet via-skyBlue to-royalPurple rounded-full top-10 bottom-0 left-[31px] md:left-1/2 ml-[-3px]"
        />
        {roadmap.map((item, index) => (
          <RoadMapCard
            key={index}
            number={item.priority}
            data={item.courses[0]}
            position={index % 2 === 0 ? "right" : "left"}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-start md:justify-center w-full py-9 px-4 lg:px-8"
      >
        <h1 className="text-electricViolet text-3xl font-bold">
          Achievement Unlocked
        </h1>
      </motion.div>
    </div>
  );
}
