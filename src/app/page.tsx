"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { DefaultButton } from "@/components/common/DefaultButton";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center px-5 pt-31.5 pb-40">
      <h1 className="text-center text-headline1 text-warm-gray-90">
        나는
        <br />
        어떤 평양냉면 타입?
      </h1>
      <p className="mt-3 text-center text-subtitle1 text-warm-gray-60">
        6가지 질문으로
        <br />
        나에게 딱 맞는 평양냉면 스타일을 찾아봐요!
      </p>
      <Image
        src="/characters/intro-characters.png"
        alt=""
        width={240}
        height={240}
        className="mt-7.5"
      />
      <DefaultButton className="mt-6" onClick={() => router.push("/quiz/branch")}>
        내 평냉 취향 찾기
      </DefaultButton>
      <p className="mt-5 text-center text-caption4 text-warm-gray-60">
        약 2분 소요
      </p>
    </main>
  );
}
