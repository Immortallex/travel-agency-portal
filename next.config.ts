import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allows high-end photos from Unsplash to load
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '://unsplash.com',
      },
    ],
    unoptimized: false,
  },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;