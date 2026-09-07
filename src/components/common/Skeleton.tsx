export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={["animate-pulse bg-warm-gray-10", className]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
