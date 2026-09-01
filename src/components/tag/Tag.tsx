import type { ReactNode } from "react";

export type TagType = "solid" | "outlined";

export type TagProps = {
  type?: TagType;
  children?: ReactNode;
};

const TYPE_STYLES: Record<TagType, string> = {
  solid: "px-2 py-1 bg-neutral-10 text-neutral-70",
  outlined:
    "px-[7px] py-[3px] border border-neutral-10 bg-white text-neutral-80",
};

export function Tag({ type = "solid", children }: TagProps) {
  return (
    <span
      className={[
        "inline-flex flex-col items-start rounded-[999px] text-caption4",
        TYPE_STYLES[type],
      ].join(" ")}
    >
      #{children}
    </span>
  );
}
