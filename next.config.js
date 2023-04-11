/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { domains: ['fb93-158-140-180-2.ngrok-free.app'], },
  async rewrites() {
    return [
      {
        source: '/admin/products/v1',
        destination: 'https://fb93-158-140-180-2.ngrok-free.app/admin/products/v1',
      }
    ];
  },
};

module.exports = nextConfig;
