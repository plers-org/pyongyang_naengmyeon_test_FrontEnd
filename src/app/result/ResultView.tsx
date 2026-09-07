import { DefaultButton } from "@/components/common/DefaultButton";
import { CircleGraph } from "@/components/graph/CircleGraph";
import { GeoAltFill } from "@/components/icons/GeoAltFill";
import type { RecommendationResultResponse } from "@/lib/api/model";
import { CharacterAvatar } from "./components/CharacterAvatar";
import { ResultShareBar } from "./components/ResultShareBar";
import { Section } from "./components/Section";
import { TypeMatchCard } from "./components/TypeMatchCard";
import { KEY_TO_THEME, THEME_STYLES, type TypeKey } from "./theme";

export function ResultView({
  result,
}: {
  result: RecommendationResultResponse;
}) {
  const {
    primary_type,
    secondary_type,
    farthest_type,
    taste_profile,
    recommended_restaurants,
    status,
  } = result;
  const themeColor = KEY_TO_THEME[primary_type.key as TypeKey];
  const theme = THEME_STYLES[themeColor];

  return (
    <main className={`flex min-h-screen flex-col pb-15 ${theme.pageBg}`}>
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
              <p className="text-body1 text-warm-gray-60">{result.message}</p>
            ) : (
              recommended_restaurants.map((r, i) => {
                const trimmedMapUrl = r.map_url?.trim();
                const mapUrl =
                  trimmedMapUrl && /^https?:\/\//i.test(trimmedMapUrl)
                    ? trimmedMapUrl
                    : undefined;
                const Pill = mapUrl ? "a" : "div";

                return (
                  <Pill
                    key={`${r.restaurant_name}-${i}`}
                    {...(mapUrl
                      ? {
                          href: mapUrl,
                          target: "_blank",
                          rel: "noopener noreferrer",
                        }
                      : {})}
                    className={`flex items-center gap-2 rounded-[14px] px-3 py-2.5 ${theme.pillBg}`}
                  >
                    <GeoAltFill
                      className={`size-4 shrink-0 ${theme.pillIconColor}`}
                    />
                    <span className={`text-label ${theme.pillText}`}>
                      {r.restaurant_name}
                    </span>
                  </Pill>
                );
              })
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

      <div className="px-5 pt-3">
        {/* TODO: 지도 라우트 나오면 활성화 */}
        <DefaultButton variant="primary" icon={<GeoAltFill />} disabled>
          평냉 지도 보기
        </DefaultButton>
      </div>

      <ResultShareBar
        shareText={`나는 ${primary_type.name}! ${primary_type.badge}`}
        pageBg={theme.pageBg}
      />
    </main>
  );
}
