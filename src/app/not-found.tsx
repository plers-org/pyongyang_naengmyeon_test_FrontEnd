"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { DefaultButton } from "@/components/common/DefaultButton";
import { HouseFill } from "@/components/icons/HouseFill";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <p className="text-caption4 text-neutral-30">ERROR CODE : 404</p>

      <Image
        src="/images/error-404.svg"
        alt=""
        width={152}
        height={142}
        className="mt-6"
      />

      <h1 className="mt-10 text-[20px] font-semibold leading-[1.4] text-neutral-60">
        길을 잘못들었냉..
      </h1>
      <p className="mt-2 text-subtitle1 text-neutral-60">
        찾으시는 페이지가 없거나
        <br />
        주소가 변경되었어요
      </p>

      <DefaultButton
        size="md"
        className="mt-5"
        icon={<HouseFill />}
        onClick={() => router.push("/")}
      >
        홈으로 가기
      </DefaultButton>
    </main>
  );
}
