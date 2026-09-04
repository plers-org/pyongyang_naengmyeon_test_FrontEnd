import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Page from "@/app/quiz/experienced/page";

const push = jest.fn();
const back = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push, back }),
}));

const originalFetch = global.fetch;

const mockQuestions = [
  {
    question_id: 1,
    question_text: "육수 첫 느낌은 어때야 만족?",
    choices: [
      { choice_id: 1, choice_text: "진한 고기 향이 확 올라와야" },
      { choice_id: 2, choice_text: "슴슴한데 감칠맛이 은은히 있어야" },
    ],
    progress: 50,
  },
  {
    question_id: 2,
    question_text: "두 번째 문항",
    choices: [{ choice_id: 1, choice_text: "선택지" }],
    progress: 100,
  },
];

beforeEach(() => {
  push.mockClear();
  back.mockClear();
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      experience_level: "expert",
      questions: mockQuestions,
    }),
  });
});

afterEach(() => {
  global.fetch = originalFetch;
});

describe("경험자 문항 플로우", () => {
  it("첫 문항을 보여주고, 선택 전엔 다음 버튼이 비활성화된다", async () => {
    render(await Page());

    expect(screen.getByText("Q2")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "육수 첫 느낌은 어때야 만족?",
    );
    expect(screen.getByRole("button", { name: "다음" })).toBeDisabled();
  });

  it("옵션을 선택하면 다음 버튼이 활성화된다", async () => {
    const user = userEvent.setup();
    render(await Page());

    await user.click(
      screen.getByRole("button", { name: "진한 고기 향이 확 올라와야" }),
    );

    expect(screen.getByRole("button", { name: "다음" })).toBeEnabled();
  });

  it("다음을 누르면 다음 문항으로 넘어간다", async () => {
    const user = userEvent.setup();
    render(await Page());

    await user.click(
      screen.getByRole("button", { name: "진한 고기 향이 확 올라와야" }),
    );
    await user.click(screen.getByRole("button", { name: "다음" }));

    expect(screen.getByText("Q3")).toBeInTheDocument();
  });

  it("첫 문항에서 뒤로가기를 누르면 router.back이 호출된다", async () => {
    const user = userEvent.setup();
    render(await Page());

    await user.click(screen.getByRole("button", { name: "뒤로가기" }));

    expect(back).toHaveBeenCalled();
  });
});
