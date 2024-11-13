import RewardDetailUI from "@/app/shared/(ui)/RewardDetailUI";

interface RewardDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function RewardDetailPage({ params }: RewardDetailPageProps) {
  const { id } = await params;
  return <RewardDetailUI rewardId={id} />;
}
