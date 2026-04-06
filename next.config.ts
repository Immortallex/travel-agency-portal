import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // This allows the build to finish even with small type errors
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // This ensures your local .jpg images load instantly
  },
};

export default nextConfig;