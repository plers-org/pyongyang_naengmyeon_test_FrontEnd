import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export type DefaultButtonVariant = "primary" | "secondary";
export type DefaultButtonSize = "lg" | "md";

const SIZE_STYLES: Record<DefaultButtonSize, string> = {
  lg: "flex w-[335px] rounded-2xl px-5 py-4 text-[16px] font-semibold",
  md: "inline-flex rounded-xl px-4 py-[11.5px] text-[15px] font-medium",
};

const VARIANT_STYLES: Record<DefaultButtonVariant, string> = {
  primary:
    "bg-button-primary-bg-default text-button-primary-text-default active:bg-button-primary-bg-pressed active:text-button-primary-text-pressed disabled:bg-button-primary-bg-disabled disabled:text-button-primary-text-disabled",
  secondary:
    "bg-button-secondary-bg-default text-button-secondary-text-default active:bg-button-secondary-bg-pressed active:text-button-secondary-text-pressed disabled:bg-button-secondary-bg-disabled disabled:text-button-secondary-text-disabled",
};

type DefaultButtonOwnProps = {
  variant?: DefaultButtonVariant;
  size?: DefaultButtonSize;
  icon?: ReactNode;
};

export type DefaultButtonProps =
  | (ButtonHTMLAttributes<HTMLButtonElement> &
      DefaultButtonOwnProps & { href?: undefined })
  | (AnchorHTMLAttributes<HTMLAnchorElement> &
      DefaultButtonOwnProps & { href: string });

export function DefaultButton({
  variant = "primary",
  size = "lg",
  icon,
  className,
  children,
  href,
  ...props
}: DefaultButtonProps) {
  const classes = [
    "cursor-pointer items-center justify-center gap-2 text-center leading-[1.4] transition-colors disabled:cursor-not-allowed",
    SIZE_STYLES[size],
    VARIANT_STYLES[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {icon && <span className="size-4 shrink-0">{icon}</span>}
      {children}
    </>
  );

  if (href) {
    return (
      <a
        className={classes}
        href={href}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={classes}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
