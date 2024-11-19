import { CourseLevel } from "@/types/course.type";

interface CourseLevelTagProps {
  level: CourseLevel
}

const color: { [key in CourseLevel]: string } = {
  beginner: "bg-[#4CAF50]", 
  intermediate: "bg-[#FFC107]", 
  advanced: "bg-[#F44336]",
};

export default function CourseLevelTag({ level }: CourseLevelTagProps) {
  return (
    <span className={`py-1 px-2 rounded-sm text-xs font-light ${color["intermediate"]}`}>{level}</span>
  );
}
