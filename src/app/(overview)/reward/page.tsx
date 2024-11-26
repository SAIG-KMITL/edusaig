import { fetchRewardsAction } from "@/actions/rewardAction";
import { fetchUserAction } from "@/actions/userAction";
import { fetchUserStreakAction } from "@/actions/userStreakAction";
import RewardUI from "@/app/shared/(ui)/RewardUI";

export default async function RewardPage() {
  const rewards = await fetchRewardsAction();
  const user = await fetchUserAction();
  const userStreak = await fetchUserStreakAction();

  const userPointStreak = {
    streak: userStreak.data ?? [],
    point: user.data?.points ?? 0,
  };

  if (!rewards.data) {
    return null;
  }

  return <RewardUI rewards={rewards.data} userPointStreak={userPointStreak} />;
}
