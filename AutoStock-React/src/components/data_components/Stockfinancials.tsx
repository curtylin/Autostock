// @ts-nocheck
import React from 'react'
import { useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { CircularProgress } from '@mui/material'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Stockfinancials({stock}: any) {
  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Quartery Financials',
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const [stockFinancials, setStockFinancials] = React.useState(null)

  useEffect(() => {
    if(stock !== '') {
      fetch(`http://34.106.176.23:5000/getQuartFinancials/${stock}`)
        .then(res => res.json())
        .then(result => {
          setStockFinancials(result)
        })
      }
  },[stock])


  return (
    <div>
      <h5>Quaterly Stock Financials</h5>
      {stockFinancials !== null  ?  <Bar options={options} data={stockFinancials} /> : <CircularProgress sx={{ mt: 1 }} color="inherit" />}
    </div>
  )
}
