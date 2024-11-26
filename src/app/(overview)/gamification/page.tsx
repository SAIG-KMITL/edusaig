import { fetchUserAction } from "@/actions/userAction";
import { fetchUserStreakAction } from "@/actions/userStreakAction";
import GamificationUI from "@/app/shared/(ui)/Gamification";
import { userPointStreak } from "@/constants/pointStreak";

export default async function GamificationPage() {
  const user = await fetchUserAction();
  const userStreak = await fetchUserStreakAction();

  const userPointStreak = {
    streak: userStreak.data ?? [],
    point: user.data?.points ?? 0,
  };

  return <GamificationUI userPointStreak={userPointStreak} />;
}
