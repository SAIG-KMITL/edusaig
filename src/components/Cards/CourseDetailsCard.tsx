import { CourseType } from "@/types/course.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CourseCardProps {
    data: CourseType;
}

const CourseDetailsCard: React.FC<CourseCardProps> = ({ data }) => {

    return (
            <div className="border drop-shadow-md bg-white w-[400px] rounded-md overflow-hidden">
                <div className="relative aspect-video h-48 w-full">
                    <Image
                        src={data.thumbnail}
                        alt={data.title}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="p-4 pt-2 flex flex-col">
                    <div className="flex justify-between items-center">
                        {data.price == 0 ?
                            <h1 className="text-[32px] font-bold">Free</h1>
                            :
                            <h1>{data.price}</h1>
                        }
                        <p className="font-bold text-gray-500 text-lg">{data.duration} mins</p>
                    </div>
                    <h2 className="text-xl font-semibold text-black">{data.title}</h2>
                    <p className="text-gray-500">{data.teacher}</p>
                    <div className="flex flex-col mt-2 text-sm mb-2">
                        <p className="text-gray-500 line-clamp-1">{data.description}</p>
                        <p className="text-gray-500">{data.level}</p>
                    </div>
                    <Link href={""} className="flex justify-center border bg-pink-400 font-bold py-2 rounded border-black border-[3px] hover:bg-pink-300">Subscribe</Link>
                </div>
            </div>
    );
};

export default CourseDetailsCard;
