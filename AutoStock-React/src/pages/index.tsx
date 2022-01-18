import * as React from "react"
import { useEffect, useState } from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { Grid } from "@mui/material"
import CompCard from "../components/compCard"
import HighChart from "../components/highChart"

const IndexPage = () => {
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
      <Grid container spacing={2}>
        {competitions.slice(0, 3).map((comp: any, index: number) => {
          let cardProps = {
            compLength: comp.duration,
            compTicker: comp.name,
            compStartingVal: `Starting Balance: ${comp.startingBalance}`,
            compDeadline: comp.closeDate,
            description: comp.description,
          }
          return (
            <Grid key={index} item xs={4}>
              <CompCard key={index} {...cardProps} />
            </Grid>
          )
        })}
      </Grid>

      <div id="chart">
        <HighChart />
      </div>
    </Layout>
  )
}

export default IndexPage
