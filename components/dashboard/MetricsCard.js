import React from 'react'

const MetricsCard = ({ metricsHeading, dashboardMetrics, metricsData }) => {
    return (
        <div className="metrics-cards-outer-container">
            <div className="metrics-heading">
                <p>{metricsHeading}</p>
            </div>
            <div className="metrics-cards-container">
                {dashboardMetrics.map(({ label, icon, key }, idx) => {
                    return (
                        <div className="metrics-cards" key={`DSA_Dashboard_Metrics__${idx}`}>
                            <div className='icon-container'>
                                <img src={icon} alt={label} />
                            </div>
                            <div>
                                <h2>{metricsData?.[key]}</h2>
                                <p>{label}</p>
                            </div>
                        </div>)
                })}
            </div>
        </div>
    )
}

export default MetricsCard