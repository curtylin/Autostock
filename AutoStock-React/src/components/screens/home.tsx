import * as React from "react"
import { useEffect, useState } from "react"
import Layout from "../layout"
import Seo from "../seo"
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material"
import ComplexCompCard from "../complexCompCard"
import HighChart from "../highChart"
import News from "../newsarticle"
import { Link, navigate } from "gatsby"
import { getUser } from "../../services/auth"
import "./screens.css"
import AddIcon from "@mui/icons-material/Add"
import Container from "@mui/material/Container"

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
    fetch("/api/list-competitions")
      .then(res => {
        return res.json()
      })
      .then(result => {
        setCompetitions(result)
      })

    fetch("/api/gethighchartdata ", init)
      .then(res => {
        return res.json()
      })
      .then(result => {
        setStockData(result)
      })

    fetch(`/api/list-entered-competitions/${getUser().uid}`)
      .then(res => {
        return res.json()
      })
      .then(result => {
        setEnteredComps(result)
      })

    fetch(`/api/get-user/${getUser().uid}`, {
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
      <Box
        sx={{
          bgcolor: "white",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="md">
          <Typography
            fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
            fontWeight="500"
            fontSize="40px"
            variant="h2"
            component="div"
            sx={{
              mt: { xs: 0, md: 0 },
              mb: 0,
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
            }}
            style={{ color: "black" }}
          >
            {username == "" ? (
              <>
                Hi! Looks like you have not&nbsp;
                <Link className="dis_UserName" to="/app/edituser">
                  set a username.
                </Link>
              </>
            ) : (
              <>
                Welcome back,<span className="dis_UserName">{username}</span>!
              </>
            )}
          </Typography>
        </Container>
      </Box>

      <h2>Today's Top Headlines:</h2>
      <News />
      <Divider sx={{ my: 3 }} />
      {enteredComps.length > 0 ? (
        <div>
          <h2>Your Competitions</h2>
          <Grid
            direction={{ xs: "column", md: "row" }}
            alignContent={{ xs: "center", sm: "flex", md: "flex" }}
            justifyContent="left"
            container
            spacing={1}
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
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
            {enteredComps.length < 3 ? (
              <Button
                variant="outlined"
                onClick={event => {
                  navigate(`/app/notenteredcompetitions`)
                }}
                startIcon={<AddIcon />}
                sx={{
                  minWidth: 300,
                  maxWidth: 300,
                  ml: { xs: 1, lg: 1 },
                  mt: 1,
                }}
              >
                Enter Competitions
              </Button>
            ) : null}
          </Grid>
          <Button
            sx={{
              margin: "auto",
              flexGrow: 1,
              display: { xs: "flex", md: "none", lg: "none" },
            }}
            className="btn_viewBattles"
            variant="contained"
          >
            <Typography
              fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
              noWrap
              component="div"
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              <Link
                to="/app/enteredcompetitions"
                style={{
                  color: "white",
                  textDecoration: "none",
                  justifyContent: "center",
                  textAlign: "center",
                }}
                className="autostock-link"
              >
                View Your Competitions
              </Link>
            </Typography>
          </Button>
          <Divider sx={{ my: 3 }} />
        </div>
      ) : null}

      <div id="chart" style={{ marginTop: 25, marginBottom: 25 }}>
        <h2>
          Featured Stock:<span className="stockTickName"> {randChoice}</span>
        </h2>
        <HighChart stock={randChoice} stockData={data} />
      </div>
      <Divider sx={{ my: 3 }} />

      <h2>Featured Competitions</h2>
      <Grid
        direction={{ xs: "column", md: "row" }}
        alignContent={{ xs: "center", sm: "flex", md: "flex" }}
        justifyContent="left"
        container
        spacing={1}
        sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
      >
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
      <Button
        sx={{
          margin: "auto",
          flexGrow: 1,
          display: { xs: "flex", md: "none", lg: "none" },
        }}
        className="btn_viewBattles"
        variant="contained"
      >
        <Typography
          fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
          noWrap
          component="div"
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          <Link
            to="/app/competitions"
            style={{
              color: "white",
              textDecoration: "none",
              justifyContent: "center",
              textAlign: "center",
            }}
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
