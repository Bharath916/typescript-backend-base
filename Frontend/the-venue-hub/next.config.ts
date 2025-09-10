import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  distDir: "dist",
  eslint: {
    // Warning: This will allow production builds to complete
    // even if ESLint errors are present.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
