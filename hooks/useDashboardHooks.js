import React, { useState, useEffect } from "react";
import axios from "@/services/axios";
import API from "@/services/endpoints";
import errorHandler from "@/utils/handler.utils";
import snackbarHooks from "@/hooks/snackbarHooks";


const useDashboardHooks = () => {
    const { snackbar } = snackbarHooks()
    const [dashboardMetrics, setDashboardMetrics] = useState({
        data: {
            dsaData: {},
            peggingData: {}
        },
        error: null
    })
    const [dashboardGraphCount, setDashboardGraphCount] = useState({
        data: {
            dsaData: {},
            peggingData: {}
        },
        error: null
    })

    const fetchDashboardDistinctDetail = async () => {
        try {
            const { data } = await axios.get(API.dashboardDistinctDetail.get());
            if (data.code === "1111") {
                setDashboardMetrics({
                    data: {
                        dsaData: {},
                        peggingData: {}
                    },
                    error: "something went wrong"
                });
            } else {
                setDashboardMetrics({
                    data: data,
                    error: ""
                });
            }
        } catch (error) {
            errorHandler(error)
        }
    };
    const fetchDashboardGraphCount = async () => {
        try {
            const { data } = await axios.get(API.dashboardGraphCount.get());

            if (data.code === "0000") {
                const chartFilterData = (data) => {
                    const result = {}
                    for (const [k, v] of Object.entries(data)) {
                        const temp = v.map((d) => {
                            return ([d.date, d.total * 1])
                        })
                        result[k] = temp
                    }
                    return result
                }

                let dsaData = chartFilterData(data.dsaData)
                let peggingData = chartFilterData(data.peggingData)

                setDashboardGraphCount({
                    data: {
                        dsaData,
                        peggingData
                    },
                    error: ""
                });
            } else {
                setDashboardGraphCount({
                    data: {},
                    error: data.msg
                });
            }

        } catch (error) {
            errorHandler(error)
        }
    };



    return ({
        dashboardMetrics,
        dashboardGraphCount,
        fetchDashboardDistinctDetail,
        fetchDashboardGraphCount
    })
}

export default useDashboardHooks

