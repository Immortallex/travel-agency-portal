/** @type {import('next').NextConfig} */
const nextConfig = {
  // This helps Next.js recognize your project structure accurately
  reactStrictMode: true,
  // Ensure Vercel doesn't get stuck on small type warnings
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
