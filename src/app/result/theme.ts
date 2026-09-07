import type { CircleGraphColor } from "@/components/graph/CircleGraph";

export type TypeKey = "uraeok" | "uijeongbu" | "jangchungdong" | "dongchimi";

export const KEY_TO_THEME: Record<TypeKey, CircleGraphColor> = {
  uraeok: "orange",
  dongchimi: "blue",
  uijeongbu: "green",
  jangchungdong: "warmGray",
};

export const CHARACTER_IMAGE: Record<TypeKey, string> = {
  uraeok: "/characters/우래옥형.svg",
  uijeongbu: "/characters/의정부형.svg",
  jangchungdong: "/characters/장충동형.svg",
  dongchimi: "/characters/동치미형.svg",
};

export const TYPE_LABEL: Record<TypeKey, string> = {
  uraeok: "우래옥형",
  uijeongbu: "의정부형",
  jangchungdong: "장충동형",
  dongchimi: "동치미형",
};

export const TYPE_TAGS: Record<TypeKey, string[]> = {
  uraeok: ["진한육향", "깊은감칠맛", "본질파"],
  dongchimi: ["시원한동치미", "깔끔한끝맛", "청량파"],
  uijeongbu: ["맑고담백", "은근한여운", "담백파"],
  jangchungdong: ["구수한육향", "풍성한감칠맛", "균형파"],
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
  pillIconColor: string;
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
