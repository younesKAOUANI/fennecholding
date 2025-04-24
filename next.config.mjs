/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    domains: ['placehold.co', 'fennecholding.dz'],
  },
  i18n: {
    locales: ['en', 'fr', 'ar'],
    defaultLocale: 'fr',
  },
};

export default nextConfig;