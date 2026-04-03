import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // This allows images from Unsplash to load on your live domain
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '://unsplash.com',
      },
    ],
  },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
