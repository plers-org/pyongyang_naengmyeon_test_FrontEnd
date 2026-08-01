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

type Question = {
  id: string;
  text: string;
  options: string[];
};

const QUESTIONS: Question[] = [
  {
    id: "Q1",
    text: "좋아하는 국물의 첫 느낌은?",
    options: [
      "깊고 진한 고기 맛과 향이 느껴져야",
      "슴슴한데 은은한 감칠맛이 있어야",
      "아주 맑고 담백해야",
      "새콤하고 개운해야",
    ],
  },
  {
    id: "Q2",
    text: "“이 국물 좀 싱거운데?”\n라는 말을 들으면?",
    options: [
      `"그 맛으로 먹는 건데?"`,
      `"맛이 좀 더 진하고 확실한 게 좋아"`,
      `"새콤달콤하게 가자"`,
      `"밍밍하지 않게 은은한 감칠맛은 있어야 해"`,
    ],
  },
  {
    id: "Q3",
    text: "면 요리에서 끌리는 면발은?",
    options: [
      "메밀 향이 느껴지고 툭툭 끊기는 거친 면",
      "적당히 탄력있고 잘 끊기는 면",
      "면발보다 육수가 중요",
    ],
  },
  {
    id: "Q4",
    text: "고명으로 가장 반가운 건?",
    options: [
      "두툼한 편육",
      "파 + 고춧가루 솔솔",
      "오이 채",
      "새콤하고 아삭한 배나 무",
    ],
  },
  {
    id: "Q5",
    text: "새로운 음식에 도전하고 싶다면,\n어떤 맛?",
    options: [
      "육향 진한",
      "슴슴하며서 감칠맛 밸런스가 좋은",
      "맑고 담백하며 메밀향이 또렷한",
      "새콤한 맛이 살아있는",
    ],
  },
  {
    id: "Q6",
    text: "평소 좋아하는 음식의 맛은?",
    options: [
      "맛과 향이 진하고 확실한",
      "담백하면서 감칠맛이 균형 잡힌",
      "자극적이지 않고 은은한",
      "산뜻하고 개운한",
    ],
  },
];

const OPTION_VARIANTS: OptionButtonVariant[] = [
  "option1",
  "option2",
  "option3",
  "option4",
];

export default function Page() {
  const router = useRouter();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const question = QUESTIONS[questionIndex];
  const selectedOption = answers[questionIndex] ?? null;
  const isLastQuestion = questionIndex === QUESTIONS.length - 1;

  const selectOption = (optionIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[questionIndex] = optionIndex;
      return next;
    });
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
      // TODO: 결과창
      router.push("/result");
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
          total={QUESTIONS.length}
        />
        <p className="text-caption2 text-orange-80 mt-5">{question.id}</p>
        <h1 className="text-headline2 text-warm-gray-90 mt-3 h-32 whitespace-pre-line">
          {question.text}
        </h1>
        <div className="flex flex-col">
          {question.options.map((option, i) => (
            <OptionButton
              key={option}
              variant={OPTION_VARIANTS[i]}
              selected={selectedOption === i}
              onClick={() => selectOption(i)}
              className={i > 0 ? "mt-3" : undefined}
            >
              {option}
            </OptionButton>
          ))}
        </div>
      </div>
      <DefaultButton
        variant="primary"
        className="mt-auto mx-5"
        disabled={selectedOption === null}
        onClick={goNext}
      >
        {isLastQuestion ? "평냉 취향 확인하기" : "다음"}
      </DefaultButton>
    </main>
  );
}
