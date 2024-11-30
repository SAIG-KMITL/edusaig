import { fetchUserAction } from "@/actions/userAction";
import { fetchUserStreakAction } from "@/actions/userStreakAction";
import GamificationUI from "@/app/shared/(ui)/GamificationUI";
import { userPointStreak } from "@/constants/pointStreak";

export default async function GamificationPage() {
  const user = await fetchUserAction();
  const userStreak = await fetchUserStreakAction();
  const streak = userStreak.data?.length ?? 0;

  const userPointStreak = {
    point: user.data?.points ?? 0,
    streak: streak,
    lastActivityDate: userStreak.data?.[streak - 1]?.lastActivityDate ?? "",
  };

  return <GamificationUI userPointStreak={[userPointStreak]} />;
}
