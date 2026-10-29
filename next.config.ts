import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  cacheComponents: false,
  partialPrefetching: false,
  turbopack: {},
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        'better-sqlite3': 'commonjs better-sqlite3',
        '@prisma/orm-sqlite': 'commonjs @prisma/orm-sqlite',
      });
    }
    return config;
  },
};

export default nextConfig;