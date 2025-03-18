import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["localhost", "carbon-media.accelerator.net"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: '/0000000kLxE/fc0a7MfuXrmg0ImC79Hewo;1920x2400.png?auto=webp',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'carbon-media.accelerator.net',
        port: '',
        pathname: '/0000000kLxE/fc0a7MfuXrmg0ImC79Hewo;1920x2400.png?auto=webp',
        search: '',
      },
    ],
    unoptimized: true,
    loader: "default",
  },
};

export default nextConfig;
