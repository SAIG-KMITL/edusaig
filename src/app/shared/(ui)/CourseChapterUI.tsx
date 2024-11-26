"use client";

import VideoContainer from "@/components/Containers/VideoContainer";
import SidebarChapter from "@/components/Navbar/SidebarChapter";
import { ChapterResponseType } from "@/types/chapter.type";
import { CourseModuleResponseType, CourseType } from "@/types/course.type";
import { UserResponseType } from "@/types/user.type";

interface CourseChapterUIProps {
  user: UserResponseType;
  course: CourseType;
  courseModules: CourseModuleResponseType[];
  chapter: ChapterResponseType;
  chapters: ChapterResponseType[];
}

export default function CourseChapterUI({ user, course, courseModules, chapter, chapters } : CourseChapterUIProps) {
  return (
    <div className="min-h-screen">
      <div className="md:flex">
        <div className="md:w-2/3">
          <VideoContainer
            course={course}
            chapter={chapter}
            courseModule={courseModules[0]}
            onComplete={function (): void {
              console.log("completed");
            }}
          />
        </div>
        <div className="md:w-1/3 mb-16 rounded-3xl p-4 pt-6">
          <SidebarChapter
            courseModules={courseModules}
            currentChapter={chapter}
            chapters={chapters}
            isOwner={course.teacher.id == user.id}
          />
        </div>
      </div>
    </div>
  );
}
