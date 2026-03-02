import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "media.formula1.com" },
      { hostname: "res.cloudinary.com" },
      { hostname: "www.formula1.com" },
      { hostname: "www.racefans.net" },
      { hostname: "cdn-1.motorsport.com" },
      { hostname: "cdn-2.motorsport.com" },
      { hostname: "cdn-3.motorsport.com" },
      { hostname: "cdn-4.motorsport.com" },
      { hostname: "cdn-5.motorsport.com" },
      { hostname: "cdn-6.motorsport.com" },
      { hostname: "cdn-7.motorsport.com" },
      { hostname: "cdn-8.motorsport.com" },
      { hostname: "cdn-9.motorsport.com" },
    ],
  },
};

export default nextConfig;
