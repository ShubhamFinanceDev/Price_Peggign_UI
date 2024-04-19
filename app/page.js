"use client";


import React, { useEffect } from 'react'
import withAuth from '@/hoc/withAuth'
import useDashboardHooks from '@/hooks/useDashboardHooks';
import { icons } from '@/env/icons';
import MetricsCard from '@/components/dashboard/MetricsCard';
import BarCharts from '@/components/charts/BarCharts';


// const DSADashboardMetrics = [
//   {
//     label: "Pincode",
//     icon: icons.USER_ICON,
//     key: "dsaPincodeTotal",
//   },
//   {
//     label: "Zone",
//     icon: icons.ZONE_ICON,
//     key: "dsaZoneTotal"
//   },
//   // {
//   //   label: "Region",
//   //   icon: icons.FILE_ICON,
//   //   key: "dsaRegionTotal"
//   // },
//   {
//     label: "Locations",
//     icon: icons.FILE_ICON,
//     key: "dsaLocationsTotal"
//   },
//   {
//     label: "Quarters",
//     icon: icons.CALENDER_ICON,
//     key: "dsaQuartersTotal"
//   },
// ]

const peggingDashboardMetrics = [
  
  {
    label: "Zone",
    icon: icons.ZONE_ICON,
    key: "peggingZoneTotal"
  },
  {
    label: "Pincode",
    icon: icons.USER_ICON,
    key: "peggingPincodeTotal",
  },

  {
    label: "Area",
    icon: icons.FILE_ICON,
    key: "peggingLocationsTotal"
  },
  {
    label: "Quarters",
    icon: icons.CALENDER_ICON,
    key: "peggingQuartersTotal"
  },

]

const Home = () => {

  const {
    dashboardMetrics,
    dashboardGraphCount,
    fetchDashboardDistinctDetail,
    fetchDashboardGraphCount
  } = useDashboardHooks()

  const { error, data: { dsaData, peggingData } } = dashboardMetrics

  useEffect(() => {
    Promise.all([
      fetchDashboardDistinctDetail(),
      fetchDashboardGraphCount()
    ])
  }, [])

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* <div className="col-12 col-md-6">
            <MetricsCard metricsHeading={"DSA"} dashboardMetrics={DSADashboardMetrics} metricsData={dsaData} />
            <BarCharts data={dashboardGraphCount?.data?.dsaData?.pincode || []} title="DSA Pincode" />
            <BarCharts data={dashboardGraphCount?.data?.dsaData?.location || []} title="DSA Location" />
          </div> */}
          <div className="col-12 col-md-12">
            <MetricsCard metricsHeading={"Price Pegging"} dashboardMetrics={peggingDashboardMetrics} metricsData={peggingData} />
            <BarCharts data={dashboardGraphCount?.data?.peggingData?.pincode || []} title="Price Pegging Pincode" />
            <BarCharts data={dashboardGraphCount?.data?.peggingData?.location || []} title="Price Pegging Location" />
            {/* <BarCharts data={dashboardGraphCount?.data?.peggingData?.location || []} title="Price Pegging Area" /> */}

          </div>
        </div>

      </div>
    </>
  )
}

export default withAuth(Home)