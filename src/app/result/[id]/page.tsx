import { notFound } from "next/navigation";
import { ApiError } from "@/lib/api/client";
import { getRecommendationResult } from "@/lib/api/recommendation";
import { ResultView } from "../ResultView";

async function fetchResult(id: string) {
  try {
    return await getRecommendationResult(id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await fetchResult(id);
  return <ResultView result={result} />;
}
