/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'carbon-media.accelerator.net',
          pathname: '/**',
        },
      ],
    },
  }
  
  export default nextConfig;