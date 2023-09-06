/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
  images: {
    domains: ["s3.ap-northeast-2.amazonaws.com"],
    // S3 호스트를 여기에 추가
  },
};
module.exports = nextConfig;
