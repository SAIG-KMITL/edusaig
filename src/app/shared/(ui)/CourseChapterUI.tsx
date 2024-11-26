"use client";

import VideoContainer from "@/components/Containers/VideoContainer";
import SidebarChapter from "@/components/Navbar/SidebarChapter";
import { ChapterResponseType } from "@/types/chapter.type";
import { CourseModuleResponseType, CourseType } from "@/types/course.type";
import { UserResponseType } from "@/types/user.type";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookMarked,
  CheckCircle,
  ChevronLeft,
  Download,
  MessageCircle,
} from "lucide-react";
import { createProgressAction } from "@/actions/progress.Action";
import { EnrollmentResponseType } from "@/types/enrollment.type";
import { Toast } from "@/components/Toast/Toast";
import { useRouter } from "next/navigation";
import { ProgressResponseType } from "@/types/progress.type";

interface CourseChapterUIProps {
  user: UserResponseType;
  enrollment?: EnrollmentResponseType;
  course: CourseType;
  courseModules: CourseModuleResponseType[];
  currentChapter: ChapterResponseType;
  chapters: ChapterResponseType[];
  progresses: ProgressResponseType[];
}

export default function CourseChapterUI({
  user,
  enrollment,
  course,
  courseModules,
  currentChapter,
  chapters,
  progresses,
}: CourseChapterUIProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleComplete = async () => {
    try {
      setIsLoading(true);

      const response = await createProgressAction(
        enrollment?.id ?? "",
        currentChapter.id,
        "completed",
        currentChapter.duration,
        new Date(),
        new Date(),
      )

      if (response.error?.message) {
        Toast(response.error?.message, "error");
      } else {
        Toast("The progress has been created.", "success");
        handleNavigate();
      }
    } catch (error) {
      Toast(
        error instanceof Error ? error.message : "Failed to create progress.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigate = () => {
    const chaptersInCurrentCourseModule = chapters.filter((chapter) => chapter.moduleId == currentChapter.moduleId);
    
    if(currentChapter.orderIndex != chaptersInCurrentCourseModule.length) {
      const nextChapter = chaptersInCurrentCourseModule.find((chapter) => chapter.orderIndex == currentChapter.orderIndex + 1);

      router.push(`/course/${course.id}/chapter/${nextChapter?.id}`);
    } else {
      const currentCourseModule = courseModules.find((courseModule) => courseModule.id == currentChapter.moduleId);

      if(currentCourseModule?.orderIndex != courseModules.length) {
        const nextCourseModule = courseModules.find((courseModule) => courseModule.orderIndex == (currentCourseModule?.orderIndex ?? 0) + 1);
        const firstChapter = chapters
        .filter((chapter) => chapter.moduleId == nextCourseModule?.id)
        .find((chapters) => chapters.orderIndex == 1);

        if(firstChapter) {
          router.push(`/course/${course.id}/chapter/${firstChapter?.id}`);
        }
        else {
          router.refresh();
        }
      }
      else {
        router.refresh();
      }
    }
  }

  const hasChapterCompleted = (chapter: ChapterResponseType): boolean => {
    return progresses?.filter((progress) => progress.chapter.id == chapter.id)?.some((progress) => progress.status == "completed") ?? false;
  }

  return (
    <div className="min-h-screen">
      <div className="md:flex">
        <div className="md:w-2/3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-6"
          >
            <div className="flex items-center mb-6">
              <Link
                href={`/course/${course.id}`}
                className="flex items-center px-4 py-2 text-white bg-royalPurple/20 rounded-full hover:bg-royalPurple/30 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Back to Course
              </Link>
              <h1 className="ml-4 text-2xl font-bold text-white">
                {currentChapter.title}
              </h1>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
              <iframe
                className="w-full h-full"
                src={
                  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                }
                allowFullScreen
              />
            </div>

            <div className="mt-8 grid grid-cols-3 gap-8">
              <div className="col-span-2">
                <h2 className="text-xl font-bold text-white mb-2">
                  {currentChapter.content}
                </h2>
                <p className="text-silver mb-4">by {course.teacher.fullname}</p>
                <p className="text-white/80 leading-relaxed mb-6">
                  {currentChapter.description}
                </p>

                {/* Resources */}
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
                  { enrollment && !hasChapterCompleted(currentChapter) && user.role == "student" &&
                    <motion.button
                    disabled={isLoading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleComplete}
                    className="flex items-center px-4 py-2 bg-skyBlue text-white rounded-lg hover:bg-skyBlue/90"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Complete
                  </motion.button>
                  }
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
        </div>
        <div className="md:w-1/3 mb-16 rounded-3xl p-4 pt-6">
          <SidebarChapter
            courseModules={courseModules}
            currentChapter={currentChapter}
            chapters={chapters}
            isOwner={course.teacher.id == user.id}
            progresses={progresses}
          />
        </div>
      </div>
    </div>
  );
}
