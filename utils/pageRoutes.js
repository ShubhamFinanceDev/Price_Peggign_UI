const pageRoutes = {
    DASHBOARD_PAGE: () => `/`,
    SIGN_IN_PAGE: () => `/sign-in`,
    PRICE_PEGGING_PAGE: () => `/price-pegging`,
    DSA_PAGE: () => `/dsa`,
    DSA_LOCATION_MAP: (lattitude, longitude) => `/dsa/location?lat=${lattitude}&lng=${longitude}`

}
export default pageRoutes