import type { ButtonHTMLAttributes, ReactNode } from "react";

export type DefaultButtonVariant = "primary" | "secondary";

export type DefaultButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: DefaultButtonVariant;
  icon?: ReactNode;
};

const VARIANT_STYLES: Record<DefaultButtonVariant, string> = {
  primary:
    "px-5 bg-button-primary-bg-default text-button-primary-text-default active:bg-button-primary-bg-pressed active:text-button-primary-text-pressed disabled:bg-button-primary-bg-disabled disabled:text-button-primary-text-disabled",
  secondary:
    "px-0 bg-button-secondary-bg-default text-button-secondary-text-default active:bg-button-secondary-bg-pressed active:text-button-secondary-text-pressed disabled:bg-button-secondary-bg-disabled disabled:text-button-secondary-text-disabled",
};

export function DefaultButton({
  variant = "primary",
  icon,
  className,
  children,
  ...props
}: DefaultButtonProps) {
  return (
    <button
      className={[
        "flex w-[335px] cursor-pointer items-center justify-center gap-2 rounded-2xl py-4 text-center text-[16px] font-semibold leading-[1.4] transition-colors disabled:cursor-not-allowed",
        VARIANT_STYLES[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {icon && <span className="size-4 shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
