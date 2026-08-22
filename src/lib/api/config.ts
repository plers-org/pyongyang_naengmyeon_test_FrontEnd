export const API_PREFIX = "/api";
export const PROXY_PREFIX = "/backend";

export function getApiOrigin(): string {
  const origin = process.env.API_ORIGIN;
  if (!origin) {
    throw new Error("API_ORIGIN이 설정되지 않았습니다.");
  }
  return origin.replace(/\/+$/, "");
}
