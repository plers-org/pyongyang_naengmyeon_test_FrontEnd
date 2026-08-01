import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Page from "@/app/quiz/experienced/page";

const push = jest.fn();
const back = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push, back }),
}));

describe("경험자 문항 플로우", () => {
  beforeEach(() => {
    push.mockClear();
    back.mockClear();
  });

  it("첫 문항과 진행도를 보여주고, 선택 전엔 다음 버튼이 비활성화된다", () => {
    render(<Page />);

    expect(screen.getByText("Q1")).toBeInTheDocument();
    expect(screen.getByText("1 / 6")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "육수 첫 느낌은 어때야 만족?",
    );
    expect(screen.getByRole("button", { name: "다음" })).toBeDisabled();
  });

  it("옵션을 선택하면 다음 버튼이 활성화된다", async () => {
    const user = userEvent.setup();
    render(<Page />);

    await user.click(screen.getByRole("button", { name: "진한 고기 향이 확 올라와야" }));

    expect(screen.getByRole("button", { name: "다음" })).toBeEnabled();
  });

  it("다음을 누르면 다음 문항으로 넘어가고, 새 문항은 다시 비활성화 상태다", async () => {
    const user = userEvent.setup();
    render(<Page />);

    await user.click(screen.getByRole("button", { name: "진한 고기 향이 확 올라와야" }));
    await user.click(screen.getByRole("button", { name: "다음" }));

    expect(screen.getByText("Q2")).toBeInTheDocument();
    expect(screen.getByText("2 / 6")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "다음" })).toBeDisabled();
  });

  it("뒤로가기를 누르면 이전 문항으로 돌아가고, 이전 선택이 유지된다", async () => {
    const user = userEvent.setup();
    render(<Page />);

    await user.click(screen.getByRole("button", { name: "진한 고기 향이 확 올라와야" }));
    await user.click(screen.getByRole("button", { name: "다음" }));
    expect(screen.getByText("Q2")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "뒤로가기" }));

    expect(screen.getByText("Q1")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "다음" })).toBeEnabled();
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
      "진한 고기 향이 확 올라와야",
      `"그게 매력인데?"`,
      "툭툭 끊기는 거친 순면",
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

    await user.click(screen.getByRole("button", { name: `"이 정도는 자극적이어야 먹은 것 같아"` }));
    await user.click(finishButton);

    expect(push).toHaveBeenCalledWith("/result");
  });
});
