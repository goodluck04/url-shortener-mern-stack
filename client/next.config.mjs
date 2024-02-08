/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "res.cloudinary.com"
            }
        ]
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    distDir:"build"
};

export default nextConfig;
