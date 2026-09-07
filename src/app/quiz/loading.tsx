import { AppBar } from "@/components/common/AppBar";
import { Skeleton } from "@/components/common/Skeleton";

export default function Loading() {
  return (
    <main className="flex flex-col min-h-screen pt-11 pb-15">
      <AppBar />
      <div className="flex flex-col px-5 pt-3">
        <div className="flex w-[335px] items-center">
          <Skeleton className="h-1.5 w-71.75 shrink-0 rounded-full" />
          <Skeleton className="ml-3 h-3.5 w-8 shrink-0 rounded" />
        </div>
        <Skeleton className="mt-5 h-3.5 w-6 rounded" />
        <div className="mt-3 flex h-32 flex-col gap-2">
          <Skeleton className="h-6 w-2/3 rounded" />
        </div>
        <div className="flex flex-col gap-3">
          <Skeleton className="h-14 rounded-2xl" />
          <Skeleton className="h-14 rounded-2xl" />
          <Skeleton className="h-14 rounded-2xl" />
          <Skeleton className="h-14 rounded-2xl" />
        </div>
      </div>
      <Skeleton className="mt-auto mx-5 h-14 rounded-2xl" />
    </main>
  );
}
