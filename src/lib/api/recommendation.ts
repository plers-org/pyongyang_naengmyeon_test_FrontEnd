import { apiFetch } from "./client";
import type {
  RecommendationQuestionsResponse,
  RecommendationResultResponse,
  RecommendationSubmitRequest,
} from "./types";

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
