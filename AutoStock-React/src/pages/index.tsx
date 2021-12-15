import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

import JSConfetti from "js-confetti"

import Box from "@mui/material/Box"
import Card from "@mui/material/Card"

import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { GridItem } from "@chakra-ui/react"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import { styled } from "@mui/material/styles"

//const jsConfetti = new JSConfetti()

const IndexPage = () => {
  //  confetti();

  return (
    <Layout>
      <Seo title="AutoStock" />
      {/* <Link to='/CreateAlgorithm'>Create New Algorithm</Link>
            <div></div>
            <Link to='/MyAlgorithm'>My Algorithms</Link>
            <div></div>
            <Link to='/publicAlgorithms'> Public Algorithms</Link>
            <div></div> */}
      {/* <Generate_Comp1></Generate_Comp1>
      <Generate_Comp2></Generate_Comp2> */}

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Generate_Comp1></Generate_Comp1>
        </Grid>
        <Grid item xs={4}>
         <Generate_Comp2></Generate_Comp2>
        </Grid>
        <Grid item xs={4}>
          <Generate_Comp3></Generate_Comp3>
        </Grid>
      </Grid>
    </Layout>
  )
}
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}))

const Generate_Comp1 = () => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Compeition 5 Days
        </Typography>
        <Typography variant="h5" component="div">
          AAPL
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Starting Cost $1000
        </Typography>
        <Typography variant="body2">
          2 Days Left to Enter   
          <br />
          {'"Think Different"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}

const Generate_Comp2 = () => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Compeition 3 Days
        </Typography>
        <Typography variant="h5" component="div">
          TSLA
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Starting Cost $700
        </Typography>
        <Typography variant="body2">
          4 Days Left To Enter
          <br />
          {'"To accelerate the advent of ...."'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}


const Generate_Comp3 = () => {
    return (
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
           Compeition 7 Days
          </Typography>
          <Typography variant="h5" component="div">
            GME
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Starting Cost $1500
          </Typography>
          <Typography variant="body2">
            8 Days Left To Enter
            <br />
            {'"Power to the Player"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    )
  }

export default IndexPage
