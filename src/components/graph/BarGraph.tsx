export type BarGraphProps = {
  value: number;
  max?: number;
  className?: string;
};

export function BarGraph({ value, max = 6, className }: BarGraphProps) {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      className={[
        "h-1.5 w-[288px] shrink-0 items-center overflow-hidden rounded-full bg-orange-20",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div
        className="h-full rounded-full bg-orange-70 transition-[width]"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
