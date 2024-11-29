import Tag from "./Tag";

interface CourseCategoryTagProps {
  category: string;
  className?: string;
}

export default function CourseCategoryTag({ category, className }: CourseCategoryTagProps) {
  return (
    <Tag className={`border-skyBlue text-skyBlue text-xs ${className}`}>{category}</Tag>
  );
}
