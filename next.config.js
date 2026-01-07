import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicitly set the workspace root to this directory to avoid conflicts with parent lockfiles
  outputFileTracingRoot: __dirname,

  // Image optimization for better performance
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hcdcxznwnzdhomvmpotr.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'developer.apple.com',
        pathname: '/assets/**',
      },
    ],
    // Modern image formats for better compression
    formats: ['image/avif', 'image/webp'],
    // Limit image sizes for performance
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Enable compression
  compress: true,
  
  // Remove powered-by header for security
  poweredByHeader: false,
  
  // Performance headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        // Cache static assets for 1 year
        source: '/(.*)\\.(ico|png|svg|jpg|jpeg|gif|webp|avif|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  webpack: (config, { isServer }) => {
    config.resolve.alias.canvas = false;
    
    // Suppress webpack cache serialization warnings
    if (!isServer) {
      config.cache = {
        ...config.cache,
        compression: 'gzip',
      };
    }
    
    // Suppress infrastructure logging warnings
    config.infrastructureLogging = {
      level: 'error',
    };
    
    return config;
  },
};

export default nextConfig;