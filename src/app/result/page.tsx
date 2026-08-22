"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "@/components/badge/Badge";
import { DefaultButton } from "@/components/common/DefaultButton";
import {
  CircleGraph,
  type CircleGraphColor,
} from "@/components/graph/CircleGraph";
import { ArrowClockwiseIcon } from "@/components/icons/ArrowClockwiseIcon";
import { GeoAltFill } from "@/components/icons/GeoAltFill";
import type { RecommendationResultResponse } from "@/lib/api/types";

type TypeKey = "uraeok" | "uijeongbu" | "jangchungdong" | "dongchimi";

const KEY_TO_THEME: Record<TypeKey, CircleGraphColor> = {
  uraeok: "orange",
  dongchimi: "blue",
  uijeongbu: "green",
  jangchungdong: "warmGray",
};

const CHARACTER_IMAGE: Record<TypeKey, string> = {
  uraeok: "/characters/우래옥형.svg",
  uijeongbu: "/characters/의정부형.svg",
  jangchungdong: "/characters/장충동형.svg",
  dongchimi: "/characters/동치미형.svg",
};

type ThemeStyle = {
  pageBg: string;
  bannerBg: string;
  eyebrowText: string;
  headlineText: string;
  subtitleText: string;
  reasonText: string;
  avatarBg: string;
  pillBg: string;
  pillText: string;
  pillIconColor: string;
};

const THEME_STYLES: Record<CircleGraphColor, ThemeStyle> = {
  orange: {
    pageBg: "bg-orange-10",
    bannerBg: "bg-orange-50",
    eyebrowText: "text-orange-60",
    headlineText: "text-orange-90",
    subtitleText: "text-orange-80",
    reasonText: "text-orange-100",
    avatarBg: "bg-orange-20",
    pillBg: "bg-orange-20",
    pillText: "text-orange-100",
    pillIconColor: "text-orange-50",
  },
  blue: {
    pageBg: "bg-blue-10",
    bannerBg: "bg-blue-40",
    eyebrowText: "text-blue-60",
    headlineText: "text-blue-100",
    subtitleText: "text-blue-60",
    reasonText: "text-blue-100",
    avatarBg: "bg-blue-10",
    pillBg: "bg-blue-10",
    pillText: "text-blue-100",
    pillIconColor: "text-blue-40",
  },
  green: {
    pageBg: "bg-green-10",
    bannerBg: "bg-green-40",
    eyebrowText: "text-green-60",
    headlineText: "text-green-90",
    subtitleText: "text-green-60",
    reasonText: "text-green-100",
    avatarBg: "bg-green-10",
    pillBg: "bg-green-10",
    pillText: "text-green-100",
    pillIconColor: "text-green-40",
  },
  warmGray: {
    pageBg: "bg-warm-gray-10",
    bannerBg: "bg-warm-gray-40",
    eyebrowText: "text-warm-gray-60",
    headlineText: "text-warm-gray-90",
    subtitleText: "text-warm-gray-60",
    reasonText: "text-warm-gray-90",
    avatarBg: "bg-warm-gray-20",
    pillBg: "bg-warm-gray-10",
    pillText: "text-warm-gray-100",
    pillIconColor: "text-warm-gray-40",
  },
};

function CharacterAvatar({
  typeKey,
  size,
  priority,
}: {
  typeKey: TypeKey;
  size: number;
  priority?: boolean;
}) {
  const src = CHARACTER_IMAGE[typeKey];
  if (src) {
    return (
      <Image
        src={encodeURI(src)}
        alt={typeKey}
        width={size}
        height={size}
        priority={priority}
        className="shrink-0"
      />
    );
  }
  return (
    <div
      style={{ width: size, height: size }}
      className={`shrink-0 rounded-full ${THEME_STYLES[KEY_TO_THEME[typeKey]].avatarBg}`}
    />
  );
}

function TypeMatchCard({
  label,
  typeKey,
  name,
}: {
  label: string;
  typeKey: TypeKey;
  name: string;
}) {
  return (
    <div className="flex flex-1 flex-col items-center gap-4 rounded-2xl bg-white px-4 py-4">
      <p className="text-subtitle1 text-warm-gray-60 text-center">{label}</p>
      <CharacterAvatar typeKey={typeKey} size={100} />
      <Badge color={KEY_TO_THEME[typeKey]}>{name}</Badge>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-white p-5">
      <p className="text-title1 text-warm-gray-100">{title}</p>
      {children}
    </div>
  );
}

