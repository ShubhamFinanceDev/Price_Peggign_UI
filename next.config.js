/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    env: {
         BASE_URL: "http://10.12.12.46:80",
        // BASE_URL: "http://localhost:8080",
        GOOGLE_MAP_KEY: "AIzaSyCHM5WiE4qha0N3PXSOACt4_eaOBhS1Ts8"
    },
}

module.exports = nextConfig
