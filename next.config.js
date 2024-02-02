/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    env: {
        BASE_URL: "http://localhost:8080",
        GOOGLE_MAP_KEY: "AIzaSyDGDi9QTtbkgayJyH-bHPupXvmh3JAQzRU"
    },
}

module.exports = nextConfig
