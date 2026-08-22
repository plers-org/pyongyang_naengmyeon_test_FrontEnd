import { apiFetch } from "./client";
import type { RecommendationQuestionsResponse } from "./types";

export type ExperienceLevel = "beginner" | "expert";

export function getRecommendationQuestions(experienceLevel: ExperienceLevel) {
  return apiFetch<RecommendationQuestionsResponse>(
    `/recommendation/questions/${experienceLevel}`,
  );
}
