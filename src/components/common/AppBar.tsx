import { ChevronLeft } from "../icons/ChevronLeft";

export function AppBar() {
  return (
    <div className="flex w-[375px] items-center bg-white">
      <button className="flex h-[35.996px] pr-2 pl-3 justify-center items-center">
        <ChevronLeft />
      </button>
    </div>
  );
}
