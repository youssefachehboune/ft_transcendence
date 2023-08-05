/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
		remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
    ],
    domains: ['robohash.org', 'cdn.intra.42.fr', 'lh3.googleusercontent.com', 'localhost', 'ui-avatarsx70.com','api.dicebear.com'],
    formats: ['image/avif', 'image/avif', 'image/png', 'image/svg+xml'],
  },
}


module.exports = nextConfig
