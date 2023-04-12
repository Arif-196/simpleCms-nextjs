/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/public/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/admin/products/v1',
        destination: 'http://localhost:8080/admin/products/v1',
      }
    ];
  },
};

module.exports = nextConfig;
