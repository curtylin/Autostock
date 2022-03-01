import * as React from "react"
import { useEffect, useState } from "react"
import LayoutLanding from "../layout_landing"
// import Layout from "../layout"

import Seo from "../seo"
import { AppBar, Box, Collapse, Grid, Toolbar, Typography, Button } from "@mui/material"
import "./landingPage.css"
import { Link } from "gatsby"
import { background } from "@chakra-ui/react"



export default function LandingPage() {
    return (
        <LayoutLanding>
        <div className="landingPageRoot">
            <Seo title="Home" />
            <div>
                <Box className="mainBox"    
                    sx={{
                        width: 1000,
                        height: 100,
                        display:'flex',
                    }}>
                         <Typography
                            fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                            fontWeight="Bold"
                            variant="h2"
                            noWrap
                            component="div"
                            sx={{ display:"flex", textAlign:'center'}}
                            style={{ color: "white" }}
                            >
                            Welcome to Autostock
                        </Typography>
                        
                </Box>
                <Typography
                    fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                    fontSize="30px"
                    noWrap
                    component="div"
                    sx={{ display:"flex", mb:10}}
                    style={{ color: "white" }}
                    >
                    Click to learn more about how to trade algorithmically with <br/>no coding experience!
                </Typography>
                <div>
                    <Button className="btn_getStarted" variant="contained">
                    <Typography
                                fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                                variant="h5"    
                                fontSize="25px"  
                                noWrap
                                component="div"
                                sx={{  display: { xs: "flex", md: "flex" } }}
                                style={{ color: "white" }}
                                >
                                <Link
                                    to="/app/login"
                                    style={{ color: "black", textDecoration: "none", justifyContent:"center", textAlign:'center'}}
                                    className="autostock-link"
                                    >
                                    Get Started
                                </Link>
                            </Typography>
                    </Button>
                </div>
            </div>
        </div>
        </LayoutLanding>
            

  );
}

