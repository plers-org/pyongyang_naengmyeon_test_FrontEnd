import { CircleGraph, type CircleGraphColor } from "./CircleGraph";

export type CircleProgressProps = {
  label: string;
  current: number;
  total?: number;
  color?: CircleGraphColor;
};

export function CircleProgress({
  label,
  current,
  total = 5,
  color,
}: CircleProgressProps) {
  return (
    <div className="inline-flex items-center justify-center gap-2">
      <span className="w-[60px] text-caption2 text-neutral-60">{label}</span>
      <CircleGraph current={current} total={total} color={color} />
      <span className="w-[51px] text-right text-caption3 text-neutral-80">
        {current} / {total}
      </span>
    </div>
  );
}
