import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GroupIcon from '@mui/icons-material/Group';

import  '../components/header.css'

import CreateIcon from '@mui/icons-material/Create';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import Hamburger from '@mui/icons-material/Menu';
import Typography from "@mui/material/Typography"

import { Link } from 'gatsby';

type Anchor = 'left';

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    left: false,
  });


  const CompPage = <Link to="/app/competitions"
    style={{ color: "black", textDecoration: "none" }}>Competitions</Link>

  const LeaderboardPage = <Link to="/app/leaderboards"
    style={{ color: "black", textDecoration: "none" }}>Leaderboard</Link>

  const QuickStartGuide = <Link to="/app/quickstartguide"
    style={{ color: "black", textDecoration: "none" }}>Quick Start Guide</Link>

  const pages = [
    <Link
      to="/app/createalgorithm"
      style={{ color: "black", textDecoration: "none" }}
    >
      Create Algorithm
    </Link>,
    <Link
      to="/app/myalgorithms"
      style={{ color: "black", textDecoration: "none" }}
    >
      My Algorithms
    </Link>,
    <Link
      to="/app/publicalgorithms"
      style={{ color: "black", textDecoration: "none" }}
    >
      Public Algorithms
    </Link>,
  ]

  

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 350 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
        <List>
            <Typography
                fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                fontWeight="Bold"
                variant="h4"
                noWrap
                align="center"
                component="div"
                style={{ color: "#059a76" }}
                sx={{mb:5}}
            >
                <Link
                to="/app/home"
                style={{ color: "#059a76", textDecoration: "none" }}
                className="autostock-link"
                >
                AutoStock
                </Link>
            </Typography>
          
            {pages.map((text, index)=> (
                <ListItem>
                    <ListItemIcon>
                        {index == 0 && <CreateIcon/>}
                        {index == 1 && <ShowChartIcon/>}
                        {index == 2 && <GroupIcon/>}
                    </ListItemIcon>
                    <Typography
                        textAlign="center"
                        fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                        fontWeight="medium"
                        align="right"
                        component="div"
                    >{text}</Typography>
                </ListItem>
            ))}
            {/* <Divider /> */}

                <ListItem sx={{mb:1}}>    
                    <ListItemIcon>
                        <EmojiEventsIcon/>
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
            <List>
                <ListItem>    
                    <ListItemIcon>
                    <LeaderboardIcon/>
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
            </List>
            {/* <Divider /> */}
                <ListItem>    
                    <ListItemIcon>
                    <ShowChartIcon/>
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
        </List>
    </Box>
  );

  return (
    <div >
      {(['left'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}><Hamburger color="disabled"/></Button>
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
  );
}
