import type { NextConfig } from "next";

const repoBasePath = process.env.NODE_ENV === 'production' ? '/dec4ir-landing' : undefined;

const nextConfig: NextConfig = {
  distDir: '.next-static',
  output: 'export',
  ...(repoBasePath ? { basePath: repoBasePath } : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
