"use client";

import { exam, examAttempt } from "@/constants/exam";
import Image from "next/image";
import Link from "next/link";

export default function ExamResultUI() {
  const calTimeInterval = (startedAt: string, submittedAt: string): string => {
    const differenceInMilliseconds = new Date(submittedAt).getTime() - new Date(startedAt).getTime();
    const totalSeconds = Math.floor(differenceInMilliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    return formattedTime;
  }

  return (
    <div className="mx-6 sm:mx-16 lg:mx-[120px] my-12 flex flex-col gap-2">
      <h1 className="text-[24px]">{exam.title}</h1>
      <div className="p-6 flex flex-col md:flex-row items-center md:items-stretch gap-8 border border-gray-300 rounded-xl">
        <div className="w-full md:w-[180px] lg:w-[264px] flex flex-col justify-between items-center">
          <div className="w-full p-6 flex flex-col items-center gap-1 border border-gray-300 rounded-xl">
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
            className="hidden md:block px-8 py-3 bg-gray-300 hover:bg-gray-400 rounded-full"
          >Done</Link>
        </div>
        <div className="w-full md:flex-1 p-6 flex flex-col items-start gap-6 border border-gray-300 rounded-xl">
          <div className="px-4 p-2 flex flex-row gap-2 items-center bg-gray-300 rounded-full">
            <Image 
              src={"/icons/robot.svg"}
              width={24}
              height={24}
              alt="robot icon"
              className="object-cover"
            />
            <p>recommend</p>   
          </div>
          <p className="w-full min-h-72">ai recommend from final exam</p>
        </div>
        <Link
          href={""}
          className="md:hidden px-8 py-3 bg-gray-300 hover:bg-gray-400 rounded-full"
        >Done</Link>
      </div>
    </div>
  );
}