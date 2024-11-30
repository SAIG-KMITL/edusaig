"use client";

import { ChapterResponseType } from "@/types/chapter.type";
import { CourseModuleResponseType } from "@/types/course.type";
import { motion } from "framer-motion";
import CourseModuleEntry from "../Button/CourseModuleEntry";
import { ProgressResponseType } from "@/types/progress.type";

export default function SidebarChapter({
  courseModules,
  currentChapter,
  chapters,
  isOwner,
  progresses,
  hasEnrolled,
}: {
  courseModules: CourseModuleResponseType[];
  currentChapter?: ChapterResponseType;
  chapters: ChapterResponseType[];
  isOwner: boolean;
  progresses?: ProgressResponseType[];
  hasEnrolled?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-steelGray rounded-2xl overflow-hidden shadow-lg"
    >
      <div className="p-4 border-b border-royalPurple/20">
        <h2 className="text-xl font-bold text-white text-center">
          {`${!hasEnrolled ? "Preview " : ""}Course Content`}
        </h2>
      </div>

      <div className="divide-y divide-royalPurple/20">
        {courseModules
          .sort((a, b) => a.orderIndex - b.orderIndex)
          .map((courseModule, index) => (
            <motion.div
              key={courseModule.id}
              initial={false}
              animate={{ opacity: 1 }}
              className="p-4 hover:bg-royalPurple/20 transition-colors cursor-pointer"
            >
              <CourseModuleEntry
                module={courseModule}
                currentChapter={currentChapter}
                chapters={chapters.filter(
                  (chapter) => chapter.moduleId == courseModule.id
                )}
                isOwner={isOwner}
                progresses={progresses}
                hasEnrolled={hasEnrolled}
              />
            </motion.div>
          ))}
      </div>
    </motion.div>
  );
}
