import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowClockwiseIcon } from "@/components/icons/ArrowClockwiseIcon";
import { DefaultButton } from "./DefaultButton";

export function ErrorView({
  image,
  title,
  description,
  actionLabel,
  onAction,
}: {
  image: string;
  title: string;
  description?: ReactNode;
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <Image src={image} alt="" width={152} height={142} />

      <h1 className="mt-10 text-[20px] font-semibold leading-[1.4] text-neutral-60">
        {title}
      </h1>
      {description && (
        <p className="mt-2 text-subtitle1 text-neutral-60">{description}</p>
      )}

      <DefaultButton
        size="md"
        className="mt-5"
        icon={<ArrowClockwiseIcon />}
        onClick={onAction}
      >
        {actionLabel}
      </DefaultButton>
    </main>
  );
}
