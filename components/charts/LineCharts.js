import React, { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const LineCharts = ({ data = [], title = "" }) => {
  const categories = data.map((item) => item[0]); 
  const seriesData = [
    { name: 'Minimum', data: data.map((item) => item[1]) },
    { name: 'Maximum', data: data.map((item) => item[2]) },
    { name: 'Average', data: data.map((item) => item[3]) }
  ];

  const options = {
    chart: {
      type: 'line'
    },
    title: {
      text: title
    },
    xAxis: {
      categories: categories,
    },
    yAxis: {
      title: {
        text: 'Values'
      }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: seriesData
  };


  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default LineCharts;
