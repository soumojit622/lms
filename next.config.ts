// next.config.js or next.config.ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "thinklab-lms.fly.storage.tigris.dev",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
