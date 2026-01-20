import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { dev }) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    
    if (dev) {
      config.watchOptions = {
        poll: 500,
        aggregateTimeout: 300,
        ignored: /node_modules/,
      };
    }
    return config;
  },
};

export default nextConfig;
