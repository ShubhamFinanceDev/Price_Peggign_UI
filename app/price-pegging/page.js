"use client";

import PricePeggingTrendChartModel from "@/components/model/PricePeggingTrendChartModel";
import withAuth from "@/hoc/withAuth";
import usePricePeggingHook from "@/hooks/usePricePeggingHook";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Pagination from "@/components/core/Pagination";

const initialShowTrendChartState = {
  show: false,
  data: [],
  title: ""
}

const PricePegging = () => {
  const {
    pricePegging,
    filterOption,
    searchQuery,
    uploadFile,
    fileInputRef,
    fetchPricePeggingChatData,
    uploadFileChangeHandler,
    uploadPricePeggingFile,
    searchQueryChangeHandler,
    fetchPricePegging,
    fetchAllFilterOptions,
    resetPricepeggingFormState,
  } = usePricePeggingHook();

  const [showTrend, setShowTrend] = useState({ ...initialShowTrendChartState })

  useEffect(() => {
    fetchAllFilterOptions();
  }, []);

  const showTrendChart = async (zone, location) => {
    const d = await fetchPricePeggingChatData(zone, location)
    setShowTrend({
      show: true,
      data: d,
      title: `Trend of ${location}, ${zone}.`
    })
  }

  const closeTrendChart = () => setShowTrend({ ...initialShowTrendChartState })


  return (
    <div className="container-fluid">
      <div className="m-3">
        <div className="container mt-4 p-0">
          <form onSubmit={uploadPricePeggingFile}>
            <div className="row align-items-end px-2">
              <div className="col-md-10">
                <label>Upload Price Pegging</label>
                <input
                  type="file"
                  name="file"
                  className="form-control"
                  required
                  ref={fileInputRef}
                  onChange={uploadFileChangeHandler}
                  accept=".xlsx"
                />
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={!uploadFile?.file?.[0]}
                >
                  Upload
                </button>
              </div>
              {/* <div className="col-md-1">
                                <button className='btn btn-secondary' type='reset'>Reset</button>
                            </div> */}
            </div>
            {uploadFile?.error && (
              <p className="error mt-3">{uploadFile?.error}</p>
            )}
          </form>
        </div>

        <div className="container mt-3">
          <form className="row align-items-end" onSubmit={fetchPricePegging}>
            <div className="row">
              <div className="col-md-3">
                <label>Region</label>
                <select
                  className="form-control"
                  name="region"
                  onChange={searchQueryChangeHandler}
                >
                  <option hidden></option>
                  {filterOption?.pegging?.region?.map((region, idx) => (
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
                  required
                >
                  <option hidden></option>
                  {filterOption?.pegging?.zoneDis?.map((zone, idx) => (
                    <option value={zone} key={`zone_sn__${idx}`}>
                      {zone}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <label>From</label>
                <input
                  type="date"
                  className="form-control"
                  name="from_date"
                  onChange={searchQueryChangeHandler}
                />
              </div>
              <div className="col-md-3">
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
              <div className="col-md-9"></div>
              <div className="col-md-3">
                <div className="row">
                  <div className="col-md-6">
                    <button className="btn btn-primary" type="reset" onClick={resetPricepeggingFormState}>
                      Reset
                    </button>
                  </div>
                  <div className="col-md-6">
                    <button className="btn btn-primary" onClick={fetchPricePegging}>
                      Search
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </form>
        </div>

        {pricePegging?.error && (
          <div className="container mt-3 not-found-error">
            <p>{pricePegging?.error}</p>
          </div>
        )}

        <div>
          <PricePeggingTrendChartModel
            options={{ ...showTrend, handleClose: closeTrendChart }}
          />
          {pricePegging?.data?.length > 0 ? (
            <>
            <div className="table-responsive mt-4">
              <p>Total Count: {pricePegging?.meta?.totalCount}</p>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>Region</th>
                    <th>Zone-District</th>
                    <th>Locations</th>
                    <th>Minimum Rate</th>
                    <th>Maximum Rate</th>
                    <th>Average Rate</th>
                    <th>Pin Code</th>
                    <th>Location</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {pricePegging?.data?.map((pp, idx) => {
                    return (
                      <tr key={`price_pegging__${pp.peggingId}`}>
                        <td>{idx + 1}</td>
                        <td>{pp.region}</td>
                        <td>{pp.zoneDist}</td>
                        <td>{pp.locations}</td>
                        <td>{pp.minimumRate}</td>
                        <td>{pp.maximumRate}</td>
                        <td>{pp.averageRate}</td>
                        <td>{pp.pinCode}</td>
                        <td>
                          <a href={`/price-pegging/location?propertyPincode=${pp.pinCode}&region=${pp.region}&zone=${pp.zoneDist}`}
                            target="_blank" rel="noopener noreferrer">
                            <button className="btn btn-primary">Location</button>
                          </a>
                        </td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => showTrendChart(pp.zoneDist, pp.locations)}
                          >Trend</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Pagination  meta={pricePegging.meta} next={fetchPricePegging} />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default withAuth(PricePegging);
