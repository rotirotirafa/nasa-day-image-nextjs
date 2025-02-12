import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'apod.nasa.gov',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
  env: {
    URL_API_NASA: process.env.URL_API_NASA,
    APOD_NASA_KEY: process.env.APOD_NASA_KEY,
  },
};

export default nextConfig;
