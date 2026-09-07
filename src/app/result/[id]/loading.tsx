import { Skeleton } from "@/components/common/Skeleton";

export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col pb-15">
      <section className="flex flex-col items-center px-5 pt-15 pb-10">
        <Skeleton className="size-40.5 rounded-full" />
        <Skeleton className="mt-6 h-7 w-48 rounded-lg" />
        <Skeleton className="mt-3 h-5 w-40 rounded-lg" />
      </section>

      <div className="flex flex-col gap-3 px-5">
        <Skeleton className="h-12 rounded-2xl" />

        <div className="flex flex-col gap-4 rounded-2xl bg-white p-5">
          <Skeleton className="h-5 w-20 rounded" />
          <Skeleton className="h-6 rounded" />
          <Skeleton className="h-6 rounded" />
          <Skeleton className="h-6 rounded" />
          <Skeleton className="h-6 rounded" />
        </div>

        <div className="flex flex-col gap-4 rounded-2xl bg-white p-5">
          <Skeleton className="h-5 w-24 rounded" />
          <Skeleton className="h-16 rounded" />
        </div>

        <div className="flex flex-col gap-4 rounded-2xl bg-white p-5">
          <Skeleton className="h-5 w-28 rounded" />
          <Skeleton className="h-11 rounded-[14px]" />
          <Skeleton className="h-11 rounded-[14px]" />
        </div>

        <div className="flex gap-3">
          <Skeleton className="h-48 flex-1 rounded-2xl" />
          <Skeleton className="h-48 flex-1 rounded-2xl" />
        </div>
      </div>

      <div className="px-5 pt-3">
        <Skeleton className="h-14 rounded-2xl" />
      </div>
    </main>
  );
}
