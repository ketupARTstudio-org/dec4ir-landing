import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: '.next-static',
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
