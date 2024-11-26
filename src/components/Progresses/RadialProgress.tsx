interface RadialProgressProps {
  value: number;
  size?: string;
  thickness?: string;
  className?: string;
}

export default function RadialProgress({
  value,
  size,
  thickness,
  className
}: RadialProgressProps) {
  return (
    <div
      className={`radial-progress ${className}`}
      style={{ "--value": `${value}`, "--size": size ?? "48px", "--thickness": thickness ?? "3px" }  as React.CSSProperties }
      role="progressbar"
    >
      {`${value}%`}
    </div>
  );
}
