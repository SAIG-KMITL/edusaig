import { RoadMapCard } from "@/components/Cards/RoadMapCard";
import { roadmap } from "@/constants/roadmap";

export const RoadMapUI = () => {
  return (
    <div className="flex flex-1 flex-col min-h-screen bg-white justify-center items-center">
      <div className="flex items-center justify-start md:justify-center w-full pt-8 px-4 lg:px-8">
        <h1 className="text-blue-400 text-2xl font-bold">Start</h1>
      </div>
      <div className="relative max-w-[1200px] w-full h-full p-4 lg:p-8">
        <div className="absolute w-[6px] bg-blue-400 rounded-full top-10 bottom-0 left-[31px] md:left-1/2 ml-[-3px]"></div>
        {roadmap.map((item, index) => (
          <RoadMapCard
            key={index}
            number={item.number}
            data={item.data}
            position={index % 2 === 0 ? "right" : "left"}
          />
        ))}
      </div>
      <div className="flex items-center justify-start md:justify-center w-full py-9 px-4 lg:px-8">
        <h1 className="text-blue-400 text-2xl font-bold">End</h1>
      </div>
    </div>
  );
};
