import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Page from "@/app/quiz/beginner/page";

const push = jest.fn();
const back = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push, back }),
}));

describe("입문자 문항 플로우", () => {
  beforeEach(() => {
    push.mockClear();
    back.mockClear();
  });

  it("첫 문항과 진행도를 보여주고, 선택 전엔 다음 버튼이 비활성화된다", () => {
    render(<Page />);

    expect(screen.getByText("Q1")).toBeInTheDocument();
    expect(screen.getByText("1 / 6")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "좋아하는 국물의 첫 느낌은?",
    );
    expect(screen.getByRole("button", { name: "다음" })).toBeDisabled();
  });

  it("옵션을 선택하면 다음 버튼이 활성화된다", async () => {
    const user = userEvent.setup();
    render(<Page />);

    await user.click(screen.getByRole("button", { name: "깊고 진한 고기 맛과 향이 느껴져야" }));

    expect(screen.getByRole("button", { name: "다음" })).toBeEnabled();
  });

  it("다음을 누르면 다음 문항으로 넘어가고, 새 문항은 다시 비활성화 상태다", async () => {
    const user = userEvent.setup();
    render(<Page />);

    await user.click(screen.getByRole("button", { name: "깊고 진한 고기 맛과 향이 느껴져야" }));
    await user.click(screen.getByRole("button", { name: "다음" }));

    expect(screen.getByText("Q2")).toBeInTheDocument();
    expect(screen.getByText("2 / 6")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "다음" })).toBeDisabled();
  });

  it("첫 문항에서 뒤로가기를 누르면 router.back이 호출된다", async () => {
    const user = userEvent.setup();
    render(<Page />);

    await user.click(screen.getByRole("button", { name: "뒤로가기" }));

    expect(back).toHaveBeenCalled();
  });

  it("마지막 문항까지 진행하면 버튼 텍스트가 바뀌고, 누르면 /result로 이동한다", async () => {
    const user = userEvent.setup();
    render(<Page />);

    const firstOptions = [
      "깊고 진한 고기 맛과 향이 느껴져야",
      `"그 맛으로 먹는 건데?"`,
      "메밀 향이 느껴지고 툭툭 끊기는 거친 면",
      "두툼한 편육",
      "육향 진한",
    ];

    for (const optionText of firstOptions) {
      await user.click(screen.getByRole("button", { name: optionText }));
      await user.click(screen.getByRole("button", { name: "다음" }));
    }

    expect(screen.getByText("Q6")).toBeInTheDocument();
    expect(screen.getByText("6 / 6")).toBeInTheDocument();

    const finishButton = screen.getByRole("button", { name: "평냉 취향 확인하기" });
    expect(finishButton).toBeDisabled();

    await user.click(screen.getByRole("button", { name: "맛과 향이 진하고 확실한" }));
    await user.click(finishButton);

    expect(push).toHaveBeenCalledWith("/result");
  });
});
