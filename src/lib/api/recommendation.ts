import { apiFetch } from "./client";
import { RecommendationQuestionsResponse } from "./types";

export type ExperienceLevel = "beginner" | "expert";

export function getRecommendationQuestions(experienceLevel: ExperienceLevel) {
  return apiFetch<RecommendationQuestionsResponse>(
    `/api/recommendation/questions/${experienceLevel}`,
  );
}
