interface TagProps {
  className?: string;
  children: React.ReactNode;
}

export default function Tag({ className, children }: TagProps) {
  return (
    <span className={`py-1 px-3 rounded-full font-light border ${className}`}>{children}</span>
  );
}
