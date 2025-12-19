import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dreams.lukechriswalker.at",
        pathname: "/admin/**",
      },
    ],
  },
};

export default nextConfig;
