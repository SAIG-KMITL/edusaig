"use client";

import { BarChart2, ChevronLeft, Clock, DollarSign, PlusIcon, Tag } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { handleOpenModal } from "@/lib/modal";
import CreateCourseModuleModal from "@/components/Modals/CreateCourseModuleModal";
import CourseModuleEntry from "@/components/Button/CourseModuleEntry";
import EditCourseModuleModal from "@/components/Modals/EditCourseModuleModal";
import { useState } from "react";
import { CourseModuleResponseType, CourseType } from "@/types/course.type";
import Link from "next/link";
import { ChapterResponseType } from "@/types/chapter.type";
import DeleteChapterModal from "@/components/Modals/DeleteChapterModal";
import DeleteCourseModuleModal from "@/components/Modals/DeleteCourseModuleModal";
import { fetchThumbnail } from "@/utils/thumbnail/fetchThumbnail";
import { THUMBNAIL_BASE_URL } from "@/constants/thumbnail";

interface CourseModuleDashboardUIProps {
  course: CourseType;
  courseModules: CourseModuleResponseType[];
  chapters: ChapterResponseType[];
}

export default function CourseModuleDashboardUI({ course, courseModules, chapters }: CourseModuleDashboardUIProps) {
  const [selectedModule, setSelectedModule] = useState<CourseModuleResponseType | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<ChapterResponseType | null>(null);

  const handleCourseModuleSelected = (module: CourseModuleResponseType) => {
    setSelectedModule(module);
  };

  const handleCourseModuleDeselected = () => {
    setSelectedModule(null);
  };

  const handleChapterSelected = (chapter: ChapterResponseType) => {
    setSelectedChapter(chapter);
  };

  const handleChapterDeselected = () => {
    setSelectedChapter(null);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12 py-12">
      <CreateCourseModuleModal courseId={course.id}/>
      <EditCourseModuleModal courseId={course.id} courseModule={selectedModule} handleModuleDeselected={handleCourseModuleDeselected} />
      <DeleteCourseModuleModal courseModule={selectedModule} handleCourseModuleDeselected={handleCourseModuleDeselected}/>
      <DeleteChapterModal chapter={selectedChapter} handleChapterDeselected={handleChapterDeselected}/>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-6 lg:items-start h-full drop-shadow-lg rounded-xl">
        <div className="w-full lg:flex-1 max-w-2xl lg:max-w-[420px] px-6 lg:sticky top-[120px]">
          <div className="flex items-center flex-wrap mb-3">
            <Link
              href={`/dashboard/course`}
              className="flex items-center px-4 py-2 text-white bg-royalPurple/20 rounded-full hover:bg-royalPurple/30 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back to Course
            </Link>
            <h1 className="ml-4 text-2xl font-bold text-white">
              {course.title}
            </h1>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative aspect-video rounded-xl overflow-hidden bg-black/50"
          >
            <Image
              src={fetchThumbnail(course.id) || THUMBNAIL_BASE_URL}
              fill
              alt="preview course thumbnail"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 flex flex-col gap-2 border border-silver rounded-xl px-6 py-3 bg-steelGray text-sm text-white"
          >
            <p className="text-silver font-light">
              {course.description}
            </p>
            <div className="flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-silver"/>
              <p className="-mb-[7px]">{course.level}</p>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-silver"/>
              <p className="-mb-[7px]">{course.category.title}</p>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-silver"/>
              <p className="-mb-[6px]">{course.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-silver"/>
              <p className="-mb-[7px]">{`${course.duration} mins`}</p>
            </div>
          </motion.div>
        </div>
        <div className="w-full lg:flex-1 max-w-2xl flex flex-col break-words px-6 flex-grow-1">
          <div className="flex justify-start text-white items-center font-semibold text-left text-2xl p-3 pt-0 rounded-xl">
            <span>Course Modules</span>
          </div>
          <div className="bg-steelGray/30 border border-royalPurple/20 my-1 text-left p-6 space-y-5 rounded-xl flex flex-col">
            <motion.button
              onClick={() => handleOpenModal("create-module-modal")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 bg-electricViolet text-white rounded-xl font-medium
      hover:bg-electricViolet/90 transition-colors flex justify-center items-center gap-2"
            >
              <PlusIcon className="w-5 h-5" />
              <p>Add Module</p>
            </motion.button>
            {courseModules.sort((a, b) => a.orderIndex - b.orderIndex).map((module, index) => {
              return (
                <CourseModuleEntry
                  key={index}
                  module={module}
                  handleModuleSelected={handleCourseModuleSelected}
                  handleChapterSelected={handleChapterSelected}
                  chapters={chapters}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
