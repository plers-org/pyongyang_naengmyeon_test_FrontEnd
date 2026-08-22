/** @jest-environment node */
import { getRecommendationQuestions } from "@/lib/api/recommendation";

const originalFetch = global.fetch;

beforeEach(() => {
  process.env.API_ORIGIN = "http://test-api";
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ experience_level: "expert", questions: [] }),
  });
});

afterEach(() => {
  global.fetch = originalFetch;
  jest.restoreAllMocks();
});

it("experience_level을 경로에 넣어서 백엔드를 직접 호출한다 (서버 환경)", async () => {
  await getRecommendationQuestions("expert");

  expect(global.fetch).toHaveBeenCalledWith(
    "http://test-api/api/recommendation/questions/expert",
    expect.anything(),
  );
});
