import React, { useState, useEffect } from "react"
import { Box, Button, Grid, Typography } from "@mui/material"
import CompCard from "../compCard"
import Layout from "../layout"
import MediaCompCard from "../mediaCompCard"
import ComplexCompCard from "../complexCompCard"
import Seo from "../seo"
import { getUser } from "../../services/auth"
import { navigate } from "gatsby"


const Competitions = () => {
  const [competitions, setCompetitions] = useState([])
  const [enteredComps, setEnteredComps] = useState([])
  const [notEnteredComps, setNotEnteredCompetitions] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/list-competitions")
      .then(res => {
        return res.json()
      })
      .then(result => {
        setCompetitions(result)
      })

      fetch(`http://localhost:5000/list-entered-competitions/${getUser().uid}`)
      .then(res => {
        return res.json()
      })
      .then(result => {
        setEnteredComps(result)
      })

      fetch(`http://localhost:5000/list-nonregisted-competitions/${getUser().uid}`)
      .then(res => {
        return res.json()
      })
      .then(result => {
        setNotEnteredCompetitions(result)
      })
  }, [])


  return (
    <Layout>
        <Seo title="Autostock" />
        <h1>Competitions</h1>

        <h3>Upcoming Competitions</h3>
        <Grid direction={{xs:'column', md:'row'}} justifyContent="center" alignContent={{xs:'center',sm:'flex', md:'flex'}} container spacing={3} sx={{mb: 5}}>
              {notEnteredComps.slice(0, 3).map((comp: any, index: number) => {
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
                  <Grid key={index} item sm={12} md={4} lg={4} justifyContent="center">
                      <ComplexCompCard key={index} {...cardProps} />
                  </Grid>
              )
              })}
          </Grid>
          <Button className="mdc-button mdc-button--raised" onClick={event => {navigate(`/app/notenteredcompetitions`)}}> See More</Button>
          <h3>Your Competitions</h3>
          {enteredComps.length > 0 ?
          <Grid direction={{xs:'column', md:'row'}} justifyContent="center" alignContent={{xs:'center',sm:'flex', md:'flex'}} container spacing={3} sx={{mb: 5}}>
              {enteredComps.slice(0, 3).map((comp: any, index: number) => {
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
                  <Grid key={index} item sm={12} md={4} lg={4} justifyContent="center">
                      <ComplexCompCard key={index} {...cardProps} />
                  </Grid>
              )
              })}
          </Grid>
          :
          <Typography
              sx={{mb: 5, ml: 5}}
          >
            You have not entered any competitions yet.
          </Typography>
        }
        {enteredComps.length > 0 ? <Button className="mdc-button mdc-button--raised" onClick={event => {navigate(`/app/enteredcompetitions`)}}> See More</Button> : null}

        <h3>All Competitions</h3>
        <Grid direction={{xs:'column', md:'row'}} justifyContent="center" alignContent={{xs:'center',sm:'flex', md:'flex'}} container spacing={3} sx={{mb: 5}}>
              {competitions.slice(0, 3).map((comp: any, index: number) => {
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
                  <Grid key={index} item sm={12} md={4} lg={4} justifyContent="center">
                      <ComplexCompCard key={index} {...cardProps} />
                  </Grid>
              )
              })}
          </Grid>
          <Button className="mdc-button mdc-button--raised" onClick={event => {navigate(`/app/allcompetitions`)}}> See More</Button>
    </Layout>
  )
}

export default Competitions

