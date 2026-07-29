import type { InputHTMLAttributes, ReactNode } from "react";

export type InputColor = "warmGray" | "orange" | "green" | "blue";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  color?: InputColor;
  icon?: ReactNode;
};

const COLOR_STYLES: Record<
  InputColor,
  { bg: string; icon: string; text: string }
> = {
  warmGray: {
    bg: "bg-warm-gray-10",
    icon: "text-warm-gray-40",
    text: "text-warm-gray-100",
  },
  orange: {
    bg: "bg-orange-20",
    icon: "text-orange-50",
    text: "text-orange-100",
  },
  green: { bg: "bg-green-10", icon: "text-green-40", text: "text-green-100" },
  blue: { bg: "bg-blue-10", icon: "text-blue-40", text: "text-blue-100" },
};

export function Input({
  color = "warmGray",
  icon,
  className,
  ...props
}: InputProps) {
  const styles = COLOR_STYLES[color];

  // TODO: layout/markup
}
