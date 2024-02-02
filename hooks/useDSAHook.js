import React, { useState, useEffect } from "react";
import axios from "@/services/axios";
import API from "@/services/endpoints";
import errorHandler from "@/utils/handler.utils";
import snackbarHooks from "@/hooks/snackbarHooks";

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
        data: [],
        error: ""
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


    const fetchDsaList = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.get(API.dsa.get(searchQuery));
            if (data.code === "1111") {
                setDsaList({
                    data: [],
                    error: data.msg
                });
            } else {
                setDsaList({
                    data: data.dsaExportList,
                    error: ""
                });
            }
        } catch (error) {
            errorHandler(error)
        }
    };
    return ({
        dsaList,
        searchQuery, searchQueryChangeHandler,
        uploadFile, uploadFileChangeHandler, uploadDSAFile,
        fetchDsaList, fetchDSAReport
    })
}

export default useDSAHook