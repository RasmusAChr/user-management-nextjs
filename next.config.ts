import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // webpack: (config) => {
  //   // If ignored exists and is an array, clone it, else start fresh
  //   const existingIgnored = Array.isArray(config.watchOptions?.ignored)
  //     ? config.watchOptions.ignored
  //     : [];

  //   // Create a new watchOptions object instead of modifying the existing one
  //   config.watchOptions = {
  //     ...config.watchOptions,
  //     ignored: [
  //       ...existingIgnored,
  //       '**/node_modules/**',
  //       '**/.git/**',
  //       '**/Application Data/**',
  //       '**/AppData/**',
  //       '**/.prisma/**',
  //       '**/Andre computere/**',
  //       '**/OneDrive/**',
  //     ],
  //   };

  //   return config;
  // },
};

export default nextConfig;