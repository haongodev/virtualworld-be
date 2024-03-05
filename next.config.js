
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: `/${process.env.DEFAULT_LANGUAGE}`,
        permanent: true,
      },
      {
        source: '/xem-phim/:episode',
        destination: `/${process.env.DEFAULT_LANGUAGE}/xem-phim/:episode`,
        permanent: true,
      },
      {
        source: '/xem-phim/:episode/:slug',
        destination: `/${process.env.DEFAULT_LANGUAGE}/xem-phim/:episode/:slug`,
        permanent: true,
      },
      {
        source: '/danh-muc/:slug*',
        destination: `/${process.env.DEFAULT_LANGUAGE}/danh-muc/:slug*`,
        permanent: true,
      },
      {
        source: '/nam-phat-hanh/:slug*',
        destination: `/${process.env.DEFAULT_LANGUAGE}/nam-phat-hanh/:slug*`,
        permanent: true,
      },
      {
        source: '/quoc-gia/:slug*',
        destination: `/${process.env.DEFAULT_LANGUAGE}/quoc-gia/:slug*`,
        permanent: true,
      },
      {
        source: '/the-loai/:slug*',
        destination: `/${process.env.DEFAULT_LANGUAGE}/the-loai/:slug*`,
        permanent: true,
      },
      {
        source: '/trang/:slug',
        destination: `/${process.env.DEFAULT_LANGUAGE}/trang/:slug`,
        permanent: true,
      },
    ]
  },
  productionBrowserSourceMaps: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    BASE_URL: process.env.NEXT_PUBLIC_URL,
    DEFAULT_LANGUAGE: process.env.DEFAULT_LANGUAGE,
  },
  reactStrictMode: false,
}

module.exports = nextConfig
