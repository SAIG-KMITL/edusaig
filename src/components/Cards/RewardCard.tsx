import { RewardType } from "@/types/reward";
import Image from "next/image";
import Link from "next/link";

interface RewardCardProps {
  reward: RewardType
}

export default function RewardCard({ reward }: RewardCardProps) {
  return (
    <Link 
      href={`/reward/${reward.id}`}
      className="w-[296px] p-2 flex flex-col gap-[6px] leading-[100%] rounded-lg bg-white shadow-card hover:cursor-pointer hover:shadow-card-hover transition-shadow duration-300 ease-out"
    >
        <Image 
          src={reward.thumbnail}
          width={560}
          height={400}
          alt="reward thumbnail"
          className="w-[280px] h-[200px] object-cover rounded-lg"
        />
        <div className="flex flex-col items-start gap-1">
          <div className="w-full flex flex-row justify-between items-baseline">
            <p className="text-[14px]">{reward.name}</p>
            <div className="flex flex-row items-center gap-1">
              <p className="text-[14px]">{reward.points}</p>
              <Image 
                src="/icons/coin.svg"
                width={20}
                height={20}
                alt="coin icon"
              />
            </div>
          </div>
          <p className="px-3 py-[2px] rounded-full text-white text-[12px] bg-gray-400">{reward.type}</p>
        </div>
    </Link>
  );
}