/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Remove 'output: export' to enable ISR
  // output: 'export', // This disables ISR, so we remove it
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  generateEtags: true, // Enable ETags for better caching with ISR
  
  // ISR-specific optimizations
  experimental: {
    // Enable ISR for better performance
    isrMemoryCacheSize: 0, // Disable in-memory cache to rely on disk cache
  },
  
  // Optimize webpack bundle
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            enforce: true,
          },
        },
      };
    }
    return config;
  },
  
  // Headers for better caching with ISR
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=1800, stale-while-revalidate=3600',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=300, stale-while-revalidate=600',
          },
        ],
      },
    ];
  },
  
  // Environment variables for build optimization
  env: {
    CUSTOM_KEY: 'production',
  },
};