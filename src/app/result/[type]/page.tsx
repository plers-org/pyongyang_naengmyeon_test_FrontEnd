import Link from "next/link";
import { notFound } from "next/navigation";
import { DefaultButton } from "@/components/common/DefaultButton";
import {
  CircleGraph,
  type CircleGraphColor,
} from "@/components/graph/CircleGraph";
import { ArrowClockwiseIcon } from "@/components/icons/ArrowClockwiseIcon";
import { GeoAltFill } from "@/components/icons/GeoAltFill";
import { CharacterAvatar } from "./components/CharacterAvatar";
import { Section } from "./components/Section";
import { TypeMatchCard } from "./components/TypeMatchCard";

export type ResultType = "우래옥형" | "동치미형" | "의정부형" | "장충동형";

export type TasteGraph = {
  육향: number;
  감칠맛: number;
  메밀향: number;
  산미: number;
};

export type ResultData = {
  type: ResultType;
  themeColor: CircleGraphColor;
  characterImage: string;
  banner: string;
  name: string;
  tagline: string;
  graph: TasteGraph;
  reason: string;
  restaurants: string[];
  secondBest: ResultType;
  mostDistant: ResultType;
};

export type ThemeStyle = {
  pageBg: string;
  bannerBg: string;
  eyebrowText: string;
  headlineText: string;
  subtitleText: string;
  reasonText: string;
  avatarBg: string;
  pillBg: string;
  pillText: string;
};

export const THEME_STYLES: Record<CircleGraphColor, ThemeStyle> = {
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
  },
};

const RESULTS: Record<ResultType, ResultData> = {
  우래옥형: {
    type: "우래옥형",
    themeColor: "orange",
    characterImage: "/characters/우래옥형.svg",
    banner: "맑고 순수한 맛에서 진짜 깊이를 찾아요",
    name: "진하고 든든한 우래옥형",
    tagline: "가장 진한 고기 향과 깊은 감칠맛을\n좋아하는 본질파 타입이에요",
    graph: { 육향: 1, 감칠맛: 1, 메밀향: 1, 산미: 1 },
    reason:
      "고기 향이 또렷한 육수와 쫄깃한 메밀 면발이 진짜 평양냉면이라고 느끼는 타입이에요. 다른 계열보다 진한 육향과 감칠맛에서 깊이를 찾아요. 평양냉면의 슴슴함이 아직 낯선 사람도 맛있게 즐기기 좋은 스타일이에요.",
    restaurants: ["장충동평양면옥", "장충동평양면옥"],
    secondBest: "우래옥형",
    mostDistant: "의정부형",
  },
  동치미형: {
    type: "동치미형",
    themeColor: "blue",
    characterImage: "/characters/동치미형.svg",
    banner: "마지막 한입까지 개운해야 해요",
    name: "산뜻하고 개운한 동치미형",
    tagline: "시원한 동치미 향과 깔끔한 끝맛이\n매력적인 청량파 타입이에요",
    graph: { 육향: 1, 감칠맛: 1, 메밀향: 1, 산미: 1 },
    reason:
      "시원한 동치미 육수와 산뜻하게 넘어가는 메밀 면발이 진짜 평양냉면이라고 느끼는 타입이에요. 묵직한 고기 향보다는 새콤하고 개운한 맛에서 매력을 찾아요. 깔끔하고 청량한 평양냉면을 좋아하는 사람들이 즐겨 찾는 스타일이에요.",
    restaurants: ["장충동평양면옥", "장충동평양면옥"],
    secondBest: "우래옥형",
    mostDistant: "의정부형",
  },
  의정부형: {
    type: "의정부형",
    themeColor: "green",
    characterImage: "/characters/의정부형.svg",
    banner: "조용히 스며드는 맛이 오래 남아요",
    name: "맑고 담백한 의정부형",
    tagline: "깔끔한 육수와 은근한 여운을 즐기는\n담백파 타입이에요",
    graph: { 육향: 1, 감칠맛: 1, 메밀향: 1, 산미: 1 },
    reason:
      "맑고 담백한 육수와 부드럽게 끊기는 메밀 면발이 진짜 평양냉면이라고 느끼는 타입이에요. 우래옥 계열보다는 감칠맛이 조금 더 느껴지는 편안하고 균형 잡힌 맛을 좋아해요. 평냉에 입문한 사람도 부담 없이 즐기기 좋은 스타일이에요.",
    restaurants: ["장충동평양면옥", "장충동평양면옥"],
    secondBest: "우래옥형",
    mostDistant: "의정부형",
  },
  장충동형: {
    type: "장충동형",
    themeColor: "warmGray",
    characterImage: "/characters/장충동형.svg",
    banner: "맛있는 포인트는 절대로 놓치지 않아요",
    name: "구수하고 풍성한 장충동형",
    tagline: "은은한 고기 향과 감칠맛이 조화로운\n균형파 타입이에요",
    graph: { 육향: 1, 감칠맛: 1, 메밀향: 1, 산미: 1 },
    reason:
      "물처럼 맑은 육수와 곡향이 강한 메밀 면발이 진짜 평양냉면이라고 느끼는 타입이에요. 의정부 계열보다도 더 슴슴하고 은은한 맛에서 깊이를 찾아요. 평냉 고수들이 즐겨 찾는 스타일이에요.",
    restaurants: ["장충동평양면옥", "장충동평양면옥"],
    secondBest: "우래옥형",
    mostDistant: "의정부형",
  },
};

