"use client";


import DSALocationModel from '@/components/model/DSALocationModel';
import withAuth from '@/hoc/withAuth'
import useDSAHook from '@/hooks/useDSAHook';
import usePricePeggingHook from '@/hooks/usePricePeggingHook';
import pageRoutes from '@/utils/pageRoutes';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import nextConfig from '@/next.config';

const baseUrl = process.env.BASE_URL;


function formatToTwoDecimalPlaces(number) {
    number = number * 1
    if (typeof number !== 'number') {
        return number
    }
    return number.toFixed(5);
}

const initialShowLocationState = {
    show: false,
    data: {
        lat: 0,
        lng: 0,
        address: ""
    },
    title: ""
}

const DSAExport = () => {

    const { filterOption, fetchAllFilterOptions } = usePricePeggingHook();
    const { dsaList, uploadFile, fileInputRef, uploadFileChangeHandler, uploadDSAFile, searchQueryChangeHandler, fetchDsaList, fetchDSAReport, resetDSAFormState } = useDSAHook()
    const [showLocation, setShowLocation] = useState({ ...initialShowLocationState })

    const showLocationModel = async (data) => {
        const { lattitude, longitude, location } = data

        setShowLocation({
            show: true,
            data: {
                lat: lattitude * 1,
                lng: longitude * 1,
                address: location
            },
        })
        debugger
    }

    const closeLocationModel = () => setShowLocation({ ...initialShowLocationState })

    useEffect(() => {
        fetchAllFilterOptions();
    }, []);

    return (
        <div className='container-fluid'>
            <div className='m-3'>

                <div className="container mt-4 p-0">
                    <form onSubmit={uploadDSAFile}>
                        <div className='row align-items-end px-2'>
                            <div className="col-md-10">
                                <label >Upload DSA File</label>
                                <input type="file" name="file" className='form-control' accept=".xlsx" ref={fileInputRef} required onChange={uploadFileChangeHandler} />
                            </div>
                            <div className="col-md-2">
                                <button className='btn btn-primary' type='submit' disabled={!uploadFile?.file?.[0]}>Upload</button>
                            </div>
                        </div>
                        {uploadFile?.error && <p className='error mt-3'>{uploadFile?.error}</p>}
                    </form>
                </div>

                <div className="container mt-3">
                    <form className="row align-items-end" onSubmit={fetchDsaList}>
                        <div className="row">
                            <div className="col-md-3">
                                <label>Region</label>
                                <select
                                    className="form-control"
                                    name="region"
                                    onChange={searchQueryChangeHandler}
                                >
                                    <option hidden></option>
                                    {filterOption?.dsa?.region?.map((region, idx) => (
                                        <option value={region} key={`region_sn__${idx}`}>
                                            {region}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-3">
                                <label>
                                    Zone/District <span className="red-asterisk">*</span>
                                </label>
                                <select
                                    className="form-control"
                                    name="zone"
                                    onChange={searchQueryChangeHandler}
                                // required
                                >
                                    <option hidden></option>
                                    {filterOption?.dsa?.zoneDis?.map((zone, idx) => (
                                        <option value={zone} key={`zone_sn__${idx}`}>
                                            {zone}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-2">
                                <label >Application Number</label>
                                <input type="text" className='form-control' name="application_no" onChange={searchQueryChangeHandler} />
                            </div>
                            <div className="col-md-2">
                                <label>From</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="from_date"
                                    onChange={searchQueryChangeHandler}
                                />
                            </div>
                            <div className="col-md-2">
                                <label>To</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name="to_date"
                                    onChange={searchQueryChangeHandler}
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-8"></div>
                            <div className="col-md-2">
                                <button className="btn btn-primary" type="reset" onClick={resetDSAFormState}>
                                    Reset
                                </button>
                            </div>
                            <div className="col-md-2">
                                <button className="btn btn-primary" type="submit">
                                    Search
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* fetchDSAReport */}

                <div className="container mt-3">
                    <label>Download Report :</label>
                    <div className='report-download-btns'>
                        {/* {["R", "G", "Y"].map((d, idx) => <button className='btn btn-primary' key={`report_flag__${idx}`} onClick={() => fetchDSAReport(d)}>Flag : {d} report</button>)} */}
                        {["R", "G", "Y", "All"].map((d, idx) => <a className='btn btn-primary' href={`${baseUrl}/invokeDsaReport/${d}`} key={idx}>Flag: {d} Report</a>)}

                    </div>
                </div>

                {dsaList?.error && (
                    <div className="container mt-3 not-found-error">
                        <p>{dsaList?.error}</p>
                    </div>
                )}



                <div>
                    <DSALocationModel
                        options={{ ...showLocation, handleClose: closeLocationModel }}
                    />
                    {dsaList?.data?.length > 0 ? (
                        <div className="table-responsive mt-4">
                            <p>Total Count: {dsaList.totalCount}</p>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>S/N</th>
                                        <th>Application No</th>
                                        <th>Product</th>
                                        {/* <th>Disbursal Date</th> */}
                                        <th>Property Address</th>
                                        <th>Property Pincode</th>
                                        <th>Region</th>
                                        <th>Zone-Distict</th>
                                        <th>Location</th>
                                        <th>Rate Per Sqft</th>
                                        <th>Property Type</th>
                                        <th>Lattitude</th>
                                        <th>Longitude</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {dsaList.data?.map((dsa, idx) => {
                                        const { lattitude, longitude, location, property_address, flag = "" } = dsa
                                        return (
                                            <tr key={`dsa_list__sn__${idx}`} className={`line-clam-disable ${flag}`}>
                                                <td scope="row">{idx + 1}</td>
                                                <td>{dsa.applicationNo}</td>
                                                <td>{dsa.product}</td>
                                                {/* <td>{dsa.disbursalDate}</td> */}
                                                <td>
                                                    <p className='webkit-line-clamp'>{property_address}</p>
                                                </td>
                                                <td>{dsa.propertyPincode}</td>
                                                <td>{dsa.region}</td>
                                                <td>{dsa.zone}</td>
                                                <td><p className='webkit-line-clamp'>{location}</p></td>
                                                <td>{dsa.rate_per_sqft}</td>
                                                <td>{dsa.property_type}</td>
                                                <td>{formatToTwoDecimalPlaces(lattitude)}</td>
                                                <td>{formatToTwoDecimalPlaces(longitude)}</td>
                                                <td><button className="btn btn-primary" onClick={() => showLocationModel({ lattitude, longitude, location: property_address })}>Location</button></td>

                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                    ) : null}

                </div>



            </div >
        </div >
    )
}

export default withAuth(DSAExport)