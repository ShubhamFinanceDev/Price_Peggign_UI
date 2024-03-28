/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    env: {
         BASE_URL: "http://10.12.12.46:8090",
        //  BASE_URL: "http://192.168.5.208:8080",
        // BASE_URL: "http://localhost:8080",
        GOOGLE_MAP_KEY: "AIzaSyDGDi9QTtbkgayJyH-bHPupXvmh3JAQzRU"
    },
}

module.exports = nextConfig
