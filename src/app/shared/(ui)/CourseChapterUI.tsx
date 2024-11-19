"use client"

import SidebarChapter from "@/components/Navbar/SidebarChapter"
import VideoContainer from "@/components/Containers/VideoContainer"
import { useParams, useSearchParams } from "next/navigation"

export default function CourseChapterUI() {
  const chapter = useParams();
  const courseId = useSearchParams()

  if (!courseId.get('courseId')) {
    return null
  }

  return (
    <div className="flex justify-center text-white">
      <div className="w-[1080px] mt-24 md:flex gap-8" >
        <div className="md:w-2/3">
          <VideoContainer chapterId={chapter.id} />
        </div>
        <div className="md:w-1/3">
          <div className="text-2xl">Contents</div>
          <div className="border border-white mb-16 rounded-3xl">
            <SidebarChapter courseModuleId={courseId.get('courseId')} />
          </div>
        </div>
      </div>
    </div>
  )
}
