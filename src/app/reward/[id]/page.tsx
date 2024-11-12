import RewardDetailUI from "@/app/shared/(ui)/RewardDetailUI"

export default async function RewardDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  return <RewardDetailUI rewardId={id}/>
}