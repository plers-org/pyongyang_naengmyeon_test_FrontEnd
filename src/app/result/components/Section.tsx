import type { ReactNode } from "react";

export function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-5">
      <p className="text-title1 text-warm-gray-100">{title}</p>
      {children}
    </div>
  );
}
