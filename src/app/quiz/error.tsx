"use client";

import { ErrorView } from "@/components/common/ErrorView";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorView
      image="/images/error-question.svg"
      title="질문을 불러오지 못했냉.."
      description="잠시 후 다시 시도해 주세요"
      actionLabel="다시 불러오기"
      onAction={reset}
    />
  );
}
