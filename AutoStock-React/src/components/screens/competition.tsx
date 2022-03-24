import React, { useState, useEffect } from "react"
import Button from "@mui/material/Button"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select, {SelectChangeEvent} from "@mui/material/Select"
import Discussions from "../discussions"


import Layout from "../layout"
import Seo from "../seo"
import { getUser } from "../../services/auth"
import { Card, CardContent, Divider, Stack, Typography } from "@mui/material"

const Competition = () => {

  const [algorithms, setAlgorithms] = useState([])
  const [competitiorID, setCompetitiorID] = useState("")
  const [competition, setCompetition] = useState({})
  const [chosenAlgorithm, setChosenAlgorithm] = useState("")
  const [competitionID, setCompetitionID] = useState(window.history.state.id)
  const [discussions, setDiscussions] = useState([])
  useEffect(() => {
    getCompDB().then(() => {
      console.log(competition)
      if (chosenAlgorithm == "") {
        getCurrentAlgorithm()
      }
      getAlgorithmsDB() 
      console.log(chosenAlgorithm)
    })
    // getDiscussionsDB()
  }, [chosenAlgorithm])

  const getDiscussionsDB = () => {
    fetch(`http://localhost:5000/get-discussions/${window.history.state.id}`, {
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
        console.log(result )
        setDiscussions(result)
      })
  }

  const getCompDB = async () => {
    //fetch post to localhost
    // console.log("getting comp db" + window.history.state.id) 
    fetch(`http://localhost:5000/get-competition/${window.history.state.id}`, {
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
        setCompetition(result)
      })
  }

  
  const getAlgorithmsDB = () => {
    //fetch post to localhost
    fetch(`http://localhost:5000/list-algorithm/${getUser().uid}`, {
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
        setAlgorithms(result)
      })
  }

  const getCurrentAlgorithm = () => {
    //fetch post to localhost
    // console.log("getting competitor information from db: " + getUser().uid) 
    fetch(`http://localhost:5000/list-competition/${getUser().uid}`, {
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
        for (let i = 0; i < result.length; i++) {
          console.log(result[i].competition , competitionID)
          if (result[i].competition === competitionID)
          {
            console.log("algo: " + result[i].algorithm)
            setChosenAlgorithm(result[i].algorithm)
            setCompetitiorID(result[i].id)
          }
        }
      })
  }

  // HANDLE SUBMITTING ALGORITHM
  const handleSubmit = (event: any) => {
    let body = `{
        "algorithm": "${chosenAlgorithm}",
        "competition": "${competition.id}",
        "userID": "${getUser().uid}"
        }
        `
    const headers = new Headers()
    headers.append("content-type", "application/json")
    let init = {
        method: "POST",
        headers,
        body,
    }
    fetch("http://127.0.0.1:5000/enter-competition", init)
            .then(response => {
                return response.json() // or .text() or .blob() ...
            })
            .then(text => {
                // text is the response body
                // console.log(text);
            })
            .catch(e => {
                // error in e.message
            })
        event.preventDefault();
  }

  const handleResubmit = (event: any) => {
    let body = `{
        "algorithm": "${chosenAlgorithm}"
        }
        `
    const headers = new Headers()
    headers.append("content-type", "application/json")
    let init = {
        method: "PUT",
        headers,
        body,
    }
    fetch(`http://localhost:5000/edit-competition-algorithm/${competitiorID}`, init)
            .then(response => {
                return response.json() // or .text() or .blob() ...
            })
            .then(text => {
                // text is the response body
                // console.log(text);
            })
            .catch(e => {
                // error in e.message
            })
        event.preventDefault();
  }



    let submitButton;
    const closeDate = new Date(competition.endDate)
    if (closeDate > new Date())
    {
      // console.log("submissions open")
      if (competitiorID == "")
      {
        submitButton = <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}> Submit Algorithm </Button>
      }
      else
      {
        submitButton = <Button type="submit" variant="contained" color="primary" onClick={handleResubmit}> Update Algorithm </Button>
      }
    }
    else
    {
      // console.log("submissions closed ")
    }
  return (
    <Layout>
      <Seo title="AutoStock" />
      <h1>{competition.name}</h1> 
      <h2>Ticker: {competition.ticker}</h2>
      <h3>Participants: {competition.competitiors}</h3>
      <h3>Duration: {competition.duration}</h3>
      <h3>Starting Balance: {competition.startingBalance}</h3>
      <p>Details: {competition.description}</p>
      <></>
      <p>Submissions Close: {competition.endDate}</p>

      <FormControl sx={{my: 2, mr: 5, minWidth: 300}}> 
                        <InputLabel required id="demo-simple-select-standard-label">
                            Choose an Algorithm 
                        </InputLabel>
                            {/* GET USERS ALGORITHMS */}
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                label="Algorithm"
                                value={chosenAlgorithm}
                                onChange={e => {
                                    setChosenAlgorithm(e.target.value)
                                }}
                            >
                            {algorithms.map((algorithm: any, key: any) => {
                                 return (
                                 <MenuItem value={`${algorithm.id}`}>{algorithm.name}</MenuItem>
                                 )
                            })}
                            </Select>
      </FormControl>
      <FormControl sx={{my: 2, mr: 5, minWidth: 300}}>
         {/* maybe change size to match menuItem */}
         {submitButton}
         {/* {submitButton} */}
      </FormControl>

      <Divider sx={{ mb:5, mt: 5}}/>

      <Discussions/>
      <Stack direction="column" spacing={2} sx={{my: 5}}>
        {/* {discussions.slice(0, 6).map((disc: any, index: number) => {
          let cardProps = {
            
          } 
          return (
          <Stack key={index} direction="column" spacing={2}>
              <Card key={index} variant="outlined" sx={{minWidth: 275}} >
              <CardContent>
                <Typography variant="h5" component="div">
                    {disc.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Competition Length: {disc.duration}
                </Typography>     
              </CardContent>
              </Card>
          </Stack>
        )
        })} */}
    </Stack>                   

    </Layout>
  )
}

export default Competition

function setTotalReactPackages(total: any): any {
  throw new Error("Function not implemented.")
}
