"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppBar } from "@/components/common/AppBar";
import { DefaultButton } from "@/components/common/DefaultButton";
import { ErrorView } from "@/components/common/ErrorView";
import {
  OptionButton,
  type OptionButtonVariant,
} from "@/components/common/OptionButton";
import { QuestionProgress } from "@/components/graph/QuestionProgress";
import { ApiError } from "@/lib/api/client";
import {
  submitRecommendation,
  type ExperienceLevel,
} from "@/lib/api/recommendation";
import type { RecommendationQuestion } from "@/lib/api/types";

const OPTION_VARIANTS: OptionButtonVariant[] = [
  "option1",
  "option2",
  "option3",
  "option4",
];

export function QuizClient({
  questions,
  experienceLevel,
}: {
  questions: RecommendationQuestion[];
  experienceLevel: ExperienceLevel;
}) {
  const router = useRouter();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (questions.length === 0) {
    throw new Error("문항을 불러오지 못했어요");
  }

  const question = questions[questionIndex];
  const selectedChoiceId = answers[question.question_id] ?? null;
  const isLastQuestion = questionIndex === questions.length - 1;

  const selectOption = (choiceId: number) => {
    setAnswers((prev) => ({ ...prev, [question.question_id]: choiceId }));
  };

  const goBack = () => {
    if (questionIndex === 0) {
      router.back();
      return;
    }
    setQuestionIndex((i) => i - 1);
  };

  const goNext = async () => {
    if (!isLastQuestion) {
      setQuestionIndex((i) => i + 1);
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const result = await submitRecommendation({
        experience_level: experienceLevel,
        answers: Object.entries(answers).map(
          ([questionId, selectedChoiceId]) => ({
            question_id: Number(questionId),
            selected_choice_id: selectedChoiceId,
          }),
        ),
      });
      sessionStorage.setItem("quizResult", JSON.stringify(result));
      router.push("/result");
    } catch (error) {
      setSubmitError(
        error instanceof ApiError
          ? error.message
          : "결과를 받아오지 못했어요. 다시 시도해주세요.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitError) {
    return (
      <ErrorView
        image="/images/error-result.svg"
        title="결과를 불러오지 못했냉.."
        description="잠시 후 다시 시도해 주세요"
        actionLabel="다시 불러오기"
        onAction={goNext}
      />
    );
  }

  return (
    <main className="flex flex-col min-h-screen pt-11 pb-15">
      <AppBar onBack={goBack} />
      <div className="flex flex-col px-5 pt-3">
        <QuestionProgress
          current={questionIndex + 2}
          total={questions.length + 1}
        />
        <p className="text-caption2 text-orange-80 mt-5">
          Q{question.question_id + 1}
        </p>
        <h1 className="text-headline2 text-warm-gray-90 mt-3 h-32 whitespace-pre-line">
          {question.question_text}
        </h1>
        <div className="flex flex-col">
          {question.choices.map((choice, i) => (
            <OptionButton
              key={choice.choice_id}
              variant={OPTION_VARIANTS[i]}
              selected={selectedChoiceId === choice.choice_id}
              onClick={() => selectOption(choice.choice_id)}
              className={i > 0 ? "mt-3" : undefined}
            >
              {choice.choice_text}
            </OptionButton>
          ))}
        </div>
      </div>
      <DefaultButton
        variant="primary"
        className="mt-auto mx-5"
        disabled={selectedChoiceId === null || isSubmitting}
        onClick={goNext}
      >
        {isSubmitting
          ? "제출 중..."
          : isLastQuestion
            ? "평냉 취향 확인하기"
            : "다음"}
      </DefaultButton>
    </main>
  );
}
