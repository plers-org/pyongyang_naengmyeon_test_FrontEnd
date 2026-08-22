"use client";

import { DefaultButton } from "@/components/common/DefaultButton";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-5 text-center">
      <p className="text-headline2 text-warm-gray-90">
        문항을 불러오지 못했어요
      </p>
      <p className="text-subtitle1 text-warm-gray-60">
        잠시 후 다시 시도해주세요
      </p>
      <DefaultButton variant="primary" onClick={reset}>
        다시 시도
      </DefaultButton>
    </main>
  );
}
