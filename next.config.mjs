/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  // output: "export", // Removed for API routes support
  distDir: "out",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: "",
  assetPrefix: "",
  // Enable for Laravel API
  async rewrites() {
    return [
      {
        source: '/api/laravel/:path*',
        destination: 'http://localhost:8000/api/:path*',
      },
    ];
  },
};

export default nextConfig;
