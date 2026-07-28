export type CircleGraphColor = "warmGray" | "orange" | "green" | "blue";

export type CircleGraphProps = {
  current: number;
  total?: number;
  color?: CircleGraphColor;
};

const COLOR_STYLES: Record<
  CircleGraphColor,
  { filled: string; empty: string }
> = {
  warmGray: { filled: "bg-warm-gray-60", empty: "bg-warm-gray-20" },
  orange: { filled: "bg-orange-60", empty: "bg-orange-20" },
  green: { filled: "bg-green-40", empty: "bg-green-20" },
  blue: { filled: "bg-blue-40", empty: "bg-blue-10" },
};

export function CircleGraph({
  current,
  total = 5,
  color = "warmGray",
}: CircleGraphProps) {
  const { filled, empty } = COLOR_STYLES[color];

  return (
    <div
      className="inline-flex items-center gap-3"
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={total}
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`size-6 shrink-0 rounded-full ${i < current ? filled : empty}`}
        />
      ))}
    </div>
  );
}
