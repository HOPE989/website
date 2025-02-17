!process.env.SKIP_ENV_VALIDATION && (await import('./env.mjs'))

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
                port: '',
                pathname: `/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/**`,
            },
        ],
    },

    experimental: {
        taint: true,
    },
};

const config = async () => {
    await loadEnv();
    return nextConfig;
};

export default config;
