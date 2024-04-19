import React from "react";
import { Chart } from "react-google-charts";

const BarCharts = ({ data = [], title = "" }) => {
    if (data.length > 0) {
        return (
            <div style={{ marginBottom: "1rem" }}>
                <Chart
                    chartType="ColumnChart"
                    width="100%"
                    height="400px"
                    data={[["", ""], ...data]}
                    options={{
                        title: title || "",
                        legend: "none",
                        enableInteractivity: false,
                        //  vAxis:{
                        //     format:0
                         //}
                    }}
                />
            </div>
        )
    } else {
        return <></>
    }
}


export default BarCharts