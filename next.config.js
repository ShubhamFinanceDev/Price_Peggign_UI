/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    env: {
         BASE_URL: "http://10.12.12.46:8090",
        //  BASE_URL: "http://192.168.5.208:8090",
        // BASE_URL: "http://localhost:8080",
        GOOGLE_MAP_KEY: "AIzaSyC1-MUz0bX_Bp_CXU97mm4Nmyf-Hj95rYw"
    },
}

module.exports = nextConfig
