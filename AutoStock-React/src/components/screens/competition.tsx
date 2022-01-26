import React, { useState, useEffect } from "react"
import Button from "@mui/material/Button"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select, {SelectChangeEvent} from "@mui/material/Select"


import Layout from "../layout"
import Seo from "../seo"

const Competition = () => {
  const [competition, setCompetition] = useState([])
  useEffect(() => {
    getCompDB()
    console.log(competition)
  }, [])

  const getCompDB = () => {
    //fetch post to localhost
    fetch("http://localhost:5000/get-competition/SbwzV5O2QkV9GS9EFNn4", {
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
        setCompetition(result)
      })
  }

  // HANDLE SUBMITTING ALGORITHM
  const handleSubmit = (event: any) => {
    let body = `{
        "algorithm": "${algo}",
        "competition": "${competition.id}"
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
                console.log(text);
            })
            .catch(e => {
                // error in e.message
            })
        event.preventDefault();
  }
  return (
    <Layout>
      <Seo title="AutoStock" />
      <h1>{competition.name}</h1> 
      <h2>Ticker: {competition.ticker}</h2>
      <h3>Participants: {competition.competitiors}</h3>
      <h3>Duration: {competition.competitiors}</h3>
      <h3>Starting Balance: {competition.startingBalance}</h3>
      <p>Details: {competition.description}</p>
      <></>
      <p>Submissions Close: {competition.closeDate}</p>

      <FormControl sx={{my: 2, mr: 5, minWidth: 300}}>
                        <InputLabel required id="demo-simple-select-standard-label">
                            Algorithm
                        </InputLabel>
                            {/* GET USERS ALGORITHMS */}
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                label="Algorithm"
                                // value={}
                                // onChange={e => {
                                //     setTimeInterval(e.target.value)
                                // }}
                            >
                                <MenuItem value={0}>Algorithm 0</MenuItem>
                                <MenuItem value={1}>Algorithm 1</MenuItem>
                                <MenuItem value={2}>Algorithm 2</MenuItem>
                            </Select>
                    </FormControl>
      <FormControl sx={{my: 2, mr: 5, minWidth: 300}}>
         {/* maybe change size to match menuItem */}
        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
            Submit Algorithm
        </Button>
      </FormControl>
    </Layout>
  )
}

export default Competition

function setTotalReactPackages(total: any): any {
  throw new Error("Function not implemented.")
}
