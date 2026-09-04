"use client";

import Image from "next/image";
import { DefaultButton } from "@/components/common/DefaultButton";
import { ArrowClockwiseIcon } from "@/components/icons/ArrowClockwiseIcon";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <Image
        src="/images/error-question.svg"
        alt=""
        width={152}
        height={142}
      />

      <h1 className="mt-10 text-[20px] font-semibold leading-[1.4] text-neutral-60">
        질문을 불러오지 못했냉..
      </h1>
      <p className="mt-2 text-subtitle1 text-neutral-60">
        잠시 후 다시 시도해 주세요
      </p>

      <DefaultButton
        size="md"
        className="mt-5"
        icon={<ArrowClockwiseIcon />}
        onClick={reset}
      >
        다시 불러오기
      </DefaultButton>
    </main>
  );
}
