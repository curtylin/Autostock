import * as React from "react"
import { useEffect, useState } from "react"
import Layout from "../layout"
import Seo from "../seo"
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Divider, Grid, Typography } from "@mui/material"
import CompCard from "../compCard"
import ComplexCompCard from "../complexCompCard"
import HighChart from "../highChart"
import News from "../newsarticle"
import { Link, navigate } from "gatsby"
import { getUser } from "../../services/auth"
import "./screens.css"
import { KeyboardArrowRight } from "@mui/icons-material"
import AddIcon from '@mui/icons-material/Add';


const Home = () => {
  const [competitions, setCompetitions] = useState([])
  const [data, setStockData] = useState([])
  const [username, setUsername] = useState("")
  const [enteredComps, setEnteredComps] = useState([])

  let randTick = ["AAPL", "TSLA", "MSFT", "GOOG"]
  let randChoice = randTick[Math.floor(Math.random() * randTick.length)]
  console.log(randChoice)
  let today = new Date().toISOString().slice(0, 10)
  const d = new Date()
  d.setFullYear(d.getFullYear() - 1)
  let lastYear = d.toISOString().slice(0, 10)

  let body = `{
    "ticker": "${randChoice}" ,
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

      fetch(`http://localhost:5000/list-entered-competitions/${getUser().uid}`)
      .then(res => {
        return res.json()
      })
      .then(result => {
        setEnteredComps(result)
      })

    fetch(`http://localhost:5000/get-user/${getUser().uid}`, {
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
          setUsername("")
        } else {
          setUsername(result.username)
        }
      })
  }, [])

  return (
    <Layout>
      <Seo title="Autostock" />
      <br></br>
      <h3>
        {username == "" ? (
          <>
            Hi! Looks like you have not{" "}
            <Link to="/app/edituser">set a username.</Link>
          </>
        ) : (
          <>Welcome back {username}!</>
        )}
      </h3>
      <h2>Today's Top Headlines:</h2>
      <News/>
      <Divider sx={{my:3}}/>
      <h2>Your Competitions</h2>
      <Grid container spacing={2} sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {enteredComps.slice(0, 3).map((comp: any, index: number) => {
          let cardProps = {
            compLength: comp.duration,
            compTicker: comp.name,
            compStartingVal: `Starting Balance: ${comp.startingBalance}`,
            compDeadline: comp.endDate,
            description: comp.description,
            id: comp.id,
            logo: comp.logo,
          }
          return (
            <Grid key={index} item xs={4}>
              <ComplexCompCard key={index} {...cardProps} />
            </Grid>
          )
        })}
        {enteredComps.length < 3 ? 
        <Button variant="outlined" onClick={event => {navigate(`/app/enteredcompetitions`)}} startIcon={<AddIcon/>} sx={{minWidth:320,maxWidth:320, ml:3, mt: 2}}>SEE MORE</Button>
        : null}
      </Grid>
      <Button
        sx={{ flexGrow: 1, display: { xs: "flex", md: "none", lg: "none" } }}
        className="btn_viewBattles"
        variant="contained"
      >
        <Typography
            fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
            noWrap
            component="div"
            sx={{  display: { xs: "flex", md: "none" } }}
            >
            <Link
                to="/app/enteredcompetitions"
                style={{ color: "white", textDecoration: "none", justifyContent:"center", textAlign:'center'}}
                className="autostock-link"
                >
                View Your Competitions
            </Link>
        </Typography>
      </Button>
      <Divider sx={{my:3}}/>

      <div id="chart" style={{marginTop: 25, marginBottom: 25}} >
        <h2>Featured Stock:<span className="stockTickName"> {randChoice}</span></h2>
        <HighChart stock={randChoice} stockData={data}/>
      </div>
      <Divider sx={{my:3}}/>

      <h2>Featured Competitions</h2>
      <Grid container spacing={2} sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {competitions.slice(0, 3).map((comp: any, index: number) => {
          let cardProps = {
            compLength: comp.duration,
            compTicker: comp.name,
            compStartingVal: `Starting Balance: ${comp.startingBalance}`,
            compDeadline: comp.endDate,
            description: comp.description,
            id: comp.id,
            logo: comp.logo,
          }
          return (
            <Grid key={index} item xs={4}>
              <ComplexCompCard key={index} {...cardProps} />
            </Grid>
            
          )
        })}
      </Grid>
      <Button  sx={{ flexGrow: 1, display: { xs: "flex", md: "none", lg: "none" } }} className="btn_viewBattles" variant="contained">
        <Typography
            fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
            noWrap
            component="div"
            sx={{  display: { xs: "flex", md: "none" } }}
            >
            <Link
                to="/app/competitions"
                style={{ color: "white", textDecoration: "none", justifyContent:"center", textAlign:'center'}}
                className="autostock-link"
                >
                View Competitions
            </Link>
        </Typography>
      </Button>
      <br></br>
      <h3>
        Lost? Take a look at our{" "}
        <Link to="/app/quickstartguide">Quick Start Guide</Link>!
      </h3>
    </Layout>
  )
}

export default Home
