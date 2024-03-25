import path from "path";

/** @type {import('next').NextConfig} */

// Remove this if you're not using Fullcalendar features
import withTM from "next-transpile-modules";

export default withTM({
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
        "@src": path.join(new URL(".", import.meta.url).pathname, "src"),
        "@images": path.join(
          new URL(".", import.meta.url).pathname,
          "public",
          "images"
        ),
      },
      ...config.resolve,
    };
    return config;
  },
});
