import React, { useEffect, useState } from "react"
import { getUser, isLoggedIn } from "../services/auth"
import LayoutLanding from "../components/layout_landing"
import Seo from "../components/seo"
import { AppBar, Box, Collapse, Grid, Toolbar, Typography, Button } from "@mui/material"
import "../components/screens/landingPage.css"
import { Link } from "gatsby"

const IndexPage = () => {
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

    let link_start;
    if (isLoggedIn()){
      link_start =  <Link
        to="/app/home"
        style={{ color: "white", textDecoration: "none", justifyContent:"center", textAlign:'center'}}
        className="autostock-link"
        >
        Get Started
  </Link>
    }
    else{
      link_start =  <Link
      to="/app/login"
      style={{ color: "white", textDecoration: "none", justifyContent:"center", textAlign:'center'}}
      className="autostock-link"
      >
      Get Started
  </Link>
    }
  return (
    <LayoutLanding>
      <div className="landingPageRoot">
            <Seo title="Home" />
            <div style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}>
                <Typography
                      fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                      fontWeight="Bold"
                      variant="h2"
                      component="div"
                      sx={{ mt:{xs:0, md:20}, mb:0, display:"flex", textAlign:'center'}}
                      style={{ color: "white" }}
                      >

                  {isLoggedIn() ? (
                    <>
                      {username == "" ? (
                        <>
                        Welcome to Autostock
                        </>
                        ) : (
                        <>
                        Welcome to Autostock, {username}!
                        <br></br>                       
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

            </div>  
            <div style={{
                display:'flex',
                justifyContent: "center",
                width: "100%",
              }}> 
                <Typography
                    fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                    fontSize="30px"
                    component="div"
                    textAlign="center"
                    sx={{ display:{xs: 'none', md:"flex"}, mb:10}}
                    style={{ color: "white" }}
                    >
                    Click to learn more about how to trade algorithmically with <br/>no coding experience!
                </Typography>
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                }}>
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
                           {isLoggedIn() ? 
                              <Link
                                to="/app/home"
                                style={{ color: "white", textDecoration: "none", justifyContent:"center", textAlign:'center'}}
                                className="autostock-link"
                                >
                                Get Started
                          </Link>
                           :
                              <Link
                              to="/app/login"
                              style={{ color: "white", textDecoration: "none", justifyContent:"center", textAlign:'center'}}
                              className="autostock-link"
                              >
                              Get Started
                          </Link>
                        }
                        </Typography>
                    </Button>
            </div>
        </div>
    </LayoutLanding>
    
  )
}

export default IndexPage
