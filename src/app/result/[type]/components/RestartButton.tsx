"use client";

import { useRouter } from "next/navigation";
import { DefaultButton } from "@/components/common/DefaultButton";
import { ArrowClockwiseIcon } from "@/components/icons/ArrowClockwiseIcon";

export function RestartButton() {
  const router = useRouter();

  return (
    <DefaultButton
      variant="secondary"
      icon={<ArrowClockwiseIcon />}
      onClick={() => router.push("/quiz/branch")}
    >
      다시 테스트 하기
    </DefaultButton>
  );
}
