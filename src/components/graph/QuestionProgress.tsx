import { BarGraph } from "./BarGraph";

export type QuestionProgressProps = {
  current: number;
  total?: number;
};

export function QuestionProgress({
  current,
  total = 6,
}: QuestionProgressProps) {
  return (
    <div className="flex w-[335px] items-center">
      <BarGraph value={current} max={total} />
      <span className="grow shrink-0 basis-0 text-right text-caption3 text-neutral-80">
        {current} / {total}
      </span>
    </div>
  );
}
