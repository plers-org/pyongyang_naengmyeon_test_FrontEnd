import { getRecommendationQuestions } from "@/lib/api/recommendation";

const originalFetch = global.fetch;

beforeEach(() => {
  process.env.NEXT_PUBLIC_API_BASE_URL = "http://test-api";
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({
      experience_level: "expert",
      questions: [],
    }),
  });
});

afterEach(() => {
  global.fetch = originalFetch;
  jest.restoreAllMocks();
});

it("experience_level을 경로에 넣어서 호출한다", async () => {
  await getRecommendationQuestions("expert");

  expect(global.fetch).toHaveBeenCalledWith(
    "http://test-api/api/recommendation/questions/expert",
    expect.anything(),
  );
});
