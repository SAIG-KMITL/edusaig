import { fetchRoadmapByUserAction } from "@/actions/roadmapAction";
import RoadMapUI from "@/app/shared/(ui)/RoadMapUI";

export default async function RoadMapPage() {
  const roadmap = await fetchRoadmapByUserAction();
  return <>{roadmap.data && <RoadMapUI roadmap={roadmap.data.data} />}</>;
}
