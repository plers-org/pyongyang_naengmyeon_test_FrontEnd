"use client";

import { ArrowClockwiseIcon } from "@/components/icons/ArrowClockwiseIcon";
import { ShareIcon } from "@/components/icons/ShareIcon";

export function ResultShareBar({
  shareText,
  pageBg,
  onRestart,
}: {
  shareText: string;
  pageBg: string;
  onRestart: () => void;
}) {
  const handleShare = async () => {
    const shareData = {
      title: "평냉 취향 테스트",
      text: shareText,
      url: window.location.origin,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // 사용자가 공유를 취소한 경우 등은 무시
      }
      return;
    }
    await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
  };

  return (
    <div
      className={`sticky bottom-0 mt-11.5 flex items-start gap-3 px-5 py-3 ${pageBg}`}
    >
      <button
        type="button"
        aria-label="다시 테스트 하기"
        className="flex size-13.5 shrink-0 items-center justify-center gap-2 rounded-xl border border-neutral-10 bg-white p-3.5"
        onClick={onRestart}
      >
        <ArrowClockwiseIcon className="size-4 text-neutral-70" />
      </button>
      <button
        type="button"
        className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-neutral-10 bg-button-secondary-bg-default px-4 py-3.75 text-[16px] font-semibold text-button-secondary-text-default active:bg-button-secondary-bg-pressed active:text-button-secondary-text-pressed"
        onClick={handleShare}
      >
        <ShareIcon className="size-4" />
        결과 공유하기
      </button>
    </div>
  );
}
