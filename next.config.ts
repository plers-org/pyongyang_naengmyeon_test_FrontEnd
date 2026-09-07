import type { NextConfig } from "next";
import { API_PREFIX, PROXY_PREFIX, getApiOrigin } from "./src/lib/api/config";

const nextConfig: NextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  async rewrites() {
    return [
      {
        source: `${PROXY_PREFIX}/:path*`,
        destination: `${getApiOrigin()}${API_PREFIX}/:path*`,
      },
    ];
  },
};

export default nextConfig;
