import { fetchRewardsAction } from "@/actions/rewardAction";
import RewardUI from "@/app/shared/(ui)/RewardUI";

export default async function RewardPage() {
  const rewards = await fetchRewardsAction();

  if (!rewards.data) {
    return null;
  }

  return <RewardUI rewards={rewards.data} />;
}
