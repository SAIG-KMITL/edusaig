import starPoint from "@/../public/ulits/star-point.svg";
import fillCheck from "@/../public/ulits/fill-check.svg";
import emptyCheck from "@/../public/ulits/empty-check.svg";
import Image from "next/image";
import { PointStreakType } from "@/types/pointStreak.type";

export default function PointSteak({
    userPointStreak
}: {
    userPointStreak: PointStreakType[];
}) {
    const point = userPointStreak[0].point;
    const steak = userPointStreak[0].streak;

    const checkIcon = Array.from({ length: 7 }, (_, index) =>
        index < steak ? fillCheck : emptyCheck
      );

    return (
        <div className="flex w-full p-8 rounded-2xl bg-slate-100 bg-opacity-5 backdrop-blur-md">
            <div className="flex w-5/12 h-full">
                <div className="flex flex-col justify-center items-center w-1/2 h-full p-4 space-y-4 border-r-4 border-slate-100">
                    <h2 className="text-2xl font-normal text-slate-100">My Points</h2>
                    <div className="flex space-x-2">
                        <Image
                            alt="Star Point"
                            src={starPoint}
                            width={24}
                            height={24}
                        />
                        <p className="text-xl font-normal text-slate-100">{point} point</p>
                    </div>    
                </div>
                <div className="flex flex-col justify-center items-center w-1/2 h-full p-4 space-y-4">
                    <h2 className="text-2xl font-normal text-slate-100">Streak</h2>
                    <p className="text-2xl font-normal text-slate-100">{steak} days streak</p>
                </div>
            </div>
            <div className="flex justify-center items-center w-7/12 space-x-8">
                {checkIcon.map((icon, index) => (
                <div className="flex flex-col justify-center items-center space-y-4">
                    <h4 className="text-lg font-light text-slate-100">Day {index+1}</h4>
                    <Image
                        key={index}
                        src={icon}
                        alt={index < steak ? "Filled Check" : "Empty Check"}
                        width={30}
                        height={30}
                    />
                </div>
                ))}
            </div>
        </div>
    );
}