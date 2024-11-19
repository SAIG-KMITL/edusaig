"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { chapters } from "@/constants/chapter"
import { ChapterType } from "@/types/chapter.type"
import { CourseModuleType } from "@/types/course.type"
import Link from "next/link"

export default function DropdownChapter(
    {
        contents
    }: {
        contents: CourseModuleType
    }
) {
    const [isOpen, setIsOpen] = useState<Boolean>(false)
    const [dataChapters, setDataChapters] = useState<ChapterType[]>([])
    const [dataContents] = useState<any>(contents)

    useEffect(() => {
        setDataChapters(chapters.filter(chapter => contents.id.includes(chapter.courseModuleId)))
    }, [contents])

    const ToggleDrop = () => {
        setIsOpen(!isOpen)
    }

    if (!contents || !dataChapters) {
        return null
    }

    return (
        <div className="p-3">
            {isOpen ?

                <div>
                    <div className="flex justify-between items-center p-4 cursor-pointer border-b shadow rounded-full" onClick={ToggleDrop}>
                        <div className="font-semibold text-lg mx-3">{dataContents.title}</div>
                        <Image
                            src="/icons/up-arrow.svg"
                            width={8}
                            height={8}
                            alt="up-arrow icon"
                            className="mr-[3px]"
                        />
                    </div>

                    {dataChapters.map(dataChapter =>
                        <div className="flex justify-between border-b" key={dataChapter.id}>
                            <input type="checkbox" className=" flex justify-center items-center w-[20px] md:ml-4 sm:ml-12 ml-6"/>
                            <Link className="w-5/6 flex border rounded-full p-3 px-6 mb-3 hover:bg-slate-100 mt-2" href={{
                                pathname: `/course/chapter/${dataChapter.id}`,
                                query: { courseId: contents.courseId }
                            }}>
                                {dataChapter.content}
                            </Link>
                        </div>
                    )}
                </div>
                :
                <div className="flex justify-between items-center p-4 cursor-pointer shadow rounded-full" onClick={ToggleDrop}>
                    <h1 className="font-semibold text-lg mx-3">{dataContents.title}</h1>
                    <Image
                        src="/icons/dropdown-arrow.svg"
                        width={15}
                        height={15}
                        alt="dropdown-arrow icon"
                        className=""
                    />
                </div>
            }

        </div>
    )
}
