import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "media.formula1.com" },
      { hostname: "res.cloudinary.com" },
      { hostname: "www.formula1.com" },
    ],
  },
};

export default nextConfig;
