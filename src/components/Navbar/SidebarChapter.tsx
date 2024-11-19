"use client";

import { ChapterType } from "@/types/chapter.type";
import { CourseModuleType } from "@/types/course.type";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function SidebarChapter({
  courseModule,
  chapters,
  onChapterSelect,
}: {
  courseModule: CourseModuleType[];
  chapters: ChapterType[];
  onChapterSelect: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-steelGray rounded-2xl overflow-hidden shadow-lg"
    >
      <div className="p-4 border-b border-royalPurple/20">
        <h2 className="text-xl font-bold text-white text-center">
          Course Content
        </h2>
      </div>

      <div className="divide-y divide-royalPurple/20">
        {chapters.map((chapter, index) => (
          <motion.div
            key={chapter.id}
            initial={false}
            animate={{ opacity: 1 }}
            className="p-4 hover:bg-royalPurple/20 transition-colors cursor-pointer"
            onClick={() => onChapterSelect(chapter.id)}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 bg-royalPurple/20 rounded-full flex items-center justify-center text-white mr-3">
                {index + 1}
              </div>
              <div>
                <h3 className="text-white font-medium">{chapter.title}</h3>
                <p className="text-silver text-sm">{chapter.description}</p>
                <p className="text-silver text-xs">{chapter.duration} min</p>
              </div>
              <CheckCircle className="w-5 h-5 text-skyBlue ml-auto" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
