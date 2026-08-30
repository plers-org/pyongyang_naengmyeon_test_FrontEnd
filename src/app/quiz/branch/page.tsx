"use client";

import { useState } from "react";
import { AppBar } from "@/components/common/AppBar";
import { DefaultButton } from "@/components/common/DefaultButton";
import { OptionButton } from "@/components/common/OptionButton";
import { useRouter } from "next/navigation";

type Answer = "experienced" | "beginner";

export default function Page() {
  const router = useRouter();
  const [answer, setAnswer] = useState<Answer | null>(null);

  return (
    <main className="flex flex-col min-h-screen pt-11 pb-15">
      <AppBar onBack={() => router.back()} />
      <div className="flex flex-col px-5 pt-[54px]">
        <p className="text-caption2 text-orange-80">Q1</p>
        <h1 className="text-headline2 text-warm-gray-90 mt-3">
          평양냉면을
          <br />
          먹어본 적 있으신가요?
        </h1>
        <p className="text-subtitle1 text-warm-gray-50 mt-3">
          경험에 따라 딱 맞는 분석을 해드려요 :)
        </p>
        <OptionButton
          className="mt-[31px]"
          variant="option1"
          selected={answer === "experienced"}
          onClick={() => setAnswer("experienced")}
        >
          네, 먹어봤어요
        </OptionButton>
        <OptionButton
          className="mt-3"
          variant="option2"
          selected={answer === "beginner"}
          onClick={() => setAnswer("beginner")}
        >
          아니요, 처음이에요
        </OptionButton>
      </div>
      <DefaultButton
        variant="primary"
        className="mt-auto mx-5"
        disabled={answer === null}
        onClick={() => router.push(answer === "experienced" ? "/quiz/experienced" : "/quiz/beginner")}
      >
        다음
      </DefaultButton>
    </main>
  );
}
