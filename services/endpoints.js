const opt = {
    zone: "zone",
    region: "region",
    from_date: "fromDate",
    to_date: "toDate",
    application_no: "applicationNo",
    upload_date: "uploadDate"
}

const API = {
    signIn: {
        post: () => `/loginValidation`
    },
    addUser: {
        post: () => `/addUser`
    },
    filterOption: {
        get: () => `/filterOption`
    },
    dsa: {
        get: (options) => {
            let queryParams = [];
            for (const [k, v] of Object.entries(options)) {
                if (v != null) {
                    queryParams.push(`${opt[k]}=${v}`);
                }
            }
            let queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
            return `/exportData${queryString}`
        },
        post: () => `/dsaExportUpload`,
    },
    pricePegging: {
        get: (options, page =1) => {
            let queryParams = [];
            for (const [k, v] of Object.entries(options)) {
                if (v != null) {
                    console.log("key"+k);
                    queryParams.push(`${opt[k]}=${v}`);
                }
            }
            let queryString = queryParams.length > 0 ? `&${queryParams.join('&')}` : '';
           console.log("Qstring"+queryParams.length)
            return `pricePeggingData?pageNo=${page}${queryString}`
        },
        post: () => `/pricePeggingUpload`,
    },
    dashboardDistinctDetail: {
        get: () => `/dashboardDistinctDetail`
    },
    dashboardGraphCount: {
        get: () => `/dashboardGraphCount`
    },
    pricePeggingChatData: {
        get: (zone, location) => `/lineChartForPricePegging/${zone}/${location}`
    },
    pricePeggingTrends: {
        get: (query = "") => `/getDataForMap?${query}`
    },
    dsaReport: {
        get: (flag = "R") => `/invokeDsaReport/${flag}`
    }
}

export default API;   