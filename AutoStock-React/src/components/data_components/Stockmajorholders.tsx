// @ts-nocheck
import React from 'react'
import { useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { CircularProgress } from '@mui/material'

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Stockmajorholders({stock}: any) {

  const [majorHolders, setMajorHolders] = React.useState(null)
  useEffect(() => {
    if(stock !== '') {
      fetch(`http://localhost:5000/getMajorHolders/${stock}`)
        .then(res => res.json())
        .then(result => {
          setMajorHolders(result)
          console.log(result)
        })
      }
  },[stock])


  return (
    <div>
      <h5>Major Holders</h5>
      {majorHolders !== null ? <Pie data={majorHolders}/> : <CircularProgress sx={{ mt: 1 }} color="inherit" />}
    </div>
  )
}

