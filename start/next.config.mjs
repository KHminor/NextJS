/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "/START"
  // async redirects() {
  //   return [
  //     {
  //       source: '/check/:slug*',
  //       destination: '/',
  //       permanent: true
  //     }
  //   ]
  // }
};

export default nextConfig;
