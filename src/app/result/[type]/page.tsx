import { notFound } from "next/navigation";
import type { CircleGraphColor } from "@/components/graph/CircleGraph";

type ResultType = "우래옥형" | "동치미형" | "의정부형" | "장충동형";

type TasteGraph = {
  육향: number;
  감칠맛: number;
  메밀향: number;
  산미: number;
};

type ResultData = {
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

const RESULTS: Record<ResultType, ResultData> = {
  우래옥형: {
    type: "우래옥형",
    themeColor: "orange",
    characterImage: "",
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
    characterImage: "",
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
    characterImage: "",
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
    characterImage: "",
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

  // TODO: 결과 화면 UI
  return <div className="text-black">{result.name || result.type}</div>;
}
