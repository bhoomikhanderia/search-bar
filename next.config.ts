import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["cdn.dummyjson.com"], // Allow external images from this domain
  },
};

export default nextConfig;
