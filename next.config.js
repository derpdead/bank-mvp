/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    SERVICE_API_KEY: process.env.SERVICE_API_KEY,
  },
}
