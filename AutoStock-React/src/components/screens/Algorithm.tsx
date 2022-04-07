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
import { Divider, Grid, Stack } from "@mui/material";
import HighChart from "../highChart"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const Algorithm = () => {
  const [data , setStockData] = useState([])
  const [algorithm, setAlgorithm] = useState<any>([])
  const [username, setUsername] = useState("")
  const [entries, setEntries] = useState<any>([])

  
  useEffect(() => {

    getAlgoDB()
    getUserDB()
   
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
        console.log(result)
        setEntries(result.entry)
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

  const handleExpand = (event: any) => {
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

  }

  return (
  <Layout>
    <Seo title="Autostock" />
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
              Description:
            </Typography>
            <Typography sx={{ml:5, fontSize: 18}} justifyContent="center" fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                  fontWeight="400" variant= "h2"  gutterBottom>
              {algorithm.description}
            </Typography>

          </CardContent> 
        </Card>

        <Card sx={{marginBottom: 2,  minWidth: 275 }}>
          <CardContent>
            <Typography sx={{ fontSize: 20}} justifyContent="center" fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                  fontWeight="medium" variant= "h2"  gutterBottom>
              Algorithm Details:
            </Typography>
            <Typography sx={{ ml:5,fontSize: 18}} justifyContent="center" fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                  fontWeight="400" variant= "h2"  gutterBottom>
              Ticker: <span className="stockTickName"> {algorithm.ticker}</span>
            </Typography>
            <Typography sx={{ ml:5,fontSize: 18}} justifyContent="center" fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                  fontWeight="400" variant= "h2"  gutterBottom>
              Algorithm Runtime: {algorithm.runtime} Days
            </Typography>
          </CardContent>
        </Card>
        {entries.map((entry: any, key: any) => {

          return (
            <Card sx={{marginBottom: 2,  minWidth: 275 }} key={key}>
              <CardContent>
                <Typography sx={{ fontSize: 20}} justifyContent="center" fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                      fontWeight="medium" variant= "h2"  gutterBottom>
                  Indicators:
                </Typography>
                <Typography sx={{ ml:5, fontSize: 18}} justifyContent="center" fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                      fontWeight="400" variant= "h2"  gutterBottom>
                  Indicator 1: <span className="dataToRight">{entry.indicator1}</span>
                 </Typography>
                <Typography sx={{ ml:5,fontSize: 18}} justifyContent="center" fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                      fontWeight="400" variant= "h2"  gutterBottom>
                  Comparator: {entry.comparator}
                </Typography>
                <Typography sx={{ ml:5,fontSize: 18}} justifyContent="center" fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                      fontWeight="400" variant= "h2"  gutterBottom>
                  Indicator 2: <span className="dataToRight">{entry.indicator2}</span>
                 </Typography>
                <Typography sx={{ ml:5,fontSize: 18}} justifyContent="center" fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                      fontWeight="400" variant= "h2"  gutterBottom>
                  Action: {entry.action}
                </Typography>
              </CardContent>
            </Card>
        )})}


      
        <Accordion sx={{mb:2}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            onClick={handleExpand}
          >
            <Typography>Historical Data</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <HighChart stock={algorithm.ticker} stockData={data}/>
          </AccordionDetails>
        </Accordion>


  
        {/* <Discussions/>
        <Stack direction="column" spacing={2} sx={{my: 5}}>
          {/* {competitions.slice(0, 6).map((comp: any, index: number) => {
            let cardProps = {
              compLength: comp.duration,
              compTicker: comp.name,
              compStartingVal: `Starting Balance: ${comp.startingBalance}`,
              compDeadline: comp.closeDate,
              description: comp.description,
              leader: comp.leaderboard,
              id: comp.id,
            } */}
            {/* return (
              <Stack key={index} direction="column" spacing={2}>
                  <Card key={index} variant="outlined" sx={{minWidth: 275}} >
                  <CardContent>
                    <Typography variant="h5" component="div">
                        {comp.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      Competition Length: {comp.duration}
                    </Typography>     
                  </CardContent>
                  </Card>
              </Stack>
            )
            })}
      </Stack> */} 
  </Layout>
  )
}


export default Algorithm