export default function Page() {
  const router = useRouter();
  const [result, setResult] = useState<RecommendationResultResponse | null>(
    null,
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // sessionStorage는 브라우저 전용이라 하이드레이션 이후에만 읽을 수 있음
    const raw = sessionStorage.getItem("quizResult");
    if (raw) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setResult(JSON.parse(raw));
      } catch {
        sessionStorage.removeItem("quizResult");
      }
    }
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  if (!result) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-5 text-center">
        <p className="text-headline2 text-warm-gray-90">
          결과를 찾을 수 없어요
        </p>
        <p className="text-subtitle1 text-warm-gray-60">
          테스트를 다시 진행해주세요
        </p>
        <DefaultButton
          variant="primary"
          onClick={() => router.push("/quiz/branch")}
        >
          테스트 하러 가기
        </DefaultButton>
      </main>
    );
  }

  const { primary_type, secondary_type, farthest_type, taste_profile, recommended_restaurants, status } = result;
  const themeColor = KEY_TO_THEME[primary_type.key as TypeKey];
  const theme = THEME_STYLES[themeColor];

  return (
    <main className={`flex min-h-screen flex-col ${theme.pageBg}`}>
      <section className="flex flex-col items-center px-5 pt-15 pb-10">
        <p className={`text-caption3 ${theme.eyebrowText}`}>
          당신의 평냉 타입은?
        </p>
        <div className="mt-6">
          <CharacterAvatar
            typeKey={primary_type.key as TypeKey}
            size={162}
            priority
          />
        </div>
        <h1
          className={`text-headline2 mt-6 text-center whitespace-nowrap ${theme.headlineText}`}
        >
          {primary_type.title}
        </h1>
        <p
          className={`text-subtitle1 mt-3 mx-auto max-w-50 text-center whitespace-pre-line ${theme.subtitleText}`}
        >
          {primary_type.subtitle}
        </p>
      </section>

      <div className="flex flex-col gap-3 px-5">
        <div className={`rounded-2xl px-5 py-3.5 ${theme.bannerBg}`}>
          <p className="text-title1 text-center text-white">
            {primary_type.badge}
          </p>
        </div>

        <Section title="취향 그래프">
          <div className="flex flex-col gap-4">
            {taste_profile.traits.map((trait) => (
              <div
                key={trait.key}
                className="flex items-center justify-center gap-2"
              >
                <span className="text-caption2 text-neutral-60 w-15">
                  {trait.label}
                </span>
                <CircleGraph
                  current={Math.round(trait.score)}
                  color={themeColor}
                />
                <span className="text-caption3 text-neutral-80 w-12.75 text-right">
                  {Math.round(trait.score)} / 5
                </span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="유형 도출 이유">
          <p className={`text-body1 ${theme.reasonText}`}>
            {primary_type.reason}
          </p>
        </Section>

        <Section title="잘 맞는 평냉집 추천">
          <div className="flex flex-col gap-2">
            {status === "no_recommendation" ? (
              <p className="text-body1 text-warm-gray-60">
                {result.message}
              </p>
            ) : (
              recommended_restaurants.map((r, i) => (
                <div
                  key={`${r.restaurant_name}-${i}`}
                  className={`flex items-center gap-2 rounded-[14px] px-3 py-2.5 ${theme.pillBg}`}
                >
                  <GeoAltFill
                    className={`size-4 shrink-0 ${theme.pillIconColor}`}
                  />
                  <span className={`text-label ${theme.pillText}`}>
                    {r.restaurant_name}
                  </span>
                </div>
              ))
            )}
          </div>
        </Section>

        <div className="flex gap-3">
          <TypeMatchCard
            label="두 번째로 잘 맞는 유형"
            typeKey={secondary_type.key as TypeKey}
            name={secondary_type.name}
          />
          <TypeMatchCard
            label="가장 거리가 먼 유형"
            typeKey={farthest_type.key as TypeKey}
            name={farthest_type.name}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 px-5 pt-3 pb-8">
        {/* TODO: 지도 라우트 나오면 활성화 */}
        <DefaultButton variant="primary" icon={<GeoAltFill />} disabled>
          평냉 지도 보기
        </DefaultButton>
        <DefaultButton
          variant="secondary"
          icon={<ArrowClockwiseIcon />}
          onClick={() => {
            sessionStorage.removeItem("quizResult");
            router.push("/quiz/branch");
          }}
        >
          다시 테스트 하기
        </DefaultButton>
      </div>
    </main>
  );
}
