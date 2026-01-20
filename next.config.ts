import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: true,
    images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", 
      },
    ],
  },
      allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
};



export default nextConfig;
