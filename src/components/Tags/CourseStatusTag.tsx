import { CourseStatusType } from "@/types/course.type";
import Tag from "./Tag";

interface CourseStatusTagProps {
  status: CourseStatusType;
  className?: string;
}

const decorations: { [key in CourseStatusType]: string } = {
  draft: "bg-gray-700/40", 
  published: "bg-sky-500/40", 
  archived: "bg-yellow-600/40",
};

export default function CourseStatusTag({ status, className }: CourseStatusTagProps) {
  return (
    <Tag className={`text-white border-0 text-sm font-medium ${className} ${decorations[status]}`}>{status}</Tag>
  );
}
