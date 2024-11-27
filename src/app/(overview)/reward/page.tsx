import { fetchRewardsAction } from "@/actions/rewardAction";
import { fetchUserAction } from "@/actions/userAction";
import { fetchUserStreakAction } from "@/actions/userStreakAction";
import RewardUI from "@/app/shared/(ui)/RewardUI";

export default async function RewardPage() {
  const rewards = await fetchRewardsAction();
  const user = await fetchUserAction();
  const userStreak = await fetchUserStreakAction();
  const streak = userStreak.data?.length ?? 0;

  const userPointStreak = {
    point: user.data?.points ?? 0,
    streak: streak,
    lastActivityDate: userStreak.data?.[streak - 1]?.lastActivityDate ?? "",
  };

  if (!rewards.data) {
    return null;
  }

  return <RewardUI rewards={rewards.data} userPointStreak={userPointStreak} />;
}
