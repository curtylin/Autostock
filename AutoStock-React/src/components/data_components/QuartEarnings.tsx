import React from 'react'
import { useEffect } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
import { CircularProgress } from '@mui/material'


export default function QuartEarnings({stock}: any) {

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Quartery and Revenue',
          },
        },
      };

  const [earningsData, setearningsData] = React.useState(null)


  useEffect(() => {
    if(stock !== '') {
      fetch(`http://34.106.176.23:5000/getQuartEarnings/${stock}`)
        .then(res => res.json())
        .then(result => {
          setearningsData(result)
        })
      }
  },[stock])


  return (
    <div>
        <h5>Quarterly Earnings</h5>
        {earningsData !== null  ?  <Line options={options} data={earningsData} /> : <CircularProgress sx={{ mt: 1 }} color="inherit" />}
    </div>
  )
}
