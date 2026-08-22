import { getRecommendationQuestions } from "@/lib/api/recommendation";
import { QuizClient } from "../QuizClient";

export default async function Page() {
  const data = await getRecommendationQuestions("expert");
  return <QuizClient questions={data.questions} experienceLevel="expert" />;
}
