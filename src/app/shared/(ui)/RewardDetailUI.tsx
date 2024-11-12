"use client";

import { rewards } from "@/constants/reward";
import { RewardType } from "@/types/reward";
import Image from "next/image";
import { useEffect, useState } from "react";

interface RewardDetailProps {
  rewardId: string;
}

export default function RewardDetailUI({ rewardId }: RewardDetailProps) {
  const [reward, setReward] = useState<RewardType | null>(null);

  useEffect(() => {
    setReward(rewards.find((reward) => reward.id == rewardId) ?? null);
  }, [rewardId]);

  if (!reward) {
    return null;
  }

  return (
    <div className="py-12 bg-[#f1f1f1]">
      <div className="flex flex-row justify-center gap-12">
        <div className="w-[500px]">
          <Image
            src={reward.thumbnail}
            width={468}
            height={350}
            alt="reward thumbnail"
            className="w-full h-[350px] p-4 rounded-lg  bg-white object-cover shadow-card"
          />
        </div>
        <div className="w-[400px] flex flex-col items-start gap-6">
          <div className="flex flex-col items-start gap-1">
            <h1 className="text-[36px] font-semibold leading-[100%]">
              {reward.name}
            </h1>
            <p className="px-3 py-[2px] rounded-full text-white bg-gray-400">
              {reward.type}
            </p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-[28px] font-semibold">{reward.points}</p>
            <Image
              src="/icons/coin.svg"
              width={24}
              height={24}
              alt="coin icon"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-[20px] font-medium leading-[100%]">
              Description
            </p>
            <p className="text-[14px] text-gray-400">{reward.description}</p>
          </div>
          <button
            type="button"
            className="py-2 w-full flex flex-row justify-center items-center gap-1 rounded-lg bg-gray-800"
          >
            <p className="text-[20px] text-white font-medium">Redeem</p>
            <Image
              src="/icons/present.svg"
              width={24}
              height={24}
              alt="present icon"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
