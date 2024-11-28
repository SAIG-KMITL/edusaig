import { fetchRewardAction } from "@/actions/rewardAction";
import EditRewardUI from "@/app/shared/(ui)/EditRewardUI";

interface EditRewardPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditRewardPage({ params }: EditRewardPageProps) {
  const { id } = await params;

  const rewardsResponse = await fetchRewardAction(id);
  if(!rewardsResponse.data) {
    return ;
  }

  return <EditRewardUI reward={rewardsResponse.data}/>
}