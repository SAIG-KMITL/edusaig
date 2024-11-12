"use client"

import Navbar from "@/components/Navbar/Navbar"
import Footer from "@/components/Navbar/Footer"
import { CourseType } from "@/types/course.type"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CourseDetailsCard from "@/components/Cards/CourseDetailsCard";
import Image from "next/image";
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
        <>
            <Navbar />
            <div>
                <div className="pl-10 absolute flex">
                    <Image
                        src="/icons/arrowright.svg"
                        width={15}
                        height={15}
                        alt="arrow-right icon"
                    />
                    <Link href={"/course"} className="px-2 hover:underline font-bold">Course</Link>
                    <Image
                        src="/icons/arrowright.svg"
                        width={15}
                        height={15}
                        alt="arrow-right icon"
                    />
                    <Link href={`/course/${params.id}`} className="px-2 hover:underline font-bold">{course.title}</Link>
                </div>
                <div className='flex justify-center grid gap-8 mt-5'>
                    <div className='lg:grid grid-cols-2 gap-8 lg:w-[1080px]'>
                        <div className='flex-none lg:flex pt-[48px] lg:w-[600px] w-[720px]'>
                            <div className='flex pr-8 justify-center'>
                                <img className='w-[560px] h-[320px] lg:w-[250px] lg:h-[160px] border rounded object-cover' src={course.thumbnail} alt={course?.title} />
                            </div>
                            <div className='w-fit'>
                                <div className="flex items-center lg:justify-between">
                                    <p className='text-[28px] font-bold'>{course.title}</p>
                                    <div className='border rounded inline px-2 bg-green-200 font-semibold ml-3'>{course.level}</div>
                                </div>
                                <p className='mb-1'>{course.description}. I will teach you about the fundamental function and syntax that MUST know.</p>
                                {/* เติมมาเพื่อลองว่ามันขึ้นบรรทัดใหม่ไหม เฉย ๆ */}
                                <div className='mt-2 flex'>
                                    <Image
                                        src="/icons/teacher.svg"
                                        width={20}
                                        height={20}
                                        alt="translate icon"
                                        className="absolute"
                                    />
                                    <div className="ml-2 text-gray-800 grid ml-7">
                                        <p className="font-semibold">Teacher</p>
                                        <p>{course.teacher}</p>
                                    </div>
                                </div>
                                <div className='mt-2 flex items-center'>
                                    <Image
                                        src="/icons/clock.svg"
                                        width={20}
                                        height={20}
                                        alt="translate icon"
                                    />
                                    <p className="ml-2 text-gray-600">{course.duration} mins</p>
                                </div>
                                <div className='mt-2 flex items-center'>
                                    <Image
                                        src="/icons/translate.svg"
                                        width={20}
                                        height={20}
                                        alt="translate icon"
                                    />
                                    <p className="ml-2 text-gray-600">Speaks English (Native)</p>
                                </div>
                                <div className="my-5 block lg:hidden">
                                    <Link href={""} className="flex justify-center border bg-pink-400 font-bold py-2 rounded border-black border-[3px] hover:bg-pink-300">Subscribe</Link>
                                </div>
                            </div>
                        </div>
                        <div className="justify-center py-5  hidden lg:flex">
                            <CourseDetailsCard key={course.id} data={course} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
