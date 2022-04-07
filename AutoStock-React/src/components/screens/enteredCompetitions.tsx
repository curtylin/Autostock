import React, { useState, useEffect } from "react"
import { Box, Grid } from "@mui/material"
import CompCard from "../compCard"
import Layout from "../layout"
import MediaCompCard from "../mediaCompCard"
import ComplexCompCard from "../complexCompCard"
import Seo from "../seo"
import { getUser } from "../../services/auth"

const Competitions = () => {
  const [competitions, setCompetitions] = useState([])

  useEffect(() => {
    fetch(`http://localhost:5000/list-entered-competitions/${getUser().uid}`)
      .then(res => {
        return res.json()
      })
      .then(result => {
        setCompetitions(result)
      })
  }, [])


  return (
    <Layout>
        <Seo title="Autostock" />
        <h1>Competitions</h1>
        <Grid direction={{xs:'column', md:'row'}} justifyContent="left" alignContent={{xs:'center',sm:'flex', md:'flex'}} container spacing={3} sx={{mb: 5}}>
              {competitions.slice(0, 6).map((comp: any, index: number) => {
              let cardProps = {
                  compLength: comp.duration,
                  compTicker: comp.name,
                  compStartingVal: `Starting Balance: ${comp.startingBalance}`,
                  compDeadline: comp.closeDate,
                  description: comp.description,
                  id: comp.id,
                  logo: comp.logo,
              }
              return (
                  <Grid key={index} item sm={12} md={4} lg={4} justifyContent="left">
                      <ComplexCompCard key={index} {...cardProps} />
                  </Grid>
              )
              })}
              
          </Grid>
        
    </Layout>
  )
}

export default Competitions

