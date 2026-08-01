import { ChevronLeft } from "../icons/ChevronLeft";

export type AppBarProps = {
  onBack?: () => void;
};

export function AppBar({ onBack }: AppBarProps) {
  return (
    <div className="flex w-[375px] items-center bg-white">
      <button
        type="button"
        aria-label="뒤로가기"
        onClick={onBack}
        className="flex h-[35.996px] pr-2 pl-3 justify-center items-center"
      >
        <ChevronLeft />
      </button>
    </div>
  );
}
