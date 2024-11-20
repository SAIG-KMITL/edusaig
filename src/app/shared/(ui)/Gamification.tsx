import { PointStreakType } from "@/types/pointStreak.type";
import HeaderPage from "@/components/HeaderPage/HeaderPage";
import PointStreak from "@/components/PointStreak/PointStreak";

export default function GamificationUI({
    userPointStreak
}: {
    userPointStreak: PointStreakType[];
}) {

    return (
        <div className="flex flex-col p-8 space-y-8 bg-slate-200">
            <HeaderPage namePage="Point"/>
            <PointStreak userPointStreak={userPointStreak}/>

            {/* Skeleton Code for Rewards and Redeemed Rewards */}
            <div className="flex flex-col">
                <div className="flex justify-start items-center p-2 space-x-2 text-2xl font-medium text-black">
                    <div className="w-2 h-4 bg-black"></div>
                    <div>Rewards</div>
                </div>
                <div className="w-full h-48 border-2 border-slate-500 rounded-2xl">
                    
                </div>
            </div>
            <div className="flex flex-col">
                <div className="flex justify-start items-center p-2 space-x-2 text-2xl font-medium text-black">
                    <div className="w-2 h-4 bg-black"></div>
                    <div>Redeemed Rewards</div>
                </div>
                <div className="w-full h-48 border-2 border-slate-500 rounded-2xl">

                </div>
            </div>
        </div>
    );
}