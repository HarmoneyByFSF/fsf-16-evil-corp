/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: [
            'cloud.appwrite.io',
            'api.multiavatar.com'
        ],
    }
}

module.exports = nextConfig
