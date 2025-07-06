/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  
  // Hide Next.js development tools
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
  
  // Disable development overlay
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  
  // Additional dev tool hiding
  experimental: {
    // Disable build activity indicator
    optimizeCss: false,
  },
  
  // Webpack configuration to hide dev tools
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      // Hide webpack build progress
      config.infrastructureLogging = {
        level: 'error',
      };
    }
    return config;
  },
};

module.exports = nextConfig;