import RewardCard from "@/components/Cards/RewardCard";
import { rewards } from "@/constants/reward";

export default function RewardUI() {
  return (
    <div className="bg-[#f1f1f1]">
      <div  className="w-[984px] mx-auto py-9 flex flex-row gap-12 gap-y-9 flex-wrap">
        {
          rewards.map((reward, index) => {
            return <RewardCard key={index} reward={reward}/>
          })
        }
      </div>
    </div>
  )
}
