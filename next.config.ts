import type { NextConfig } from "next";

/**
 * FlyPath Travels - Professional Next.js Configuration
 * Optimized for Next.js 15+ and Turbopack.
 */
const nextConfig: NextConfig = {
  /* --- BUILD ERROR SUPPRESSION --- */
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors. This bypasses the strict check.
    ignoreBuildErrors: true,
  },

  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },

  /* --- MODERN PERFORMANCE SETTINGS --- */
  reactStrictMode: true,
  
  // Enable stable experimental features if needed
  experimental: {
    // Required for some modern Turbopack features in Next.js 15/16
    typedRoutes: true, 
  },

  /* --- IMAGE OPTIMIZATION --- */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '://unsplash.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
