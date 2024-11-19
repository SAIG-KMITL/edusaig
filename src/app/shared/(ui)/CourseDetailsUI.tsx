"use client"

import { CourseType } from "@/types/course.type"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CourseDetailsCard from "@/components/Cards/CourseDetailsCard";
import Image from "next/image";
import SidebarChapter from "@/components/Navbar/SidebarChapter";
import Link from "next/link";

export default function CourseDetailsUI({
    courses
}: {
    courses: CourseType[];
}) {
    const [course, setCourse] = useState<CourseType | null>(null);
    const params = useParams()

    useEffect(() => {
        setCourse(courses.find((course) => course.id == params.id) ?? null)
    }, [params.id])

    if (!course) {
        return null
    }

    console.log(course)

    return (
        <div>
            <div className="flex justify-center mb-8">
                <div className="w-[1080px] text-white md:flex mt-24">
                    <div className="absolute top-[120px] w-[360px] h-[40px]">
                        <div className="flex">
                            <Link href={`/course`} className="text-black px-6 py-2 flex h-full justify-center items-center bg-slate-200 rounded-full">
                                <Image
                                    src="/icons/left-arrow.svg"
                                    width={15}
                                    height={15}
                                    alt="left-arrow icon"
                                    className="mr-[6px]"
                                />
                                Back
                            </Link>
                        </div>
                    </div>
                    <div className="flex justify-center mb-6">
                        <div>
                            <Image
                                src={course.thumbnail}
                                height={230}
                                width={400}
                                alt="thumbnail"
                                className="object-cover rounded-2xl"
                            />
                            <div className="flex mx-3 mt-5">
                                <Image
                                    src="/icons/book-white.svg"
                                    height={25}
                                    width={25}
                                    alt="book icon"
                                    className="mr-3"
                                />
                                <div>

                                    {course.category}
                                </div>
                            </div>
                            <div className="flex mx-3 mt-4 mb-5">
                                <Image
                                    src="/icons/clock-white.svg"
                                    height={25}
                                    width={25}
                                    alt="clock icon"
                                    className="mr-3"
                                />
                                <div className="">
                                    {course.duration} mins
                                </div>
                            </div>
                            <div className="rounded-full bg-white text-black items-center justify-center flex py-3 mx-3 cursor-pointer">Enroll Now</div>
                        </div>
                    </div>
                    <div className="md:w-2/3 md:ml-[70px] flex 2xl:hidden justify-center">
                        <div className="grid grid-cols-1 gap-8">
                            <div>
                                <div className="flex items-center">
                                    <div className="text-2xl mr-8">{course.title}</div>
                                    <div className="text-gray-400">by {course.teacher}</div>
                                </div>
                                <div className="border rounded-xl p-[25px] mt-1">
                                    {course.description}. Popular programming language courses, tutorials, programming certifications, and coding boot camps on the web offer a wealth of resources designed to keep you on top of your game.
                                </div>
                            </div>
                            <div>
                                <div className="text-2xl">Contents</div>
                                <div className="border rounded-xl mt-1">
                                    <SidebarChapter courseModuleId={course.id} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
