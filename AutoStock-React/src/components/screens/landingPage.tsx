import { useEffect, useState } from "react"
import LayoutLanding from "../layout_landing"
// import Layout from "../layout"
import { getUser, isLoggedIn } from "../../services/auth"

import * as React from "react"

import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import "../screens/landingPage.css"
import { Link, navigate } from "gatsby"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { CardActionArea, Divider } from "@mui/material"

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link>Autostock</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const theme = createTheme()

export default function LandingPage() {
  const [username, setUsername] = useState("")
  useEffect(() => {
    getUserDB()
    console.log(username)
  }, [])
  const getUserDB = () => {
    //fetch post to localhost
    // console.log("getting comp db" + window.history.state.id)
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
  }

  let link_start
  if (isLoggedIn()) {
    link_start = (
      <Link
        to="/app/home"
        style={{
          color: "white",
          textDecoration: "none",
          justifyContent: "center",
          textAlign: "center",
        }}
        className="autostock-link"
      >
        Get Started
      </Link>
    )
  } else {
    link_start = (
      <Link
        to="/app/login"
        style={{
          color: "white",
          textDecoration: "none",
          justifyContent: "center",
          textAlign: "center",
        }}
        className="autostock-link"
      >
        Get Started
      </Link>
    )
  }

  return (
    <LayoutLanding>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: "#14110F",
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="md">
              <Typography
                fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                fontWeight="500"
                variant="h2"
                component="div"
                sx={{
                  mt: { xs: 0, md: 0 },
                  mb: 0,
                  display: "flex",
                  textAlign: "center",
                }}
                style={{ color: "#F2F4FF" }}
              >
                {isLoggedIn() ? (
                  <>
                    {username == "" ? (
                      <>Welcome to Autostock</>
                    ) : (
                      <>
                        Welcome to Autostock, {username}!<br></br>
                      </>
                    )}
                    <br></br>
                  </>
                ) : (
                  <>
                    Welcome to Autostock
                    <br></br>
                  </>
                )}
              </Typography>
            </Container>
          </Box>

          <Container sx={{ py: 8 }} maxWidth="md">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Typography
                fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                fontSize="30px"
                fontWeight="600"
                component="div"
                textAlign="center"
                sx={{ display: { xs: "none", md: "flex" }, mb: 5 }}
                style={{ color: "#059a76" }}
              >
                Start your journey with Autostock today!
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Button
                sx={{ mt: 0, mb: 5 }}
                className="btn_getStarted"
                variant="contained"
              >
                <Typography
                  fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                  variant="h5"
                  fontSize="25px"
                  noWrap
                  component="div"
                  sx={{ display: { xs: "flex", md: "flex" } }}
                  style={{ color: "white" }}
                >
                  {isLoggedIn() ? (
                    <Link
                      to="/app/home"
                      style={{
                        color: "white",
                        textDecoration: "none",
                        justifyContent: "center",
                        textAlign: "center",
                      }}
                      className="autostock-link"
                    >
                      Get Started
                    </Link>
                  ) : (
                    <Link
                      to="/app/login"
                      style={{
                        color: "white",
                        textDecoration: "none",
                        justifyContent: "center",
                        textAlign: "center",
                      }}
                      className="autostock-link"
                    >
                      Get Started
                    </Link>
                  )}
                </Typography>
              </Button>
            </div>
            <Divider sx={{ mb: 5 }} />
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea
                    onClick={
                      isLoggedIn()
                        ? () => navigate(`/app/createalgorithm`)
                        : () => navigate("/app/login")
                    }
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image="/static/images/cards/contemplative-reptile.jpg"
                      alt="some stock image of some old white dude prob"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Create
                      </Typography>
                      <Typography
                        sx={{ mb: 0 }}
                        variant="body2"
                        color="text.secondary"
                      >
                        Design unique algorithms to practice trading strategies
                        with the stocks of your choice!
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image="/static/images/cards/contemplative-reptile.jpg"
                      alt="some stock image of some old white dude prob"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Compete
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Enter competitions with other traders to see who can
                        create the best trading algorithms.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item xs={4}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image="/static/images/cards/contemplative-reptile.jpg"
                      alt="some stock image of some old white dude prob"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Share
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Share your knowledge with others and get feedback from
                        other traders!
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </main>
        {/* Footer */}
        <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            OOGA BOOGA
          </Typography>
          <Copyright />
        </Box>
        {/* End footer */}
      </ThemeProvider>
    </LayoutLanding>
  )
}
