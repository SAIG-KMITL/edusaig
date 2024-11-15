import { RoadMapCardProps } from "@/components/Cards/RoadMapCard";
import { courses } from "./course";

export const roadmap: RoadMapCardProps[] = [
  {
    number: 1,
    data: courses[0],
    position: "left",
  },
  {
    number: 2,
    data: courses[1],
    position: "right",
  },
  {
    number: 3,
    data: courses[2],
    position: "left",
  },
  {
    number: 4,
    data: courses[3],
    position: "right",
  },
  {
    number: 5,
    data: courses[4],
    position: "left",
  },
];