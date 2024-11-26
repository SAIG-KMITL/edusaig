import { fetchRewardAction } from "@/actions/rewardAction";
import RewardDetailUI from "@/app/shared/(ui)/RewardDetailUI";

interface RewardDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function RewardDetailPage({
  params,
}: RewardDetailPageProps) {
  const { id } = await params;

  const reward = await fetchRewardAction(id);

  if (!reward.data) {
    return <div>No data</div>;
  }

  return <RewardDetailUI reward={reward.data} />;
}
