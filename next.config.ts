import type { NextConfig } from "next";

function normalizeBasePath(input?: string) {
  if (!input) return undefined;
  if (input === "/") return undefined;

  const withLeadingSlash = input.startsWith("/") ? input : `/${input}`;
  return withLeadingSlash.replace(/\/+$/, "");
}

const configuredBasePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);

const nextConfig: NextConfig = {
  distDir: '.next-static',
  output: 'export',
  ...(configuredBasePath ? { basePath: configuredBasePath } : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
