import { CourseLevel } from "@/types/course.type";

interface CourseLevelTagProps {
  level: CourseLevel
}

const decorations: { [key in CourseLevel]: string } = {
  beginner: "border-beginner text-beginner", 
  intermediate: "border-intermediate text-intermediate", 
  advanced: "border-advanced text-advanced",
};

export default function CourseLevelTag({ level }: CourseLevelTagProps) {
  return (
    <span className={`py-1 px-3 rounded-full text-xs font-light border ${decorations[level]}`}>{level}</span>
  );
}
