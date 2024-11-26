"use client";

import { createEnrollmentAction } from "@/actions/enrollment.Action";
import SidebarChapter from "@/components/Navbar/SidebarChapter";
import { Toast } from "@/components/Toast/Toast";
import { THUMBNAIL_BASE_URL } from "@/constants/thumbnail";
import { ChapterResponseType } from "@/types/chapter.type";
import { CourseModuleResponseType, CourseModuleType, CourseType } from "@/types/course.type";
import { EnrollmentResponseType } from "@/types/enrollment.type";
import { ProgressResponseType } from "@/types/progress.type";
import { UserResponseType } from "@/types/user.type";
import { fetchThumbnail } from "@/utils/thumbnail/fetchThumbnail";
import { motion } from "framer-motion";
import { BarChart2, ChevronLeft, Clock, DollarSign, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CourseDetailsProps {
  user: UserResponseType;
  course: CourseType;
  enrollment?: EnrollmentResponseType;
  courseModules: CourseModuleResponseType[];
  chapters: ChapterResponseType[];
  progresses: ProgressResponseType[];
}

export default function CourseDetailsUI({ user, course, enrollment, courseModules, chapters, progresses }: CourseDetailsProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleEnroll = async () => {
    try {
      setIsLoading(true);
      console.log(user.id,
        course.id,
        false,
        0,
        "active",
        new Date(),
        null)
      const response = await createEnrollmentAction(
        user.id,
        course.id,
        false,
        0,
        "active",
        new Date(),
        null
      );

      if (response.error?.message) {
        Toast(response.error.message, "error");
        return;
      }

      Toast("Enrollment created successfully!", "success");
      router.refresh();
    } catch (error) {
      Toast(
        error instanceof Error ? error.message : "Unexpected error occurred during enrollment.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12 py-12 text-white">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-6 lg:items-start h-full drop-shadow-lg rounded-xl">
        <div className="w-full lg:flex-1 max-w-2xl lg:max-w-[420px] px-6">
          <div className="flex items-center flex-wrap mb-3">
            <Link
              href={`/course`}
              className="flex items-center px-4 py-2 text-white bg-royalPurple/20 rounded-full hover:bg-royalPurple/30 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back
            </Link>
          </div>
          <div className="space-y-6">
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
              className="flex flex-col gap-2 border border-silver rounded-xl px-6 py-3 bg-steelGray text-sm text-white"
            >
              <div className="flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-silver" />
                <p className="-mb-[7px]">{course.level}</p>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-silver" />
                <p className="-mb-[7px]">{course.category.title}</p>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-silver" />
                <p className="-mb-[6px]">{course.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-silver" />
                <p className="-mb-[7px]">{`${course.duration} mins`}</p>
              </div>
            </motion.div>
            { !enrollment &&
              <motion.button
                type="button"
                onClick={handleEnroll}
                disabled={isLoading}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                className="w-full flex justify-center p-3 rounded-xl bg-darkMagenta hover:bg-darkMagenta/90"
              >
                Enroll Now
              </motion.button>
            }
            
          </div>
        </div>
        <div className="w-full lg:flex-1 max-w-2xl flex flex-col break-words px-6 flex-grow-1">
          <div className="flex justify-center">
            <div className="w-full grid grid-cols-1 gap-8">
              <div>
                <div className="flex items-center">
                  <div className="text-2xl mr-8 font-semibold">
                    {course.title}
                  </div>
                  <div className="text-gray-400">
                    by {course.teacher.fullname}
                  </div>
                </div>
                <div className="border rounded-xl p-[25px] mt-1 bg-steelGray">
                  {course.description}
                </div>
              </div>
              <div>
                <div className="border rounded-xl mt-1">
                  <SidebarChapter
                    courseModules={courseModules}
                    chapters={chapters}
                    isOwner={course.teacher.id == user.id}
                    progresses={progresses}
                    hasEnrolled={enrollment != undefined}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
