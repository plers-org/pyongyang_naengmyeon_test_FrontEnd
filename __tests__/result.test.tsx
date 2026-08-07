import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page, { generateStaticParams } from "@/app/result/[type]/page";

const notFound = jest.fn(() => {
  throw new Error("NEXT_NOT_FOUND");
});

jest.mock("next/navigation", () => ({
  notFound: () => notFound(),
}));

describe("결과 페이지", () => {
  beforeEach(() => {
    notFound.mockClear();
  });

  it("유효한 타입이면 해당 유형의 결과 내용을 보여준다", async () => {
    const jsx = await Page({
      params: Promise.resolve({ type: "우래옥형" }),
    });
    render(jsx);

    expect(
      screen.getByRole("heading", { level: 1 }),
    ).toHaveTextContent("진하고 든든한 우래옥형");
    expect(screen.getByText("맑고 순수한 맛에서 진짜 깊이를 찾아요")).toBeInTheDocument();
    expect(screen.getByText("취향 그래프")).toBeInTheDocument();
    expect(screen.getByText("유형 도출 이유")).toBeInTheDocument();
    expect(screen.getByText("잘 맞는 평냉집 추천")).toBeInTheDocument();
    expect(screen.getAllByText("장충동평양면옥")).toHaveLength(2);
    expect(screen.getByRole("link", { name: /다시 테스트 하기/ })).toHaveAttribute(
      "href",
      "/quiz/branch",
    );
  });

  it("URL 인코딩된 타입도 정상적으로 디코딩해 처리한다", async () => {
    const jsx = await Page({
      params: Promise.resolve({ type: encodeURIComponent("장충동형") }),
    });
    render(jsx);

    expect(
      screen.getByRole("heading", { level: 1 }),
    ).toHaveTextContent("구수하고 풍성한 장충동형");
  });

  it("존재하지 않는 타입이면 notFound를 호출한다", async () => {
    await expect(
      Page({ params: Promise.resolve({ type: "없는타입" }) }),
    ).rejects.toThrow();

    expect(notFound).toHaveBeenCalled();
  });

  it("generateStaticParams는 4개 유형을 모두 반환한다", () => {
    expect(generateStaticParams()).toEqual([
      { type: "우래옥형" },
      { type: "동치미형" },
      { type: "의정부형" },
      { type: "장충동형" },
    ]);
  });
});
