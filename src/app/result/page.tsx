"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ErrorView } from "@/components/common/ErrorView";
import type { RecommendationResultResponse } from "@/lib/api/model";
import { ResultView } from "./ResultView";

export default function Page() {
  const router = useRouter();
  const [result, setResult] = useState<RecommendationResultResponse | null>(
    null,
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // sessionStorage는 브라우저 전용이라 하이드레이션 이후에만 읽을 수 있음
    const raw = sessionStorage.getItem("quizResult");
    if (raw) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setResult(JSON.parse(raw));
      } catch {
        sessionStorage.removeItem("quizResult");
      }
    }
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  if (!result) {
    // TODO: 결과 저장이 세션 → API로 바뀌면 재검토
    return (
      <ErrorView
        image="/images/error-result.svg"
        title="결과를 불러오지 못했냉.."
        description="테스트를 다시 진행해 주세요"
        actionLabel="테스트 하러 가기"
        onAction={() => router.push("/quiz/branch")}
      />
    );
  }

  return <ResultView result={result} />;
}
