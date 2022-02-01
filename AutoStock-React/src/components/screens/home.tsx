import * as React from "react"
import { useEffect, useState } from "react"
import Layout from "../layout"
import Seo from "../seo"
import { Grid,Box,Button } from "@mui/material"
import MediaCompCard from "../mediaCompCard"
import HighChart from "../highChart"
import BasicTable from "../basicTableComp"
import "./home.css"


const Home = () => {
  const [competitions, setCompetitions] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/list-competitions")
      .then(res => {
        return res.json()
      })
      .then(result => {
        setCompetitions(result)
      })
  }, [])

  return (
    <Layout>
      <Seo title="AutoStock" />
     
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
        <h2>Featured Stock: AAPL</h2>
        <HighChart setChart={"AAPL"} />
      </div>
      <div style={{marginTop: 50}}>
          <h2>Leaderboards</h2>
          <BasicTable/>
      </div>
    </Layout>   
  )
}

export default Home
