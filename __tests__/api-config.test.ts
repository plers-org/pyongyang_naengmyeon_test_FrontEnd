/** @jest-environment node */
import { getApiOrigin } from "@/lib/api/config";

const originalEnv = process.env.API_ORIGIN;

afterEach(() => {
  if (originalEnv === undefined) {
    delete process.env.API_ORIGIN;
  } else {
    process.env.API_ORIGIN = originalEnv;
  }
});

it("API_ORIGIN이 없으면 에러를 던진다", () => {
  delete process.env.API_ORIGIN;

  expect(() => getApiOrigin()).toThrow("API_ORIGIN이 설정되지 않았습니다.");
});

it("끝에 슬래시가 있으면 제거한다", () => {
  process.env.API_ORIGIN = "http://test-api/";

  expect(getApiOrigin()).toBe("http://test-api");
});

it("슬래시가 없으면 그대로 반환한다", () => {
  process.env.API_ORIGIN = "http://test-api";

  expect(getApiOrigin()).toBe("http://test-api");
});
