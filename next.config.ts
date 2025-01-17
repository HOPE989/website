import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
                port: '',
                pathname: `/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/**`,
            }
        ],
    },
};

export default nextConfig;
