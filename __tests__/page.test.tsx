import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Page from "@/app/page";

const push = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

describe("Home (인트로)", () => {
  it("타이틀과 시작 버튼을 렌더링한다", () => {
    render(<Page />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "나는어떤 평양냉면 타입?",
    );
    expect(screen.getByRole("button", { name: "내 평냉 취향 찾기" })).toBeInTheDocument();
  });

  it("버튼을 누르면 /quiz/branch로 이동한다", async () => {
    const user = userEvent.setup();
    render(<Page />);

    await user.click(screen.getByRole("button", { name: "내 평냉 취향 찾기" }));

    expect(push).toHaveBeenCalledWith("/quiz/branch");
  });
});
