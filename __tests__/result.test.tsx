import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Page from "@/app/result/[id]/page";
import type { RecommendationResultResponse } from "@/lib/api/model";

const push = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
  notFound: jest.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

const originalFetch = global.fetch;

const baseResult = {
  result_id: "test-result-id",
  created_at: "2026-01-01T00:00:00Z",
  status: "recommended",
  message: null,
  experience_level: "expert",
  primary_type: {
    key: "uraeok",
    name: "우래옥형",
    character_key: "uraeok",
    match_score: 0.9,
    hashtags: ["진한육향", "깊은감칠맛", "본질파"],
    title: "진하고 든든한 우래옥형",
    subtitle: "가장 진한 고기 향과\n깊은 감칠맛을 좋아해요",
    badge: "본질을 아는 육향파",
    reason: "고기 향이 또렷한 육수를 진짜라고 느끼는 타입이에요.",
    theme_color: "#C98A3C",
  },
  secondary_type: {
    key: "jangchungdong",
    name: "장충동형",
    character_key: "jangchungdong",
    match_score: 0.7,
    hashtags: ["구수한육향", "풍성한감칠맛", "균형파"],
  },
  farthest_type: {
    key: "dongchimi",
    name: "동치미형",
    character_key: "dongchimi",
    match_score: 0.2,
    hashtags: ["시원한동치미", "깔끔한끝맛", "청량파"],
  },
  type_scores: [
    { key: "uraeok", name: "우래옥형", match_score: 0.9 },
    { key: "jangchungdong", name: "장충동형", match_score: 0.7 },
    { key: "uijeongbu", name: "의정부형", match_score: 0.5 },
    { key: "dongchimi", name: "동치미형", match_score: 0.2 },
  ],
  taste_profile: {
    scale: { min: 1, max: 5 },
    traits: [
      { key: "meat_aroma", label: "육향", score: 4.6 },
      { key: "umami", label: "감칠맛", score: 4.1 },
      { key: "buckwheat_aroma", label: "메밀향", score: 3 },
      { key: "acidity", label: "산미", score: 2.2 },
    ],
  },
  recommended_restaurants: [
    {
      rank: 1,
      restaurant_name: "우래옥",
      fit_score: 0.95,
      type_key: "uraeok",
      fit_sentence: "진한 육향이 그대로.",
      evidence_summary: "리뷰에서 육향 언급 다수.",
      scores: { meat_aroma: 5, umami: 4, buckwheat_aroma: 3, acidity: 2 },
      address: "서울 중구",
      map_url: "https://map.example.com/uraeok",
    },
    {
      rank: 2,
      restaurant_name: "필동면옥",
      fit_score: 0.82,
      type_key: "uraeok",
      fit_sentence: "담백함 속 감칠맛.",
      evidence_summary: "깔끔하다는 평.",
      scores: { meat_aroma: 4, umami: 4, buckwheat_aroma: 3, acidity: 3 },
      address: null,
      map_url: "   ", // 유효한 http URL 아님 → 링크가 아닌 div로 렌더
    },
  ],
} satisfies RecommendationResultResponse;

function mockFetchOnce(response: {
  ok: boolean;
  status?: number;
  json: () => Promise<unknown>;
}) {
  global.fetch = jest.fn().mockResolvedValue(response);
}

beforeEach(() => {
  push.mockClear();
});

afterEach(() => {
  global.fetch = originalFetch;
  jest.restoreAllMocks();
});

describe("결과 페이지 (/result/[id])", () => {
  it("id로 조회한 결과를 유형·그래프·맛집으로 렌더링한다", async () => {
    mockFetchOnce({ ok: true, json: async () => baseResult });

    render(await Page({ params: Promise.resolve({ id: "test-result-id" }) }));

    expect(
      await screen.findByRole("heading", { level: 1 }),
    ).toHaveTextContent("진하고 든든한 우래옥형");
    expect(screen.getByText("본질을 아는 육향파")).toBeInTheDocument();

    // 취향 그래프: score는 반올림해 표시 (4.6 → 5)
    expect(screen.getByText("육향")).toBeInTheDocument();
    expect(screen.getByText("5 / 5")).toBeInTheDocument();

    // 2순위 / 최원거리 유형 카드
    expect(screen.getByText("두 번째로 잘 맞는 유형")).toBeInTheDocument();
    expect(screen.getByText("장충동형")).toBeInTheDocument();
    expect(screen.getByText("가장 거리가 먼 유형")).toBeInTheDocument();
    expect(screen.getByText("동치미형")).toBeInTheDocument();
  });

  it("map_url이 http(s)일 때만 맛집을 링크로 렌더링한다", async () => {
    mockFetchOnce({ ok: true, json: async () => baseResult });

    render(await Page({ params: Promise.resolve({ id: "test-result-id" }) }));

    const link = await screen.findByRole("link", { name: /우래옥/ });
    expect(link).toHaveAttribute("href", "https://map.example.com/uraeok");
    expect(link).toHaveAttribute("target", "_blank");

    expect(screen.getByText("필동면옥")).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /필동면옥/ }),
    ).not.toBeInTheDocument();
  });

  it("status가 no_recommendation이면 맛집 대신 안내 문구를 보여준다", async () => {
    mockFetchOnce({
      ok: true,
      json: async () => ({
        ...baseResult,
        status: "no_recommendation",
        message: "조건에 맞는 가게를 아직 못 찾았어요",
        recommended_restaurants: [],
      }),
    });

    render(await Page({ params: Promise.resolve({ id: "test-result-id" }) }));

    expect(
      await screen.findByText("조건에 맞는 가게를 아직 못 찾았어요"),
    ).toBeInTheDocument();
    expect(screen.queryByText("우래옥")).not.toBeInTheDocument();
  });

  it("존재하지 않는 id면 notFound를 호출한다", async () => {
    mockFetchOnce({
      ok: false,
      status: 404,
      json: async () => ({ detail: "결과를 찾을 수 없습니다." }),
    });

    await expect(
      Page({ params: Promise.resolve({ id: "missing" }) }),
    ).rejects.toThrow();
  });

  it("다시 테스트 하기를 누르면 /quiz/branch로 이동한다", async () => {
    mockFetchOnce({ ok: true, json: async () => baseResult });
    const user = userEvent.setup();

    render(await Page({ params: Promise.resolve({ id: "test-result-id" }) }));

    await user.click(
      await screen.findByRole("button", { name: "다시 테스트 하기" }),
    );

    expect(push).toHaveBeenCalledWith("/quiz/branch");
  });
});
