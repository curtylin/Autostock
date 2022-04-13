// @ts-nocheck
import { Table, TableCell, TableContainer, TableHead, TableRow, TableBody, Paper} from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function Recommendations({stock}: any) {

  const [stockRecommendations, setStockRecommendations] = React.useState(null)


  useEffect(() => {
    if(stock !== '') {
      fetch(`http://localhost:5000/getRecommendations/${stock}`)
        .then(res => res.json())
        .then(result => {
          setStockRecommendations(result)
        })
      }
  },[stock])

  return (
    <div>
      <h5>Recommendations</h5>
      {stockRecommendations !== null  ? <Radar data={stockRecommendations}/> : null}
    </div>
  )
}
