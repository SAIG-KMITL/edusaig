"use client";

import { PointStreakType } from "@/types/pointStreak.type";
import HeaderPage from "@/components/HeaderPage/HeaderPage";
import PointStreak from "@/components/PointStreak/PointStreak";

export default function GamificationUI({
  userPointStreak,
}: {
  userPointStreak: PointStreakType;
}) {
  return (
    <div className="flex flex-col px-24 py-8 space-y-8">
      <HeaderPage namePage="Point" />
      <PointStreak userPointStreak={userPointStreak} />

      {/* Skeleton Code for Rewards and Redeemed Rewards */}
      <div className="flex flex-col">
        <div className="flex justify-start items-center p-2 space-x-2 text-2xl font-medium text-black">
          <div className="w-2 h-4 bg-slate-100"></div>
          <div className="text-slate-100">Rewards</div>
        </div>
        <div className="w-full h-48 border-2 border-slate-100 rounded-2xl"></div>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-start items-center p-2 space-x-2 text-2xl font-medium text-black">
          <div className="w-2 h-4 bg-slate-100"></div>
          <div className="text-slate-100">Redeemed Rewards</div>
        </div>
        <div className="w-full h-48 border-2 border-slate-100 rounded-2xl"></div>
      </div>
    </div>
  );
}