const RESULT_TYPES = Object.keys(RESULTS) as ResultType[];

export function generateStaticParams() {
  return RESULT_TYPES.map((type) => ({ type }));
}

function isResultType(value: string): value is ResultType {
  return (RESULT_TYPES as string[]).includes(value);
}

export default async function Page({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type: rawType } = await params;
  const type = decodeURIComponent(rawType);

  if (!isResultType(type)) {
    notFound();
  }

  const result = RESULTS[type];
  const theme = THEME_STYLES[result.themeColor];

  return (
    <main className={`flex min-h-screen flex-col ${theme.pageBg}`}>
      <section className="flex flex-col items-center px-5 pt-15 pb-10">
        <p className={`text-caption3 ${theme.eyebrowText}`}>
          당신의 평냉 타입은?
        </p>
        <div className="mt-6">
          <CharacterAvatar data={result} size={162} priority />
        </div>
        <h1
          className={`text-headline2 mt-6 text-center whitespace-nowrap ${theme.headlineText}`}
        >
          {result.name}
        </h1>
        <p
          className={`text-subtitle1 mt-3 text-center whitespace-pre-line ${theme.subtitleText}`}
        >
          {result.tagline}
        </p>
      </section>

      <div className="flex flex-col gap-3 px-5">
        <div className={`rounded-2xl px-5 py-3.5 ${theme.bannerBg}`}>
          <p className="text-title1 text-center text-white">
            {result.banner}
          </p>
        </div>

        <Section title="취향 그래프">
          <div className="flex flex-col gap-4">
            {Object.entries(result.graph).map(([label, value]) => (
              <div key={label} className="flex items-center justify-center gap-2">
                <span className="text-caption2 text-neutral-60 w-15">
                  {label}
                </span>
                <CircleGraph current={value} color={result.themeColor} />
                <span className="text-caption3 text-neutral-80 w-12.75 text-right">
                  {value} / 5
                </span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="유형 도출 이유">
          <p className={`text-body1 ${theme.reasonText}`}>{result.reason}</p>
        </Section>

        <Section title="잘 맞는 평냉집 추천">
          <div className="flex flex-col gap-2">
            {result.restaurants.map((restaurant, i) => (
              <div
                key={`${restaurant}-${i}`}
                className={`flex items-center gap-2 rounded-[14px] px-3 py-2.5 ${theme.pillBg}`}
              >
                <GeoAltFill className={`size-4 shrink-0 ${theme.pillText}`} />
                <span className={`text-label ${theme.pillText}`}>
                  {restaurant}
                </span>
              </div>
            ))}
          </div>
        </Section>

        <div className="flex gap-3">
          <TypeMatchCard
            label="두 번째로 잘 맞는 유형"
            data={RESULTS[result.secondBest]}
            badgeColor="orange"
          />
          <TypeMatchCard
            label="가장 거리가 먼 유형"
            data={RESULTS[result.mostDistant]}
            badgeColor="green"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 px-5 pt-3 pb-8">
        <DefaultButton variant="primary" icon={<GeoAltFill />}>
          평냉 지도 보기
        </DefaultButton>
        <Link href="/quiz/branch" className="contents">
          <DefaultButton variant="secondary" icon={<ArrowClockwiseIcon />}>
            다시 테스트 하기
          </DefaultButton>
        </Link>
      </div>
    </main>
  );
}
