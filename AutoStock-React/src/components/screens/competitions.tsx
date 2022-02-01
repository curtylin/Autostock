import React, { useState, useEffect } from "react"
import { Grid } from "@mui/material"
import CompCard from "../compCard"
import Layout from "../layout"
import MediaCompCard from "../mediaCompCard"
import ComplexCompCard from "../complexCompCard"
import Seo from "../seo"

const Competitions = () => {
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
        <h1>Competitions</h1>
        <Grid container spacing={4} sx={{mb: 5}}>
            {competitions.slice(0, 6).map((comp: any, index: number) => {
            let cardProps = {
                compLength: comp.duration,
                compTicker: comp.name,
                compStartingVal: `Starting Balance: ${comp.startingBalance}`,
                compDeadline: comp.closeDate,
                description: comp.description,
                id: comp.id,
            }
            return (
                <Grid key={index} item xs={4} sx={{my:0}} >
                    <ComplexCompCard key={index} {...cardProps} />
                </Grid>
            )
            })}
            
        </Grid>
    </Layout>
  )
}

export default Competitions

