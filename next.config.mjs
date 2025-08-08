/** @type {import('next').NextConfig} */
const nextConfig = {
 i18n: {
  locales: ['es-ES', 'en-US'],
  defaultLocale: 'es-ES',
 },
 experimental: {
  serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs']
 }
};

export default nextConfig;
