import React, { useState, useEffect } from "react"
import Button from "@mui/material/Button"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select, {SelectChangeEvent} from "@mui/material/Select"
import Discussions from "../discussions"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Layout from "../layout"
import Seo from "../seo"
import { getUser } from "../../services/auth"
import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, Divider, Stack, Typography } from "@mui/material"
import HighChart from "../highChart"
import "./screens.css"
import AddIcon from '@mui/icons-material/Add';


const Competition = () => {

  const [algorithms, setAlgorithms] = useState([])
  const [competitiorID, setCompetitiorID] = useState("")
  const [competition, setCompetition] = useState({})
  const [chosenAlgorithm, setChosenAlgorithm] = useState("")
  const [competitionID, setCompetitionID] = useState(window.history.state.id)
  const [discussions, setDiscussions] = useState([])
  const [data , setStockData] = useState([])

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

  const handleExpand = (event: any) => {
    let today = new Date().toISOString().slice(0, 10)
    const d = new Date();
    d.setFullYear(d.getFullYear()-1);
    
    let lastYear = d.toISOString().slice(0,10)

    console.log(today)
    console.log(lastYear)
    console.log(competition.ticker)

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

    fetch("http://localhost:5000/gethighchartdata ", init)
      .then(res => {
        return res.json()
      })
      .then(result => {
        setStockData(result)
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
      <Typography fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
            fontWeight="Bold"sx={{ marginTop: 5, fontSize: 40, fontWeight: "bold" }} textAlign="center" variant= "h1"  gutterBottom>
          {competition.name}
        </Typography>
     
        <Typography sx={{ marginBottom: 5, fontSize: 20}} fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
            fontWeight="medium" variant= "h2" textAlign="center" gutterBottom>
          Ticker:  <span className="stockTickName">{competition.ticker}</span>
        </Typography>

        <Card sx={{marginBottom: 2,  minWidth: 275 }}>
          <CardContent>
          <Typography sx={{ fontSize: 20}} justifyContent="center" fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                  fontWeight="medium" variant= "h2"  gutterBottom>
              Submissions Close: {competition.endDate}
            </Typography>
            <Typography sx={{ fontSize: 20}} justifyContent="center" fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                  fontWeight="medium" variant= "h2"  gutterBottom>
              Participants:  <span className="stockTickName"> {competition.competitiors}</span>
            </Typography>
            <Typography sx={{ fontSize: 20}} justifyContent="center" fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                  fontWeight="medium" variant= "h2"  gutterBottom>
              Duration: {competition.duration}            
            </Typography>
            <Typography sx={{ fontSize: 20}} justifyContent="center" fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                  fontWeight="medium" variant= "h2"  gutterBottom>
              Starting Balance: {competition.startingBalance}            
            </Typography>
          </CardContent> 
        </Card>
        <Accordion sx={{}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Typography sx={{ fontSize: 20}} justifyContent="center" fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                  fontWeight="400" variant= "h3"  gutterBottom>
              {competition.description}           
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{mb:2}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            onClick={handleExpand}
          >
            <Typography>Historical Data</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <HighChart stock={competition.ticker} stockData={data}/>
            
          </AccordionDetails>
         
        </Accordion>

      <FormControl sx={{my: 2, mr: 5, minWidth: 300}}> 
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
      <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
          <Typography fontSize="20px" fontWeight="400" variant="h5" component="div">
            <span className="dis_UserName">[User]</span> My Thread Title.... [disc.Title]
          </Typography>          
          </AccordionSummary>
          <AccordionDetails>
            <Typography fontSize="14px" fontWeight="300" variant="h5" component="div">
              I think that GME is really cool actually.... [disc.Description]
            </Typography>    
            <Button size="small" startIcon={<AddIcon/>} style={{textTransform:"none"}} sx={{mt:3}} variant="contained">
              Comment
            </Button>          
          </AccordionDetails>       
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
          <Typography fontSize="20px" fontWeight="400" variant="h5" component="div">
            <span className="dis_UserName">[User2]</span> Other Thread Title.... [disc.Title]
          </Typography>          
          </AccordionSummary>
          <AccordionDetails>
            <Typography fontSize="14px" fontWeight="300" variant="h5" component="div">
              I think that GME is really cool actually.... [disc.Description]
            </Typography>        
          </AccordionDetails>
          <AccordionDetails>
            <Typography fontSize="14px" fontWeight="300" variant="h5" component="div">
              .....<span className="dis_UserName">[User3]</span> I think that GME is bad.... [disc.comments[0]]
            </Typography>           
          </AccordionDetails>
          <AccordionDetails>
            <Typography fontSize="14px" fontWeight="300" variant="h5" component="div">
              .....<span className="dis_UserName">[User4]</span> I think that GME is the new DOGE....  [disc.comments[1]]
            </Typography>    
            <Button size="small" startIcon={<AddIcon/>} style={{textTransform:"none"}} sx={{mt:3}} variant="contained">
              Comment
            </Button>          
          </AccordionDetails>
        </Accordion>
        <Button startIcon={<AddIcon/>} style={{textTransform:"none"}} sx={{mt:3}} variant="contained">
          New Thread
        </Button>

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
