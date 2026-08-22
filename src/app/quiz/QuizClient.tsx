"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppBar } from "@/components/common/AppBar";
import { DefaultButton } from "@/components/common/DefaultButton";
import {
  OptionButton,
  type OptionButtonVariant,
} from "@/components/common/OptionButton";
import { QuestionProgress } from "@/components/graph/QuestionProgress";
import type { RecommendationQuestion } from "@/lib/api/types";

const OPTION_VARIANTS: OptionButtonVariant[] = [
  "option1",
  "option2",
  "option3",
  "option4",
];

export function QuizClient({
  questions,
}: {
  questions: RecommendationQuestion[];
}) {
  const router = useRouter();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  if (questions.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-5 text-center">
        <p className="text-headline2 text-warm-gray-90">
          문항을 불러오지 못했어요
        </p>
        <DefaultButton variant="primary" onClick={() => router.back()}>
          돌아가기
        </DefaultButton>
      </main>
    );
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

  const goNext = () => {
    if (isLastQuestion) {
      // TODO: 다음 이슈에서 submitRecommendation 호출 붙임
      return;
    }
    setQuestionIndex((i) => i + 1);
  };

  return (
    <main className="flex flex-col min-h-screen pt-11 pb-15">
      <AppBar onBack={goBack} />
      <div className="flex flex-col px-5 pt-4">
        <QuestionProgress
          current={questionIndex + 1}
          total={questions.length}
        />
        <p className="text-caption2 text-orange-80 mt-5">
          Q{question.question_id}
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
        disabled={selectedChoiceId === null}
        onClick={goNext}
      >
        {isLastQuestion ? "평냉 취향 확인하기" : "다음"}
      </DefaultButton>
    </main>
  );
}
