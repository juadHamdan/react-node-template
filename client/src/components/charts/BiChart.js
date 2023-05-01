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
      <h3>Proportion of Users and Mentors in the System</h3>
      <ReactApexChart options={chartData.options} series={chartData.series} type="pie" width={400}  />
    </div>
  );
}

export default ApexChart;