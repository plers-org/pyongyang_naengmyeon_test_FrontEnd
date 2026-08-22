import { API_PREFIX, PROXY_PREFIX, getApiOrigin } from "./config";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

function resolveUrl(path: string): string {
  if (typeof window === "undefined") {
    return `${getApiOrigin()}${API_PREFIX}${path}`;
  }
  return `${PROXY_PREFIX}${path}`;
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const headers = new Headers(init?.headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }
  if (init?.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(resolveUrl(path), {
    ...init,
    headers,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message = body?.detail?.[0]?.msg ?? `API 요청 실패 (${res.status})`;
    throw new ApiError(res.status, message);
  }

  return res.json();
}
