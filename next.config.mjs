import path from "path";
import withTM from "next-transpile-modules";

const nextConfig = {
  // Remove this if you're not using Fullcalendar features
  ...withTM({
    // '@fullcalendar/common',
    // '@fullcalendar/react',
    // '@fullcalendar/daygrid',
    // '@fullcalendar/list',
    // '@fullcalendar/timegrid',
  }),
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
    config.resolve.alias["@src"] = path.join(__dirname, "src");
    config.resolve.alias["@images"] = path.join(__dirname, "public", "images");
    return config;
  },
};

export default nextConfig;
