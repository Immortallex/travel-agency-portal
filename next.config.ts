import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // In Next.js 16, eslint is handled differently, so we remove the 'eslint' key
};

export default nextConfig;
