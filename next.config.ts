import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/mahallat",
  trailingSlash: false,
};

export default nextConfig;
