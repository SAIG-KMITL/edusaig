"use client"

import { useState, useEffect } from "react"
import DropdownChapter from "../Button/DropdownChapter"
import { courseModule } from "@/constants/courseModule"
import { CourseModuleType } from "@/types/course.type"

export default function SidebarChapter({
    courseModuleId
}: {
    courseModuleId: string | null
}
) {
    const [chaptersId, setChaptersId] = useState<CourseModuleType[]>()

    useEffect(() => {
        setChaptersId(courseModule.filter((chapter) => chapter.courseId == courseModuleId) ?? null)
    }, [])

    if (!chaptersId) {
        return null;
    }

    return (
        <div>
            {chaptersId.map(chapter =>
                <DropdownChapter key={chapter.id} contents={chapter} />
            )}
        </div>
    )
}
