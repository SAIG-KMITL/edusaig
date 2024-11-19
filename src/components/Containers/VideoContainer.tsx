import { chapters } from "@/constants/chapter"
import { useState, useEffect } from "react"
import { ChapterType } from "@/types/chapter.type"
import { useSearchParams } from "next/navigation"
import { courses } from "@/constants/course"
import { CourseType } from "@/types/course.type"
import Link from "next/link"
import Image from "next/image"

export default function VideoContainer({
    chapterId
}: {
    chapterId: string[] | undefined | string
}) {
    const [detail, setDetail] = useState<ChapterType>()
    const [course, setCourse] = useState<CourseType>()
    const courseId = useSearchParams()

    useEffect(() => {
        setDetail(chapters.find((chapter) => chapter.id == chapterId))
        setCourse(courses.find((item) => item.id == courseId.get('courseId')?.toString()))
    }, [chapterId])

    if (!detail) {
        return null;
    }

    return (
        <div>
            <div className="absolute top-[120px] w-[698px] h-[40px]">
                <div className="flex">
                    <Link href={`/course/${courseId.get('courseId')}`} className="px-6 py-2 flex h-full justify-center items-center bg-slate-200 rounded-full">
                        <Image
                            src="/icons/left-arrow.svg"
                            width={15}
                            height={15}
                            alt="left-arrow icon"
                            className="mr-[6px]"
                        />
                        Back
                    </Link>
                    <div className="flex items-center justify-center text-[24px] pl-8">{detail.title}</div>
                </div>
            </div>
            <iframe className="aspect-video w-full rounded-3xl" src={detail.videoUrl} />
            <div className="grid grid-cols-1 gap-8 pt-5 px-4">
                <div className="flex">
                    <div className="w-3/5">
                        <div className="text-[24px]">{detail.content}</div>
                        <div className="text-gray-500">by {course?.teacher}</div>
                        <Link className="mt-2 underline underline-offset-2" href={""}>book file</Link>
                    </div>
                    <div className="w-2/5 grid gap-4">
                        <Link href={""} className="py-2 sm:ml-8 rounded-full bg-slate-200 items-center justify-center flex">
                        <Image
                            src="/icons/book.svg"
                            width={15}
                            height={15}
                            alt="book icon"
                            className="mr-[6px]"
                        />
                            Conclusion
                            </Link>
                        <Link href={""} className="py-2 sm:ml-8 rounded-full bg-slate-200 items-center justify-center flex">
                        <Image
                            src="/icons/teacher.svg"
                            width={15}
                            height={15}
                            alt="teacher icon"
                            className="mr-[6px]"
                        />
                            Ask Question
                            </Link>
                    </div>
                </div>
                <div className="text-[20px] pb-4">{detail.description}</div>
            </div>
        </div>
    )
}
