import { apiFetch } from "./client";
import type {
  RecommendationQuestionsResponse,
  RecommendationResultResponse,
  RecommendationSubmitRequest,
} from "./model";

export type ExperienceLevel = "beginner" | "expert";

export function getRecommendationQuestions(experienceLevel: ExperienceLevel) {
  return apiFetch<RecommendationQuestionsResponse>(
    `/recommendation/questions/${experienceLevel}`,
  );
}

export function submitRecommendation(payload: RecommendationSubmitRequest) {
  return apiFetch<RecommendationResultResponse>("/recommendation/submit", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getRecommendationResult(resultId: string) {
  return apiFetch<RecommendationResultResponse>(
    `/recommendation/results/${resultId}`,
    { next: { revalidate: 3600 } },
  );
}
