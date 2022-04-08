import React, { useState, useEffect } from "react"
import { Box, Button, Divider, Grid, Typography } from "@mui/material"
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

    fetch(
      `http://localhost:5000/list-nonregisted-competitions/${getUser().uid}`
    )
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
        <Grid direction={{xs:'column', md:'row'}} justifyContent="left" alignContent={{xs:'center',sm:'flex', md:'flex'}} container spacing={1} sx={{mb: 1}}>
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
                  <Grid key={index} item sm={12} md={4} lg={4} justifyContent="left">
                      <ComplexCompCard key={index} {...cardProps} />
                  </Grid>
              )
              })}
          </Grid>
          <Box sx={{ width: 1 }}>
            <Button style={{ float: "right"}}  className="mdc-button mdc-button--raised" onClick={event => {navigate(`/app/notenteredcompetitions`)}}> See More</Button>
            
          </Box>
          
          <Divider sx={{mt:6}}/>
            
          <Box sx={{mt:3}}>
            <h3>Your Competitions</h3>
          </Box>
          {enteredComps.length > 0 ?
          <Grid direction={{xs:'column', md:'row'}} justifyContent="left" alignContent={{xs:'center',sm:'flex', md:'flex'}} container spacing={1} sx={{mb: 1}}>
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
                  <Grid key={index} item sm={12} md={4} lg={4} justifyContent="left">
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
        {enteredComps.length > 0 ? <Box sx={{ width: 1 }}> <Button style={{ float: "right"}} sx={{mt:0, pt: 0}} className="mdc-button mdc-button--raised" onClick={event => {navigate(`/app/enteredcompetitions`)}}> See More</Button></Box>
 : null}
        <Divider sx={{mt:6}}/>

        <Box sx={{mt:3}}>
            <h3>All Competitions</h3>
          </Box>
        <Grid direction={{xs:'column', md:'row'}} justifyContent="left" alignContent={{xs:'center',sm:'flex', md:'flex'}} container spacing={1} sx={{mb: 1}}>
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
          <Box sx={{ width: 1 }}>
            <Button style={{ float: "right"}} sx={{mt:0, pt: 0}} className="mdc-button mdc-button--raised" onClick={event => {navigate(`/app/allcompetitions`)}}> See More</Button>
          </Box>    
        </Layout>
  )
}

export default Competitions
