/**
 * `types.ts` 는 openapi-typescript 로 재생성되므로 직접 손대지 않는다.
 * 컴포넌트에서 쓰기 편한 스키마 별칭은 여기서 파생시킨다.
 */
import type { components } from "./types";

type Schemas = components["schemas"];

export type HttpValidationError = Schemas["HTTPValidationError"];
export type PrimaryType = Schemas["PrimaryType"];
export type RecommendationAnswer = Schemas["RecommendationAnswer"];
export type RecommendationChoice = Schemas["RecommendationChoice"];
export type RecommendationQuestion = Schemas["RecommendationQuestion"];
export type RecommendationQuestionsResponse =
  Schemas["RecommendationQuestionsResponse"];
export type RecommendationResultResponse =
  Schemas["RecommendationResultResponse"];
export type RecommendationSubmitRequest = Schemas["RecommendationSubmitRequest"];
export type RecommendedRestaurant = Schemas["RecommendedRestaurant"];
export type TasteProfile = Schemas["TasteProfile"];
export type TraitScale = Schemas["TraitScale"];
export type TraitScore = Schemas["TraitScore"];
export type TypeScore = Schemas["TypeScore"];
export type TypeSummary = Schemas["TypeSummary"];
export type ValidationError = Schemas["ValidationError"];
