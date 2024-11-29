import { fetchRoadmapByUserAction } from "@/actions/roadmapAction";
import RoadMapUI from "@/app/shared/(ui)/RoadMapUI";
import RoadmapHero from "@/components/Hero/RoadmapHero";

export default async function RoadMapPage() {
  const roadmap = await fetchRoadmapByUserAction();
  return (
    <>
      {roadmap.data && roadmap.data.data.length > 0 ? (
        <RoadMapUI roadmap={roadmap.data.data} />
      ) : (
        <RoadmapHero />
      )}
    </>
  );
}
