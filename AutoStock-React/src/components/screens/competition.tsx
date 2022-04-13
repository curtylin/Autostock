import React, { useState, useEffect } from "react"
import Button from "@mui/material/Button"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import Threads from "../threads"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Layout from "../layout"
import Seo from "../seo"
import { getUser } from "../../services/auth"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Backdrop,
  Box,
  Card,
  CardContent,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import HighChart from "../highChart"
import Skeleton from "@mui/material/Skeleton"
import "./screens.css"
import AddIcon from "@mui/icons-material/Add"
import Dialog from "@mui/material/Dialog"
import CommentDialog from "../commentDialog"
import { Co2Sharp, Sd, TextSnippetOutlined } from "@mui/icons-material"
import { useForceUpdate } from "@chakra-ui/react"
import { Link } from "gatsby"

const Competition = () => {
  const [snackOpenSubmit, setSnackOpenSubmit] = useState(false)
  const [snackOpen, setSnackOpen] = useState(false)
  const [algorithms, setAlgorithms] = useState(new Set())
  const [competitiorID, setCompetitiorID] = useState("")
  const [competition, setCompetition] = useState({})
  const [chosenAlgorithm, setChosenAlgorithm] = useState("")
  const [competitionID, setCompetitionID] = useState(window.history.state.id)
  const [discussions, setDiscussions] = useState([])
  const [threads, setThreads] = useState([])
  const [comments, setComments] = useState([])
  const [data, setStockData] = useState([])
  const [open, setOpen] = React.useState(false)
  const [newThreadDescription, setNewThreadDescription] = useState("")
  const [newThreadTitle, setNewThreadTitle] = useState("")
  const [users, setUsers] = useState(new Map<string, string>())
  const [openBackdrop, setOpenBackdrop] = useState(false)
  const [done, setDone] = useState(false)
  const [allAlgos, setAllAlgos] = useState(new Map<string, string>())
  const [showSpinner, setShowSpinner] = useState(true)

  useEffect(() => {
    ;(async function () {
      await getCompDB().then(async () => {
        if (chosenAlgorithm == "") {
          await getCurrentAlgorithm()
        }
      })
      await getAlgorithmsDB()
      await getAllAlgorithmsDB()
      await getDiscussionsDB()
      await getThreadsDB()
      await getUsersDB()
      setDone(true)
      setShowSpinner(false)
      console.log("algorithms"+algorithms)
    })()
  }, [chosenAlgorithm])

  const getUsersDB = async () => {
    //fetch post to localhost
    await fetch("http://localhost:5000/list-user", {
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
          setUsers(
            prev => new Map([...prev, [result[i].userID, result[i].username]])
          )
        }
      })
  }

  const getAllAlgorithmsDB = () => {
    //fetch post to localhost
    fetch("http://localhost:5000/list-algorithm", {
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
          setAllAlgos(
            prev => new Map([...prev, [result[i].id, result[i].name]])
          )
        }
      })
  }

  const getThreadsDB = async () => {
    await fetch(
      `http://localhost:5000/get-threads/${window.history.state.id}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    )
      .then(res => {
        return res.json()
      })
      .then(result => {
        setThreads(result)
      })
  }

  const getDiscussionsDB = async () => {
    await fetch(
      `http://localhost:5000/get-discussions/${window.history.state.id}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    )
      .then(res => {
        return res.json()
      })
      .then(result => {
        setDiscussions(result)
      })
  }

  const getCompDB = async () => {
    //fetch post to localhost
    await fetch(
      `http://localhost:5000/get-competition/${window.history.state.id}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    )
      .then(res => {
        return res.json()
      })
      .then(result => {
        console.log(result)
        setCompetition(result)
      })
  }

  const getAlgorithmsDB = async () => {
    //fetch post to localhost
    await fetch(`http://localhost:5000/list-algorithm/${getUser().uid}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then(async res => {
        let out = await res.json()
        return out
      })
      .then(result => {
        console.log(result)
        setAlgorithms(new Set(result))
      })
  }

  const getCurrentAlgorithm = async () => {
    //fetch post to localhost
    await fetch(`http://localhost:5000/list-competition/${getUser().uid}`, {
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
          if (result[i].competition === competitionID) {
            setChosenAlgorithm(result[i].algorithm)
            setCompetitiorID(result[i].id)
          }
        }
      })
  }

  const handleSnackClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }

    setSnackOpen(false)
    setSnackOpenSubmit(false)
  }

  const handleExpand = async (event: any) => {
    let today = new Date().toISOString().slice(0, 10)
    const d = new Date()
    d.setFullYear(d.getFullYear() - 1)

    let lastYear = d.toISOString().slice(0, 10)

    let body = `{
      "ticker": "${competition.ticker}",
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

    await fetch("http://localhost:5000/gethighchartdata ", init)
      .then(res => {
        return res.json()
      })
      .then(result => {
        setStockData(result)
      })
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (value: string) => {
    setOpen(false)
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
    event.preventDefault()
    getCurrentAlgorithm()
    setSnackOpenSubmit(true)

    // window.location.reload()
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
    fetch(
      `http://localhost:5000/edit-competition-algorithm/${competitiorID}`,
      init
    )
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
    event.preventDefault()
  }

  let submitButton
  const closeDate = new Date(competition.competitionLockDate)
  if (closeDate > new Date()) {
    // console.log("submissions open")
    if (competitiorID == "") {
      submitButton = (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          {" "}
          Submit Algorithm{" "}
        </Button>
      )
    } else {
      submitButton = (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleResubmit}
        >
          {" "}
          Update Algorithm{" "}
        </Button>
      )
    }
  } else {
    // console.log("submissions closed ")
  }

  const submitThread = () => {
    console.log("saved")
    setSnackOpen(true)
    setOpenBackdrop(true)

    console.log(newThreadDescription)
    let body = `{
      "compID": "${competition.id}",
      "userID": "${getUser().uid}",
      "threadTitle": "${newThreadTitle}",
      "threadDescription": "${newThreadDescription
        .replace(/\n/g, "\\\\n")
        .replace(/\r/g, "\\\\r")
        .replace(/\t/g, "\\\\t")}",
      "date": "${new Date().toISOString()}"
    }`
    const headers = new Headers()
    headers.append("content-type", "application/json")
    let init = {
      method: "POST",
      headers,
      body,
    }
    fetch("http://localhost:5000/create-thread", init)
      .then(response => {
        return response.json()
      })
      .then(text => {
        setNewThreadTitle("")
        setNewThreadDescription("")
        getThreadsDB()
        setOpenBackdrop(false)
      })
  }

  return (
    <Layout>
      <Seo title="Autostock" />
      <Typography
        fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
        fontWeight="Bold"
        sx={{ marginTop: 5, fontSize: 40, fontWeight: "bold" }}
        textAlign="center"
        variant="h1"
        gutterBottom
      >
        {competition.name}
      </Typography>

      <Typography
        sx={{ marginBottom: 5, fontSize: 20 }}
        fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
        fontWeight="medium"
        variant="h2"
        textAlign="center"
        gutterBottom
      >
        Ticker: <span className="stockTickName">{competition.ticker}</span>
      </Typography>

      <Card sx={{ marginBottom: 2, minWidth: 275 }}>
        <CardContent>
          <Typography
            sx={{ fontSize: 20 }}
            justifyContent="center"
            fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
            fontWeight="medium"
            variant="h2"
            gutterBottom
          >
            Competition Details:
          </Typography>
          <Typography
            sx={{ ml: 5, fontSize: 18 }}
            justifyContent="center"
            fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
            fontWeight="400"
            variant="h2"
            gutterBottom
          >
            Submissions Close: {competition.competitionLockDate}
          </Typography>
          <Typography
            sx={{ ml: 5, fontSize: 18 }}
            justifyContent="center"
            fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
            fontWeight="400"
            variant="h2"
            gutterBottom
          >
            Participants:{" "}
            <span className="stockTickName"> {competition.competitiors}</span>
          </Typography>
          <Typography
            sx={{ ml: 5, fontSize: 18 }}
            justifyContent="center"
            fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
            fontWeight="400"
            variant="h2"
            gutterBottom
          >
            Duration: {competition.duration}
          </Typography>
          <Typography
            sx={{ ml: 5, fontSize: 18 }}
            justifyContent="center"
            fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
            fontWeight="400"
            variant="h2"
            gutterBottom
          >
            Starting Balance: ${competition.startingBalance}
          </Typography>
        </CardContent>
      </Card>
      <Accordion sx={{}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            sx={{ fontSize: 20 }}
            justifyContent="center"
            fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
            fontWeight="medium"
            variant="h2"
            gutterBottom
          >
            Description
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            sx={{ fontSize: 18 }}
            justifyContent="center"
            fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
            fontWeight="400"
            variant="h3"
            gutterBottom
          >
            {competition.description}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={handleExpand}
        >
          <Typography
            sx={{ fontSize: 20 }}
            justifyContent="center"
            fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
            fontWeight="medium"
            variant="h2"
            gutterBottom
          >
            Historical Data
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <HighChart stock={competition.ticker} stockData={data} />
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{mb: 3}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            sx={{ fontSize: 20 }}
            justifyContent="center"
            fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
            fontWeight="medium"
            variant="h2"
            gutterBottom
          >
            Leaderboard
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
       
          <table className="mdc-data-table__table" aria-label="my-algorithms">
            <thead>
              <tr className="mdc-data-table__header-row">
                <th
                  className="table_header"
                  role="columnheader"
                  scope="col"
                  align="center"
                >
                  Algorithm Name
                </th>
                <th className="table_header" role="columnheader" scope="col">
                  Profit
                </th>
                <th className="table_header" role="columnheader" scope="col">
                  {" "}
                  Creator{" "}
                </th>
              </tr>
            </thead>
            {showSpinner ? <CircularProgress sx={{mt:1}} color="inherit" /> :
            <tbody className="mdc-data-table__content">
              {!done
                ? null
                : competition.leaderboard.map((algorithm: any, key: any) => {
                    return (
                      <tr className="table_row" key={key}>
                        <td className="table_data" scope="row">
                          {allAlgos.has(algorithm.algorithm) ? (
                            <Link
                              to="/app/algorithm"
                              state={{
                                id: algorithm.algorithm,
                                userID: algorithm.userID,
                              }}
                            >
                              {allAlgos.get(algorithm.algorithm)}
                            </Link>
                          ) : (
                            "Private Algorithm"
                          )}
                        </td>
                        <td className="table_data">
                          {Number(algorithm.PnLPercent).toFixed(5)}%
                        </td>
                        <td className="table_data">
                          {users.has(algorithm.userID)
                            ? users.get(algorithm.userID)
                            : algorithm.userID}
                        </td>
                      </tr>
                    )
                  })}
            </tbody>}
          </table>
        </AccordionDetails>
      </Accordion>

      {new Date(competition.competitionLockDate) > new Date() ? (
        <h2>
          Submissions <span className="openText">Open</span>
        </h2>
      ) : (
        <h2>
          Submissions <span className="closedText">Closed</span>
        </h2>
      )}
      {new Date(competition.competitionLockDate) > new Date() ? (
        <FormControl sx={{ my: 0, mr: 5, minWidth: 300 }}>
          <InputLabel required id="demo-simple-select-standard-label">
            Choose an Algorithm
          </InputLabel>
          {/* GET USERS ALGORITHMS */}
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="Choose an Algorithm"
            value={chosenAlgorithm}
            onChange={e => {
              setChosenAlgorithm(e.target.value)
            }}
          >
            {Array.from(algorithms).map((algorithm: any, key: any) => {
              return (
                <MenuItem value={`${algorithm.id}`}>{algorithm.name}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
      ) : (
        <FormControl sx={{ my: 0, mr: 5, minWidth: 300 }} disabled>
          <InputLabel required id="demo-simple-select-standard-label">
            Choose an Algorithm
          </InputLabel>
          {/* GET USERS ALGORITHMS */}
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="Choose an Algorithm"
            value={chosenAlgorithm}
            onChange={e => {
              setChosenAlgorithm(e.target.value)
            }}
          >
            {Array.from(algorithms).map((algorithm: any, key: any) => {
              return (
                <MenuItem value={`${algorithm.id}`}>{algorithm.name}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
      )}

      <FormControl sx={{ my: 2, mr: 5, minWidth: 300 }}>
        {/* maybe change size to match menuItem */}
        {submitButton}
        {/* {submitButton} */}
      </FormControl>

      <Divider sx={{ mb: 5, mt: 5 }} />

      <h1>Discussions</h1>

      <Box border={1} sx={{ p: 2, mb: 2 }} borderRadius={1}>
        <h3>Create new thread</h3>
        <FormControl fullWidth>
          <TextField
            inputProps={{ maxLength: 300 }}
            value={newThreadTitle}
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNewThreadTitle(e.target.value)
            }}
            sx={{ mb: 1 }}
            label="Thread title"
            fullWidth
          ></TextField>

          <TextField
            inputProps={{ maxLength: 1000 }}
            value={newThreadDescription}
            multiline
            rows={3}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNewThreadDescription(e.target.value)
            }}
            sx={{ mb: 0 }}
            label="Thread description"
            fullWidth
          ></TextField>
        </FormControl>
        <Button
          disabled={!newThreadTitle}
          onClick={submitThread}
          startIcon={<AddIcon />}
          style={{ textTransform: "none" }}
          sx={{ mt: 1, width: { xs: 310, s: 300 } }}
          variant="contained"
        >
          New Thread
        </Button>
      </Box>
      <div>
        {threads.map((thread: any, index: number) => {
          let threadProps = {
            id: thread.id,
            threadTitle: thread.threadTitle,
            threadDescription: thread.threadDescription,
            threadCreator: thread.userID,
            users: users,
          }
          return <Threads key={index} {...threadProps} />
        })}
      </div>
      <Snackbar
        open={snackOpen}
        autoHideDuration={4000}
        onClose={handleSnackClose}
        message="Thread submitted!"
      />
      <Snackbar
        open={snackOpenSubmit}
        autoHideDuration={4000}
        onClose={handleSnackClose}
        message="Algorithm submitted!"
      />
      <Backdrop sx={{ color: "#fff" }} open={openBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Layout>
  )
}

export default Competition

function setTotalReactPackages(total: any): any {
  throw new Error("Function not implemented.")
}
