import * as React from "react"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import Button from "@mui/material/Button"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import ListItem from "@mui/material/ListItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import GroupsIcon from '@mui/icons-material/Groups';
import GroupIcon from "@mui/icons-material/Group"
import Logo from "../images/AutostockLogo_greenandblack.jpg"
import FlightLandIcon from '@mui/icons-material/FlightLand';


import "../components/header.css"

import CreateIcon from "@mui/icons-material/Create"
import ShowChartIcon from "@mui/icons-material/ShowChart"
import LeaderboardIcon from "@mui/icons-material/Leaderboard"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"

import Hamburger from "@mui/icons-material/Menu"
import Typography from "@mui/material/Typography"

import { Link } from "gatsby"

type Anchor = "left"

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    left: false,
  })

  const LandingPage = (
    <Link
      to="/"
      style={{ textDecoration: "none"}}
      className="drawerItem"
    >
      Landing Page
    </Link>
  )
  const CompPage = (
    <Link
      to="/app/competitions"
      style={{ textDecoration: "none" }}
      className="drawerItem"
    >
      Competitions
    </Link>
  )

  const LeaderboardPage = (
    <Link
      to="/app/leaderboards"
      style={{ textDecoration: "none" }}
      className="drawerItem"
    >
      Leaderboard
    </Link>
  )

  const QuickStartGuide = (
    <Link
      to="/app/quickstartguide"
      style={{ textDecoration: "none" }}
      className="drawerItem"
    >
      Quick Start Guide
    </Link>
  )

  const AboutUsPage = (
    <Link 
      to="/app/aboutus"
      style={{ textDecoration: "none" }}
      className="drawerItem"
    > 
      About Us
    </Link>
  )

  const pages = [
    <Link
      to="/app/createalgorithm"
      style={{ textDecoration: "none" }}
      className="drawerItem"
    >
      Create Algorithm
    </Link>,
    <Link
      to="/app/myalgorithms"
      style={{ textDecoration: "none" }}
      className="drawerItem"
    >
      My Algorithms
    </Link>,
    <Link
      to="/app/publicalgorithms"
      style={{ textDecoration: "none" }}
      className="drawerItem"
    >
      Public Algorithms
    </Link>,
  ]

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return
      }

      setState({ ...state, [anchor]: open })
    }

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 350 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Box>
        <Link
            to="/app/home"
            style={{ color: "black", textDecoration: "none" }}
            className="autostock-link"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <img
                style={{ marginBottom: 0, marginRight: 5 }}
                width={50}
                src={Logo}
              ></img>
            </div>
          </Link>
        <Typography
          fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
          fontWeight="Bold"
          variant="h4"
          noWrap
          align="center"
          component="div"
          style={{ color: "#059a76" }}
          sx={{ mb: 5 }}
        >
          <Link
            to="/app/home"
            style={{ color: "#059a76", textDecoration: "none" }}
            className="autostock-link"
          >
            Autostock
          </Link>
        </Typography>
        </Box>

        {pages.map((text, index) => (
          <ListItem>
            <ListItemIcon>
              {index == 0 && <CreateIcon  style={{color:"#059a76"}}/>}
              {index == 1 && <ShowChartIcon  style={{color:"#059a76"}}/>}
              {index == 2 && <GroupIcon style={{color:"#059a76"}} />}
            </ListItemIcon>
            <Typography
              textAlign="center"
              fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
              fontWeight="medium"
              align="right"
              component="div"
            >
              {text}
            </Typography>
          </ListItem>
        ))}
        {/* <Divider /> */}

        <ListItem>
          <ListItemIcon>
            <EmojiEventsIcon  style={{color:"#059a76"}}/>
          </ListItemIcon>
          <Typography
            textAlign="center"
            fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
            fontWeight="medium"
            align="right"
            component="div"
          >
            {CompPage}
          </Typography>
        </ListItem>

        {/* <Divider /> */}
        <ListItem>
          <ListItemIcon>
            <LeaderboardIcon  style={{color:"#059a76"}}/>
          </ListItemIcon>
          <Typography
            textAlign="center"
            fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
            fontWeight="medium"
            align="right"
            component="div"
          >
            {LeaderboardPage}
          </Typography>
        </ListItem>
        {/* <Divider /> */}
        <ListItem>
          <ListItemIcon>
            <ShowChartIcon  style={{color:"#059a76"}}/>
          </ListItemIcon>
          <Typography
            textAlign="center"
            fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
            fontWeight="medium"
            align="right"
            component="div"
          >
            {QuickStartGuide}
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <GroupsIcon  style={{color:"#059a76"}}/>
          </ListItemIcon>
          <Typography
            textAlign="center"
            fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
            fontWeight="medium"
            align="right"
            component="div"
          >
            {AboutUsPage}
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FlightLandIcon style={{color:"#059a76"}}/>
          </ListItemIcon>
          <Typography
            textAlign="center"
            fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
            fontWeight="medium"
            align="right"
            component="div"
          >
            {LandingPage}
          </Typography>
        </ListItem>
      </List>
    </Box>
  )

  return (
    <div>
      {(["left"] as const).map(anchor => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <Hamburger color="disabled" />
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  )
}
