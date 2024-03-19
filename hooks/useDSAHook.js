import React, { useState, useEffect } from "react";
import axios from "@/services/axios";
import API from "@/services/endpoints";
import errorHandler from "@/utils/handler.utils";
import snackbarHooks from "@/hooks/snackbarHooks";
import { useRef } from "react";

const searchQueryInitialState = {
    zone: null,
    region: null,
    application_no: null,
    upload_date: null
}
const useDSAHook = () => {
    const { snackbar } = snackbarHooks()
    const [searchQuery, setSearchQuery] = useState({ ...searchQueryInitialState })
    const [uploadFile, setUploadFile] = useState({
        file: [],
        error: ""
    })
    const [dsaList, setDsaList] = useState({
        meta : {
            nextPage : false,
            currentPage : 1,
            totalPageCount: 0,
            totalCount : 0
        },
        data: [],
        error: "",
        totalCount: 0,
    })

    const searchQueryChangeHandler = (e) => {
        const { name, value } = e.target;
        const prevState = { ...searchQuery };
        prevState[name] = value;
        setSearchQuery(prevState);
    }

    const fileInputRef = useRef(null);

    const uploadFileChangeHandler = (e) => {
        const { name, value, files } = e.target;
        if (files?.[0]?.type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            setUploadFile({ file: [], error: "Wrong file format" })
        } else {
            setUploadFile({ file: files, error: "" })
        }
    }

    const uploadDSAFile = async (e) => {
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

            const { data } = await axios.post(API.dsa.post(), formData, header);

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

    const fetchDSAReport = async (flag = "R") => {
        try {
            const { data } = await axios.get(API.dsaReport.get(flag));

        } catch (error) {
            errorHandler(error)
        }
    }


    const fetchDsaList = async (e, page = 1) => {
        e?.preventDefault()
        try {
            const { data } = await axios.get(API.dsa.get({...searchQuery}, page));
            if (data.code === "1111") {
                setDsaList({
                    data: [],
                    meta : {
                        nextPage : false,
                        currentPage : page,
                        totalPageCount: 1,
                        totalCount : 0
                    },
                    error: data.msg
                });
            } else {
                setDsaList({
                    data: data.dsaExportList,
                    totalCount: data.totalCount,
                    error: "",
                    meta : {
                        nextPage : data.nextPage,
                        currentPage : page,
                        totalPageCount: Math.ceil(data.totalCount / 100),
                        totalCount : data.totalCount
                    },
                });
            }
        } catch (error) {
            errorHandler(error)
        }
    };

    const resetDSAFormState = () => {
        setSearchQuery({ ...searchQueryInitialState })
    }

    return ({
        dsaList,
        searchQuery, fileInputRef, searchQueryChangeHandler,
        uploadFile, uploadFileChangeHandler, uploadDSAFile,
        fetchDsaList, fetchDSAReport,
        resetDSAFormState
    })
}

export default useDSAHook