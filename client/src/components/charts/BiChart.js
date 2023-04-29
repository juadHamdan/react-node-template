import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

function ApexChart({ mentors , users , pending }) {
  const [chartData, setChartData] = useState({
    series: [mentors, users, pending],
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Mentor', 'User', 'Pending'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  });
 
  return (
    <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} type="pie" width={380} />
    </div>
  );
}

export default ApexChart;