import { CourseResponseType, CourseType } from "@/types/course.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CourseLevelTag from "../Tags/CourseLevelTag";
import ActionButton, { ActionButtonEntryType } from "../Button/ActionButton";
import { PencilIcon, Trash, Wrench } from "lucide-react";
import { courses } from "@/constants/course";
import { handleOpenModal } from "@/lib/modal";

interface CourseCardProps {
  course: CourseResponseType;
  showOptionButton?: boolean;
  handleCourseSelected?: (course: CourseResponseType) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, showOptionButton, handleCourseSelected }) => {
  if(!course) {
    return null;
  }
  const actionButtonEntries: ActionButtonEntryType[] = [
    {
      label: "Manage Course Module",
      icon: <Wrench className="w-[14px] h-[14px] mr-2" />,
      type: "link",
      href: `/dashboard/course/${course.id}/course-module`,
    },
    {
      label: "Edit Course",
      icon: <PencilIcon className="w-[14px] h-[14px] mr-2" />,
      type: "link",
      href: `/dashboard/course/${course.id}/edit-course`,
    },
    {
      label: "Delete Course",
      icon: <Trash className="w-[14px] h-[14px] mr-2" />,
      type: "button",
      onClick: () => {
        handleCourseSelected?.(course);
        handleOpenModal("delete-course-modal");
      },
    },
  ];

  return (
    <div className="relative">
      <div className="relative gradient-border p-2 rounded-2xl bg-gradient-to-t from-white/5 to-white/25 hover:to-white/30">
        <Link
          href={`/course/${course.id}`}
          className="absolute top-0 bottom-0 left-0 right-0 z-[1]"
        ></Link>
        <div className="relative aspect-video h-48 w-full">
          <Image
            src={"https://img-b.udemycdn.com/course/750x422/3173974_b870_4.jpg"}
            alt={course.title}
            fill
            className="rounded-xl object-cover"
          />
          <div className="absolute right-2 bottom-2 flex flex-row-reverse gap-2">
            <span className="py-1 px-2 rounded-sm bg-gray-800 bg-opacity-50 text-sm font-medium text-white">{`${course.duration} mins`}</span>
            <span className="py-1 px-2 rounded-sm bg-gray-800 bg-opacity-50 text-sm font-medium text-white">{`$${course.price}`}</span>
          </div>
        </div>
        <div className="relative pt-2 flex flex-row items-start gap-2">
          <Image
            src={"/pictures/profile-picture-01.svg"}
            width={32}
            height={32}
            alt="teacher profile image"
          />
          <div className="flex-1 pt-1 flex flex-col gap-2 overflow-x-visible">
            <h2 className="text-lg font-semibold leading-[100%] text-white">
              {course.title}
            </h2>
            <p className="text-sm  leading-[100%] text-silver">
              {course.teacher.fullname}
            </p>
            <div className="-ml-3 flex flex-row gap-2 flex-wrap">
              <CourseLevelTag level={course.level} />
              <span className="py-1 px-3 rounded-full border border-skyBlue text-xs text-skyBlue font-light">
                {course.category.title}
              </span>
            </div>
          </div>
        </div>
      </div>
      {showOptionButton && (
        <div className="absolute top-[204px] right-1">
          <ActionButton
            entries={actionButtonEntries}
            buttonClassName={"relative z-[2]"}
            popupClassName={"w-[220px]"}
            popupPosition={"right-0 bottom-[100%]"}
          />
        </div>
      )}
    </div>
  );
};

export default CourseCard;
