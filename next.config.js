/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    env: {
        BASE_URL: "http://10.12.12.46:80",
        GOOGLE_MAP_KEY: "AIzaSyDGDi9QTtbkgayJyH-bHPupXvmh3JAQzRU"
    },
}

module.exports = nextConfig
