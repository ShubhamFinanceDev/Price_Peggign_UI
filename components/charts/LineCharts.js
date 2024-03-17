import React from "react";
import { Chart } from "react-google-charts";

const LineCharts = ({ data = [], title = "" }) => {
    if (data.length > 0) {
        return (
            <div>
                <Chart
                    chartType="LineChart"
                    width="100%"
                    height="400px"
                    data={data}
                    options={{
                        title: title || "",
                        curveType: "curveType",
                        tooltip: {
                            isHtml: true,
                        },
                        pointsVisible: true,
                    }}
                    className={"line-chart"}
                />
            </div>
        )
    } else {
        return <></>
    }

}

export default LineCharts