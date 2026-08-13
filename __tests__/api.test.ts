import { apiFetch, ApiError } from "@/lib/api";

const originalEnv = process.env.NEXT_PUBLIC_API_BASE_URL;

beforeEach(() => {
  process.env.NEXT_PUBLIC_API_BASE_URL = "http://test-api";
  global.fetch = jest.fn();
});

afterEach(() => {
  process.env.NEXT_PUBLIC_API_BASE_URL = originalEnv;
  jest.restoreAllMocks();
});

it("정상 응답이면 JSON을 반환한다", async () => {
  (global.fetch as jest.Mock).mockResolvedValue({
    ok: true,
    json: async () => ({ hello: "world" }),
  });

  await expect(apiFetch("/api/test")).resolves.toEqual({ hello: "world" });
});

it("실패 응답이면 ApiError를 던진다", async () => {
  (global.fetch as jest.Mock).mockResolvedValue({
    ok: false,
    status: 422,
    json: async () => ({ detail: [{ msg: "잘못된 요청" }] }),
  });

  await expect(apiFetch("/api/test")).rejects.toThrow(ApiError);
});
