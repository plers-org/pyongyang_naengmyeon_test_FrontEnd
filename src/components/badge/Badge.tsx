import type { ReactNode } from "react";

export type BadgeColor = "warmGray" | "orange" | "green" | "blue";

export type BadgeProps = {
  color?: BadgeColor;
  children?: ReactNode;
};

const COLOR_STYLES: Record<BadgeColor, { bg: string; text: string }> = {
  warmGray: {
    bg: "bg-warm-gray-20",
    text: "text-warm-gray-80",
  },
  orange: {
    bg: "bg-orange-20",
    text: "text-orange-80",
  },
  green: { bg: "bg-green-10", text: "text-green-70" },
  blue: { bg: "bg-blue-10", text: "text-blue-80" },
};

export function Badge({ color = "warmGray", children }: BadgeProps) {
  const styles = COLOR_STYLES[color];
  return (
    <div
      className={[
        "inline-flex flex-col items-start px-3 py-1 rounded-[100px]",
        styles.bg,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className={`text-caption1 ${styles.text}`}>{children}</span>
    </div>
  );
}
