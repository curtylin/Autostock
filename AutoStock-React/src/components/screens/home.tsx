import * as React from "react"
import { useEffect, useState } from "react"
import Layout from "../layout"
import Seo from "../seo"
import { Grid,Box,Button } from "@mui/material"
import MediaCompCard from "../mediaCompCard"
import HighChart from "../highChart"
import News from "../newsarticle"
import BasicTable from "../basicTableComp"
import "./home.css"


const Home = () => {
  const [competitions, setCompetitions] = useState([])
  const [data , setStockData] = useState([])

  let randTick = ["AAPL", "TSLA", "MSFT", "GOOG"];
  let randChoice = randTick[Math.floor(Math.random()*randTick.length)];
  console.log(randChoice);
  let body = `{
    "ticker": "${randChoice}" ,
    "startDate": "2020-11-9",
    "endDate": "2021-11-9"
  }`
  const headers = new Headers()
  headers.append("content-type", "application/json")
  let init = {
    method: "POST",
    headers,
    body,
  }

  useEffect(() => {
    fetch("http://localhost:5000/list-competitions")
      .then(res => {
        return res.json()
      })
      .then(result => {
        setCompetitions(result)
      })

    fetch("http://localhost:5000/gethighchartdata ", init)
      .then(res => {
        return res.json()
      })
      .then(result => {
        setStockData(result)
      })

    }, [])



  return (
    <Layout>
      <Seo title="AutoStock" />
      <h2>News</h2>
      <News/>

      <h2>Upcoming Competitions</h2>
      <Grid container spacing={2}>
        {competitions.slice(0, 3).map((comp: any, index: number) => {
          let cardProps = {
            compLength: comp.duration,
            compTicker: comp.name,
            compStartingVal: `Starting Balance: ${comp.startingBalance}`,
            compDeadline: comp.closeDate,
            description: comp.description,
            id: comp.id,
          }
          return (
            <Grid key={index} item xs={4}>
                <MediaCompCard key={index} {...cardProps} />
            </Grid>
          )
        })}
      </Grid>

      <div id="chart" style={{marginTop: 50}} >
        <h2>Featured Stock: {randChoice}</h2>
        <HighChart stock={randChoice} stockData={data}/>
      </div>
      <div style={{marginTop: 50}}>
          <h2>Leaderboards</h2>
          <BasicTable/>
      </div>
    </Layout>
  )
}

export default Home
