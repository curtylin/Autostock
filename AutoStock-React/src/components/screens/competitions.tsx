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
        <Grid container spacing={2} sx={{mt:4, mb: 10}}>
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
                <Grid key={index} item xs={2} sm={4} md={4} >
                    <ComplexCompCard key={index} {...cardProps} />
                </Grid>
            )
            })}
            
        </Grid>
    </Layout>
  )
}

export default Competitions

