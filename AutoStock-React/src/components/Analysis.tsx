import { Grid, TextField } from '@mui/material'
import { Tooltip , Typography} from '@mui/material'

import React from 'react'
import { useState } from 'react'
import Calendar from './data_components/Calendar'
// import Institutionalholders from './data_components/Institutionalholders'
import QuartEarnings from './data_components/QuartEarnings'
import Recommendations from './data_components/Recommendations'
import Stockbalancesheets from './data_components/Stockbalancesheets'
import Stockfinancials from './data_components/Stockfinancials'
import Stockmajorholders from './data_components/Stockmajorholders'
import Stocksplits from './data_components/Stocksplits'
import Sustainability from './data_components/Sustainability'
import HighChart from "./highChart"



export default function Analysis() {
  const [stock, setStock] = useState('')
  const [updatedStock, setUpdatedStock] = useState('')
  const [stockData, setStockData] = useState([])
  const [validTicker, setValidTicker] = useState(true)

  const handleBlur = () => {
    console.log(stock)
    setUpdatedStock(stock)
    getHighChartData(stock)
  }

  const getHighChartData = (stockTicker: string) => {
    if(stockTicker !== '') {
      let today = new Date().toISOString().slice(0, 10)
      const d = new Date()
      d.setFullYear(d.getFullYear() - 1)
  
      let lastYear = d.toISOString().slice(0, 10)
  
      let body = `{
        "ticker": "${stock}",
        "startDate": "${lastYear}",
        "endDate": "${today.toString()}"
      }`
      const headers = new Headers()
      headers.append("content-type", "application/json")
      let init = {
        method: "POST",
        headers,
        body,
      }
  
      fetch("/api/gethighchartdata", init)
        .then(res => {
          return res.json()
        })
        .then(result => {
          if(result.length > 0) {
            setStockData(result)
            setValidTicker(true)
          }else{
            setValidTicker(false)
          }
        })
    }
  }


  const handleChange = (event: any) => {
    setStock(event.target.value);
  };


  return (
    <div>
      <Tooltip title="E.g. AAPL or TSLA" placement="left" arrow>
        <TextField 
          label="Stock"
          value={stock}
          onChange={handleChange}
          onBlur={handleBlur}
          inputProps={{ maxLength: 9 }}
          sx={{ input: { color: validTicker ? "black" : "red" } }}
        />
      </Tooltip>
      <Typography variant="caption" color="red">
              {validTicker ? null : "INVALID TICKER"}
      </Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} >
          <HighChart stock={stock} stockData={stockData} />
        </Grid>
        <Grid item xs={8} sx={{border:1}}>
          <Calendar stock={updatedStock}/>
        </Grid>
        <Grid item xs={4} sx={{border:1}}> 
          <Stockmajorholders stock={updatedStock}/>
        </Grid>
        <Grid item xs={4} sx={{border:1}}> 
          <Recommendations stock={updatedStock} />
        </Grid>
        <Grid item xs={8} sx={{border:1}}> 
          <QuartEarnings stock={updatedStock}/>
        </Grid>
        <Grid item xs={12} sx={{border:1}}> 
          <Stockfinancials stock={updatedStock}/>
        </Grid>
        {/* <Grid item xs={3} sx={{border:1}}> 
          <Stockbalancesheets stock={updatedStock}/>
        </Grid> */}
        <Grid item xs={6} sx={{border:1}}> 
          <Stocksplits stock={updatedStock}/>
        </Grid>
        <Grid item xs={6} sx={{border:1}}> 
          <Sustainability stock={updatedStock}/>
        </Grid>
        {/* <Grid item xs={4} sx={{border:1}}> 
          <Institutionalholders stock={updatedStock}/>
        </Grid> */}
      </Grid>
    </div>

  )
}
