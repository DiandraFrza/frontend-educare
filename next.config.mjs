/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  output: "export",
  distDir: "out",
  images: {
    unoptimized: true,
  },
  // Ensure trailing slashes for consistent static export behavior
  trailingSlash: true,
  // If deploying to root domain, leave empty. If to subdirectory, set to '/subdirectory-name'
  basePath: "",
  assetPrefix: "",
};

export default nextConfig;
