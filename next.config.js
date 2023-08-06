/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => [
    {
      source: "/list",
      destination: "/list/new",
      permanent: true,
    },
  ],
  images: {
    domains: ["ui-avatars.com"],
  },
};

module.exports = nextConfig;
