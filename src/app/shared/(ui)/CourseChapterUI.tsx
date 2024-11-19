"use client";

import VideoContainer from "@/components/Containers/VideoContainer";
import SidebarChapter from "@/components/Navbar/SidebarChapter";
import { chapters } from "@/constants/chapter";
import { courseModule } from "@/constants/courseModule";

export default function CourseChapterUI() {
  return (
    <div className="min-h-screen">
      <div className="md:flex">
        <div className="md:w-2/3">
          <VideoContainer
            chapter={chapters[0]}
            courseModule={courseModule[0]}
            onComplete={function (): void {
              console.log("completed");
            }}
          />
        </div>
        <div className="md:w-1/3 mb-16 rounded-3xl p-4">
          <SidebarChapter
            courseModule={courseModule}
            chapters={chapters}
            onChapterSelect={function (id: string): void {
              console.log(id);
            }}
          />
        </div>
      </div>
    </div>
  );
}
