import type { ButtonHTMLAttributes, ReactNode } from "react";

export type IconButtonSize = "s" | "m" | "l";

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: IconButtonSize;
  /** Should render with fill="currentColor" (or stroke) so it follows the button's text color. */
  icon: ReactNode;
};

// Icon color is driven by text-color so any icon using currentColor just works:
// default = atomic/neutral/90, pressed = atomic/warm-gray/10 on an atomic/neutral/90 bg.
const BASE_STYLES =
  "flex shrink-0 cursor-pointer items-center justify-center bg-common-white text-neutral-90 transition-colors active:bg-neutral-90 active:text-warm-gray-10 disabled:cursor-not-allowed disabled:opacity-50";

const SIZE_STYLES: Record<IconButtonSize, string> = {
  s: "size-4 rounded",
  m: "size-6 rounded-md",
  l: "size-8 rounded-lg",
};

export function IconButton({ size = "m", icon, className, ...props }: IconButtonProps) {
  return (
    <button className={[BASE_STYLES, SIZE_STYLES[size], className].filter(Boolean).join(" ")} {...props}>
      <span className="size-full shrink-0">{icon}</span>
    </button>
  );
}
