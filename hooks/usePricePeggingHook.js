import React, { useState, useEffect } from "react";
import axios from "@/services/axios";
import API from "@/services/endpoints";
import errorHandler from "@/utils/handler.utils";
import pageRoutes from "@/utils/pageRoutes";
import snackbarHooks from "@/hooks/snackbarHooks";
import { useRef } from "react";


const searchQueryInitialState = {
    zone: null,
    region: null,
    from_date: null,
    to_date: null
}

const usePricePeggingHook = () => {
    const { snackbar } = snackbarHooks()

    const fileInputRef = useRef(null);

    const [searchQuery, setSearchQuery] = useState({ ...searchQueryInitialState })
    const [uploadFile, setUploadFile] = useState({
        file: [],
        error: ""
    })
    const [pricePegging, setPricePegging] = useState({
        totalCount: 0,

    })
    const [filterOption, setFilterOptions] = useState({})
    const [trends, setTrends] = useState({
        data: [],
        error: "",
        status: "ideal"
    })

    const searchQueryChangeHandler = (e) => {
        const { name, value } = e.target;
        const prevState = { ...searchQuery };
        prevState[name] = value;
        setSearchQuery(prevState);
    }

    const uploadFileChangeHandler = (e) => {
        const { name, value, files } = e.target;
        if (files?.[0]?.type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            setUploadFile({ file: [], error: "Wrong file format" })
        } else {
            setUploadFile({ file: files, error: "" })
        }
    }

    const fetchAllFilterOptions = async () => {
        try {
            const { data } = await axios.get(API.filterOption.get());
            setFilterOptions(data)
        } catch (error) {
            errorHandler(error)
        }
    };
    const fetchPricePeggingChatData = async (zone, location) => {
        try {
            if (!(zone && location)) {
                snackbar("Zone & location required")
                return
            }
            const { data: { code = "1111", msg = "", pricePeggingLineCharts = [] } } = await axios.get(API.pricePeggingChatData.get(zone, location));
            if (code == "0000") {

                const lagend = ["uploadDate", "Minimum", "Maximum", "Average"]
                const arrayOfData = pricePeggingLineCharts.map(({
                    minimumRate, maximumRate, averageRate, uploadDate
                }) => [uploadDate, minimumRate * 1, maximumRate * 1, averageRate * 1])
                return [lagend, ...arrayOfData]
            } else {
                snackbar(msg)
                return []
            }
        } catch (error) {
            errorHandler(error)
            return []
        }
    };

    const fetchPricePegging = async (e) => {
        e.preventDefault()
        try {
            const { from_date, to_date } = searchQuery
            if (from_date != null && to_date == null || from_date == null && to_date != null) {
                setPricePegging({ data: "", error: "Both From date and To date are required for date range search." });
                return
            }
            const { data } = await axios.get(API.pricePegging.get({ ...searchQuery }));

            if (data.code === "1111") {
                setPricePegging({
                    data: [],
                    error: data.msg
                });
            } else {
                setPricePegging({
                    data: data.pricePeggingList.slice(0, 1000),
                    error: "",
                    totalCount: data.totalCount,

                });
            }



        } catch (error) {
            errorHandler(error)
        }
    };

    const uploadPricePeggingFile = async (e) => {
        e.preventDefault()
        try {
            if (uploadFile.file.length < 0) { return }
            const header = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }

            const formData = new FormData();
            formData.append('file', uploadFile.file[0]);

            const { data } = await axios.post(API.pricePegging.post(), formData, header);

            if (data.code == "1111") {
                setUploadFile(state => ({ ...state, error: data.msg }))
                return
            }

            setUploadFile({
                file: [],
                error: ""
            })
            snackbar(data.msg)

            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

        } catch (error) {
            errorHandler(error)
        }

    };


    const fetchPricePeggingTrends = async (queryParams = {}) => {
        try {
            let query = []
            for (const [k, v] of Object.entries(queryParams)) {
                query.push(k + "=" + v)
            }
            query = query.join("&")

            const { data } = await axios.get(API.pricePeggingTrends.get(query));

            if (data.code === "1111") {
                setTrends({
                    data: [],
                    error: data.msg,
                    status: "error"
                });
            } else {
                setTrends({
                    data: data.dsaExportData,
                    error: "",
                    status: "fulfilled"
                });
            }

        } catch (error) {
            errorHandler(error)
        }
    };
    const resetPricepeggingFormState = () => {
        setSearchQuery({ ...searchQueryInitialState })
    }




    return ({
        pricePegging, filterOption,
        searchQuery, searchQueryChangeHandler,
        fetchPricePeggingChatData,
        uploadFile, fileInputRef, uploadFileChangeHandler, uploadPricePeggingFile,
        fetchPricePegging, fetchAllFilterOptions,
        trends, fetchPricePeggingTrends, resetPricepeggingFormState
    })
}
export default usePricePeggingHook