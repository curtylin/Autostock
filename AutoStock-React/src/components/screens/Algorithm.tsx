import React, { useEffect, useState } from "react"
import "./screens.css"

import Layout from "../layout"
import Seo from "../seo"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from "@mui/material";
import HighChart from "../highChart"

const Algorithm = () => {
  const [data , setStockData] = useState([])
  const [algorithm, setAlgorithm] = useState<any>([])
  const [username, setUsername] = useState("")

  
  useEffect(() => {
    console.log(window.history.state)
    console.log(window.history.state.id)
    
    getAlgoDB()
    getUserDB()
    console.log(algorithm)
    let today = new Date().toISOString().slice(0, 10)
    const d = new Date();
    d.setFullYear(d.getFullYear()-1);
    
    let lastYear = d.toISOString().slice(0,10)

    console.log(today)
    console.log(lastYear)
    console.log(algorithm.ticker)
    
    let body = `{
      "ticker": "${algorithm.ticker}",
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

    fetch("http://localhost:5000/gethighchartdata ", init)
      .then(res => {
        return res.json()
      })
      .then(result => {
        setStockData(result)
      })

  }, [])

  const getAlgoDB = () => {
    fetch(`http://localhost:5000/get-algorithm/${window.history.state.id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then(res => {
        return res.json()
      })
      .then(result => {
        console.log(result )
        setAlgorithm(result)
      })
  }

  const getUserDB = () => {
    fetch(`http://localhost:5000/get-user/${window.history.state.userID}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then(res => {
        return res.json()
      })
      .then(result => {
        console.log(result)
        if (result === null) {
          setUsername(window.history.state.userID)
      } else {
          setUsername(result.username)
      }
      })
  }


  return (
  <Layout>
    <Seo title="AutoStock" />


        <Typography fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
            fontWeight="Bold"sx={{ marginTop: 5, fontSize: 40, fontWeight: "bold" }} textAlign="center" variant= "h1"  gutterBottom>
          {algorithm.name}
        </Typography>
     
        <Typography sx={{ marginBottom: 5, fontSize: 20}} fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
            fontWeight="medium" variant= "h2" textAlign="center" gutterBottom>
          User: {username}
        </Typography>

        <Card sx={{marginBottom: 2,  minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 20}} justifyContent="center" fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                  fontWeight="medium" variant= "h2"  gutterBottom>
              Ticker: <span className="stockTickName"> {algorithm.ticker}</span>
              
            </Typography>
            <Typography sx={{ fontSize: 20}} justifyContent="center" fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                  fontWeight="medium" variant= "h2"  gutterBottom>
              Time Interval: {algorithm.timeInterval >= 24 ? (<>{algorithm.timeInterval/24} Days</>) : (<>{algorithm.timeInterval} Hours</>)}
            </Typography>
            <Typography sx={{ fontSize: 20}} justifyContent="center" fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                  fontWeight="medium" variant= "h2"  gutterBottom>
              Algorithm Runtime: {algorithm.runningTime} Days            
            </Typography>
          </CardContent> 
        </Card>

      <Card sx={{marginBottom: 2,  minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 20}} justifyContent="center" fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                  fontWeight="medium" variant= "h2"  gutterBottom>
              Indicator 1: <span className="dataToRight">{algorithm.indicator1}</span>
            </Typography>
            <Typography sx={{ fontSize: 20}} justifyContent="center" fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                  fontWeight="medium" variant= "h2"  gutterBottom>
              Period 1: {algorithm.period1}
            </Typography>
            <Typography sx={{ fontSize: 20}} justifyContent="center" fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                  fontWeight="medium" variant= "h2"  gutterBottom>
              Comparator: {algorithm.comparator}          
            </Typography>
            <Typography sx={{ fontSize: 20}} justifyContent="center" fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                  fontWeight="medium" variant= "h2"  gutterBottom>
              Period 2: {algorithm.period2}            
            </Typography>
            <Typography sx={{ fontSize: 20}} justifyContent="center" fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                  fontWeight="medium" variant= "h2"  gutterBottom>
              Action: {algorithm.action}
            </Typography>
          </CardContent> 
        </Card>

        <HighChart stock={algorithm.ticker} stockData={data}/>
  
  </Layout>
  )
}


export default Algorithm
