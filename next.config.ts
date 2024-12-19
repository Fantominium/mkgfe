import type { NextConfig } from "next";

 // Start of Selection
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
          hostname: 'assets.example.com',
          port: '',
          pathname: '/account123/**',
          search: '',
        },
      ],
    },
};

export default nextConfig;
