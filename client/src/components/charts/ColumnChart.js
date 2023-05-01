import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'];

const ApexChart = ({ mapskills }) => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        height: 350,
        type: 'bar',
        events: {
          click: function(chart, w, e) {
            // console.log(chart, w, e)
          }
        }
      },
      colors: colors,
      plotOptions: {
        bar: {
          columnWidth: '30%',
          distributed: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: [],
        labels: {
          style: {
            colors: colors,
            fontSize: '12px'
          }
        }
      }
    }
  });

  useEffect(() => {
    if (mapskills) {
      const series = [{ data: Object.values(mapskills) }];
      const options = {
        ...chartData.options,
        xaxis: {
          ...chartData.options.xaxis,
          categories: Object.keys(mapskills)
        }
      };
      setChartData({ series, options });
    }
  }, [mapskills]);

  return (
    <div id="chart">
        <h3 style={{ textAlign: 'center' }}>Analysis of Mentor Skills</h3>
        <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={250} width={500} />
    </div>
  );
};

export default ApexChart;
