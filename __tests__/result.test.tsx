import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Page from "@/app/result/page";
import type { RecommendationResultResponse } from "@/lib/api/types";

const push = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

const baseResult = {
  status: "recommended",
  message: null,
  experience_level: "expert",
  primary_type: {
    key: "uraeok",
    name: "우래옥형",
    character_key: "uraeok",
    match_score: 0.9,
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
  },
  farthest_type: {
    key: "dongchimi",
    name: "동치미형",
    character_key: "dongchimi",
    match_score: 0.2,
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

function seedResult(result: RecommendationResultResponse) {
  sessionStorage.setItem("quizResult", JSON.stringify(result));
}

beforeEach(() => {
  push.mockClear();
  sessionStorage.clear();
});

describe("결과 페이지 (/result)", () => {
  it("세션에 저장된 결과를 유형·그래프·맛집으로 렌더링한다", async () => {
    seedResult(baseResult);
    render(<Page />);

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
    seedResult(baseResult);
    render(<Page />);

    const link = await screen.findByRole("link", { name: /우래옥/ });
    expect(link).toHaveAttribute("href", "https://map.example.com/uraeok");
    expect(link).toHaveAttribute("target", "_blank");

    expect(screen.getByText("필동면옥")).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: /필동면옥/ }),
    ).not.toBeInTheDocument();
  });

  it("status가 no_recommendation이면 맛집 대신 안내 문구를 보여준다", async () => {
    seedResult({
      ...baseResult,
      status: "no_recommendation",
      message: "조건에 맞는 가게를 아직 못 찾았어요",
      recommended_restaurants: [],
    });
    render(<Page />);

    expect(
      await screen.findByText("조건에 맞는 가게를 아직 못 찾았어요"),
    ).toBeInTheDocument();
    expect(screen.queryByText("우래옥")).not.toBeInTheDocument();
  });

  it("세션에 결과가 없으면 에러 화면을 보여주고, 버튼으로 테스트로 되돌린다", async () => {
    const user = userEvent.setup();
    render(<Page />);

    expect(
      await screen.findByRole("heading", { name: "결과를 불러오지 못했냉.." }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "테스트 하러 가기" }));
    expect(push).toHaveBeenCalledWith("/quiz/branch");
  });

  it("다시 테스트 하기를 누르면 세션을 비우고 /quiz/branch로 이동한다", async () => {
    const user = userEvent.setup();
    seedResult(baseResult);
    render(<Page />);

    await user.click(
      await screen.findByRole("button", { name: "다시 테스트 하기" }),
    );

    expect(sessionStorage.getItem("quizResult")).toBeNull();
    expect(push).toHaveBeenCalledWith("/quiz/branch");
  });
});
