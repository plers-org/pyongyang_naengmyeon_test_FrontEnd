import type { ButtonHTMLAttributes } from "react";

export type OptionButtonVariant = "option1" | "option2" | "option3" | "option4";

export type OptionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: OptionButtonVariant;
};

const VARIANT_STYLES: Record<OptionButtonVariant, string> = {
  option1:
    "bg-button-option1-bg-default text-button-option1-text-default active:bg-button-option1-bg-selected active:text-button-option1-text-selected",
  option2:
    "bg-button-option2-bg-default text-button-option2-text-default active:bg-button-option2-bg-selected active:text-button-option2-text-selected",
  option3:
    "bg-button-option3-bg-default text-button-option3-text-default active:bg-button-option3-bg-selected active:text-button-option3-text-selected",
  option4:
    "bg-button-option4-bg-default text-button-option4-text-default active:bg-button-option4-bg-selected active:text-button-option4-text-selected",
};

export function OptionButton({
  variant = "option1",
  className,
  children,
  ...props
}: OptionButtonProps) {
  return (
    <button
      className={[
        "flex w-full cursor-pointer items-center justify-center rounded-2xl px-5 py-4 text-center text-[15px] font-medium leading-[1.4] transition-colors disabled:cursor-not-allowed disabled:opacity-50",
        VARIANT_STYLES[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
