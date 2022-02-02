import React, { useState, useEffect } from "react"
import Button from "@mui/material/Button"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select, {SelectChangeEvent} from "@mui/material/Select"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Layout from "../layout"
import Seo from "../seo"
import { getUser } from "../../services/auth"

const Competition = () => {
  const [open, setOpen] = useState(false)
  const [chosenAlgorithm, setChosenAlgorithm] = useState("")
  const [competition, setCompetition] = useState<any>([])
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
    setOpen(true);
    let body = `{
        "algorithm": "${chosenAlgorithm}",
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


    const [algorithms, setAlgorithms] = useState([])
    useEffect(() => {
      getAlgorithmsDB()
      console.log(algorithms)
    }, [])
  
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

    const handleClose = () => {
      setOpen(false);
    };

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
                                value={chosenAlgorithm}
                                onChange={e => {
                                    setChosenAlgorithm(e.target.value)
                                }}
                            >
                            {algorithms.map((algorithm: any, key: any) => {
                                 return (<MenuItem value={`${algorithm.id}`}>{algorithm.name}</MenuItem>)
                            })}
                            </Select>
                    </FormControl>
      <FormControl sx={{my: 2, mr: 5, minWidth: 300}}>
         {/* maybe change size to match menuItem */}
        <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
            Submit Algorithm
        </Button>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"You have submitted an algorithm!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Click "Ok" or anywhere outside to exit this dialog box.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
      </FormControl>
    </Layout>
  )
}

export default Competition

function setTotalReactPackages(total: any): any {
  throw new Error("Function not implemented.")
}
