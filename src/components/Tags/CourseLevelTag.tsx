import { CourseLevelType } from "@/types/course.type";
import Tag from "./Tag";

interface CourseLevelTagProps {
  level: CourseLevelType;
  className?: string;
}

const decorations: { [key in CourseLevelType]: string } = {
  beginner: "border-beginner text-beginner", 
  intermediate: "border-intermediate text-intermediate", 
  advanced: "border-advanced text-advanced",
};

export default function CourseLevelTag({ level, className }: CourseLevelTagProps) {
  return (
    <Tag className={`text-xs ${className} ${decorations[level]}`}>{level.charAt(0).toUpperCase() + level.slice(1)}</Tag>
  );
}
