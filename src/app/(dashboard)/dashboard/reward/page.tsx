import { fetchRewardsAction } from "@/actions/rewardAction";
import RewardDashboardUI from "@/app/shared/(ui)/RewardDashboardUI";

export default async function RewardDashboardPage() {
  const rewardsResponse = await fetchRewardsAction();
  if(!rewardsResponse.data?.data) {
    return null;
  }

  return <RewardDashboardUI rewards={rewardsResponse.data.data}/>
}
