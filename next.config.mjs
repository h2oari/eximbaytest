const path = require("path");

/** @type {import('next').NextConfig} */

// Remove this if you're not using Fullcalendar features
const withTM = require("next-transpile-modules")([
  // '@fullcalendar/common',
  // '@fullcalendar/react',
  // '@fullcalendar/daygrid',
  // '@fullcalendar/list',
  // '@fullcalendar/timegrid',
]);

module.exports = withTM({
  // distDir: 'build',
  output: "standalone",
  trailingSlash: true,
  reactStrictMode: false,
  experimental: {
    esmExternals: false,
    externalDir: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  webpack(config) {
    config.resolve = {
      alias: {
        "@src": path.join(__dirname, "src"),
        "@images": path.join(__dirname, "public", "images"),
      },
      ...config.resolve,
    };
    return config;
  },
});
