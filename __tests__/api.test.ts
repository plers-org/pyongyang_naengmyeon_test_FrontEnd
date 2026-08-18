import { apiFetch, ApiError } from "@/lib/api/client";

const originalEnv = process.env.NEXT_PUBLIC_API_BASE_URL;
const originalFetch = global.fetch;

beforeEach(() => {
  process.env.NEXT_PUBLIC_API_BASE_URL = "http://test-api";
  global.fetch = jest.fn();
});

afterEach(() => {
  if (originalEnv === undefined) {
    delete process.env.NEXT_PUBLIC_API_BASE_URL;
  } else {
    process.env.NEXT_PUBLIC_API_BASE_URL = originalEnv;
  }
  global.fetch = originalFetch;
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

it("Headers 인스턴스로 넘긴 커스텀 헤더도 유지된다", async () => {
  (global.fetch as jest.Mock).mockResolvedValue({
    ok: true,
    json: async () => ({}),
  });

  await apiFetch("/api/test", {
    headers: new Headers({ Authorization: "Bearer test" }),
  });

  const [, options] = (global.fetch as jest.Mock).mock.calls[0];
  expect(options.headers.get("Authorization")).toBe("Bearer test");
  expect(options.headers.get("Accept")).toBe("application/json");
});
