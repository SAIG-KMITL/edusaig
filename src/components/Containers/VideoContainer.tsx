"use client";

import { ChapterResponseType, ChapterType } from "@/types/chapter.type";
import {
  CourseModuleResponseType,
  CourseModuleType,
  CourseType,
} from "@/types/course.type";
import { fetchThumbnail } from "@/utils/resource/fetchThumbnail";
import { fetchVideo } from "@/utils/resource/fetchVideo";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookMarked,
  BookOpen,
  CheckCircle,
  ChevronLeft,
  Download,
  MessageCircle,
  PlayCircle,
} from "lucide-react";
import Link from "next/link";

export default function VideoContainer({
  course,
  chapter,
  courseModule,
  onComplete,
}: {
  course: CourseType;
  chapter: ChapterResponseType;
  courseModule: CourseModuleResponseType;
  onComplete: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-6 shadow-lg"
    >
      <div className="flex items-center mb-6">
        <Link
          href={`/course/${courseModule.course.id}`}
          className="flex items-center px-4 py-2 text-white bg-royalPurple/20 rounded-full hover:bg-royalPurple/30 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back to Course
        </Link>
        <h1 className="ml-4 text-2xl font-bold text-white">{chapter.title}</h1>
      </div>

      <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
        <iframe
          className="w-full h-full"
          src={fetchVideo(chapter.id)}
          allowFullScreen
        />
      </div>

      <div className="mt-8 grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <h2 className="text-2xl font-bold text-white mb-2">
            {chapter.content}
          </h2>
          <p className="text-silver mb-4">by {course.teacher.fullname}</p>
          <p className="text-white/80 leading-relaxed mb-6">
            {chapter.description}
          </p>

          <div className="flex gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#"
              className="flex items-center px-4 py-2 bg-electricViolet text-white rounded-lg hover:bg-electricViolet/90"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Materials
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onComplete}
              className="flex items-center px-4 py-2 bg-skyBlue text-white rounded-lg hover:bg-skyBlue/90"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark as Complete
            </motion.button>
          </div>
        </div>

        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full flex items-center justify-center px-4 py-3 bg-royalPurple text-white rounded-xl hover:bg-darkMagenta transition-colors"
          >
            <BookMarked className="w-5 h-5 mr-2" />
            View Summary
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full flex items-center justify-center px-4 py-3 bg-royalPurple text-white rounded-xl hover:bg-darkMagenta transition-colors"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Ask Question
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
