/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    env: {
        BASE_URL:"https://PricePegging.shubham.co:8090",
        GOOGLE_MAP_KEY: "AIzaSyC1-MUz0bX_Bp_CXU97mm4Nmyf-Hj95rYw"
    },
}

module.exports = nextConfig
