/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://51.250.29.165/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
