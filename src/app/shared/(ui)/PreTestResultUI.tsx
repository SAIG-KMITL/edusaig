"use client"

import { exam, examAttempt } from "@/constants/exam";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react"
import { useParams } from "next/navigation";
import { courses } from "@/constants/course";
import { CourseType } from "@/types/course.type";
import { motion } from "framer-motion";
import { roadmap } from "@/constants/roadmap";
import { RoadMapCardResult } from "@/components/Cards/RoadMapCardResult";

export default function PreTestResultUI() {
    const [course, setCourse] = useState<CourseType>()

    const param = useParams()

    useEffect(() => {
        setCourse(courses.find(item => item.id == param.id))
    }, [])

    const calTimeInterval = (startedAt: string, submittedAt: string): string => {
        const differenceInMilliseconds = new Date(submittedAt).getTime() - new Date(startedAt).getTime();
        const totalSeconds = Math.floor(differenceInMilliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        return formattedTime;
    }

    return (
        <div className="text-white mx-6 sm:mx-16 lg:mx-[120px] my-12 flex flex-col gap-2">
            <div className="absolute top-[80px] sm:left-10 flex items-center">
                <Link href={`/course/${course?.id}`} className="px-6 py-2 flex h-full justify-center items-center bg-royalPurple/20 hover:bg-royalPurple/30 rounded-full">
                    <ChevronLeft className="mr-2 w-5 h-5" />
                    Back
                </Link>
                <div className="ml-10 text-xl font-semibold">{course?.title}</div>
            </div>
            <h1 className="text-[24px] mt-4">{exam.title}</h1>
            <div className="p-6 flex flex-col md:flex-row items-center md:items-stretch gap-8 border border-electricViolet/95 rounded-xl">
                <div className="w-full md:w-[180px] lg:w-[264px] flex flex-col justify-between items-center">
                    <div className="w-full p-6 flex flex-col items-center gap-1 border border-electricViolet/50 rounded-xl">
                        <p className="text-[20px] font-medium">Result</p>
                        <p className="py-4 md:py-2 lg:py-4 text-[32px] font-semibold">{`${Math.round(examAttempt.score)}%`}</p>
                        <p className="text-[14px]">You have earned</p>
                        <p className="-mt-2 text-[14px] text-center">
                            <span className="text-[18px] font-medium">{Math.round(examAttempt.score / 100 * exam.questions.length)}</span> points of total <span className="text-[18px] font-medium">{exam.questions.length}</span> points
                        </p>
                        <div className="pt-3 flex flex-row items-baseline gap-2 text-[14px]">
                            <p>Time spent: </p>
                            <p className="text-[18px] font-medium">{calTimeInterval(examAttempt.startedAt, examAttempt.submittedAt)}</p>
                        </div>
                    </div>
                    <Link
                        href={""}
                        className="hidden md:block px-8 py-3 bg-darkMagenta hover:bg-darkMagenta/90 rounded-full"
                    >Done</Link>
                </div>
                <div className="w-full grid grid-cols-1 gap-4">
                    <div className="md:flex-1 p-6 flex flex-col items-start gap-6 border border-electricViolet/50 rounded-xl">
                        <div className="px-4 p-2 flex flex-row gap-2 items-center bg-royalPurple rounded-full">
                            <Image
                                src={"/icons/robot.svg"}
                                width={24}
                                height={24}
                                alt="robot icon"
                                className="object-cover"
                            />
                            <p>Review you</p>
                        </div>
                        <p className="w-full min-h-32">ai recommend from final exam</p>
                    </div>
                    <div className="md:flex-1 p-6 flex flex-col items-start border border-electricViolet/50 rounded-xl">
                        <div className="px-4 p-2 flex flex-row gap-2 items-center bg-darkMagenta rounded-full">
                            <Image
                                src={"/icons/robot.svg"}
                                width={24}
                                height={24}
                                alt="robot icon"
                                className="object-cover"
                            />
                            <p>Road map</p>
                        </div>
                        <div className="relative max-w-[1200px] w-[250px] h-full p-5 py-6">
                            <motion.div
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{ duration: 1 }}
                                className="absolute w-[6px] bg-gradient-to-b from-electricViolet via-skyBlue to-royalPurple rounded-full top-10 bottom-0 ml-[-3px]"
                            />
                            {roadmap.map((item, index) => (
                                <RoadMapCardResult
                                    key={index}
                                    number={item.number}
                                    data={item.data}
                                    position="right"
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <Link
                    href={""}
                    className="md:hidden px-8 py-3 bg-darkMagenta hover:bg-darkMagenta/90  rounded-full"
                >Done</Link>
            </div>
        </div>
    );
}