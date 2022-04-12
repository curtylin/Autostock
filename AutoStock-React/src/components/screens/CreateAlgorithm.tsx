import React, { useState, useEffect } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Divider from "@mui/material/Divider"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import Tooltip from "@mui/material/Tooltip"
import Layout from "../layout"
import Seo from "../seo"
import JSConfetti from "js-confetti"
import HighChart from "../highChart"
import {
  Grid,
  CircularProgress,
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
} from "@mui/material"
import { getUser } from "../../services/auth"
import AddIcon from "@mui/icons-material/Add"
import { Link, navigate } from "gatsby"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import Entries from "./../entries"

let jsConfetti: any

const theme = {
  spacing: 8,
}
const handleDelete = () => {
  console.info("You clicked the delete icon.")
}

const CreateAlgorithm = () => {
  var currDate = new Date()
  var yesterday = new Date()
  yesterday.setDate(currDate.getDate() - 1)
  var currentMonth = ""
  if (currDate.getMonth() < 10) {
    currentMonth = "0" + (currDate.getMonth()+ 1)
  } else {
    currentMonth = "" + (currDate.getMonth()+ 1)
  }
  var currentDate = ""
  if ((currDate.getDate()) < 10) {
    currentDate = "0" + (currDate.getDate())
  } else {
    currentDate = "" + (currDate.getDate())
  }
  var yesterdaysDay = ""
  if ((yesterday.getDate()) < 10) {
    yesterdaysDay = "0" + (yesterday.getDate())
  } else {
    yesterdaysDay = "" + (yesterday.getDate())
  }
  const [algoName, setAlgoName] = useState("")
  const [stock, setStocks] = useState("")
  const [indicator1, setIndicator1] = useState("NONE")
  const [comparator1, setComparator1] = useState("above")
  const [indicator2, setIndicator2] = useState("NONE")
  const [action, setAction] = useState("buy")
  const [runningTime, setRunningTime] = useState("")
  const [showBT, setShowBT] = useState(false)
  const show = () => setShowBT(true)
  const [data, setStockData] = useState([])
  const [showSpinner, setShowSpinner] = useState(false)
  const showSpin = () => setShowSpinner(true)
  const noShowSpin = () => setShowSpinner(false)
  const [BTresults, setBTresults] = useState("")
  const [BTendRes, setBTendRes] = useState("")
  const [BTPnLPer, setBTPnLPer] = useState("")
  const [BTPnLNu, setBTPnLNum] = useState("")
  const [BTstart, setBTstart] = useState("")
  const [newAlgoDescription, setAlgoDescription] = useState("")
  const [startDate, setStartDate] = useState(`${currDate.getFullYear() - 1}-${currentMonth}-${currentDate}`)
  const [endDate, setEndDate] = useState(`${currDate.getFullYear()}-${currentMonth}-${currentDate}`)
  const [todaysDate] = useState(`${currDate.getFullYear()}-${currentMonth}-${currentDate}`)
  const [yesterdaysDate] = useState(`${currDate.getFullYear()}-${currentMonth}-${yesterdaysDay}`)
  const [startingAmount, setStartingAmount] = useState(1000)
  const [validTicker, setValidTicker] = useState(true)

  const [entryList, setEntryList] = useState([])

  useEffect(() => {
    jsConfetti = new JSConfetti()
  })

  const updateEntries = (e:any) => {
    setIndicator1(e.indicator1)
    setComparator1(e.comparator1)
    setIndicator2(e.indicator2)
    setAction(e.action)
  }

  const onAddBtnClick = (event:any) => {
    // setEntryList(entryList.concat(<Entries key = {entryList.length}/>))
  }
  const loadStocks = () => {
    fetch("https://api.iextrading.com/1.0/ref-data/symbols")
      .then(res => res.json())
      .then(data => {
        setStocks(data)
      })
  }

  const handleExpand = (event: any) => {
    let today = new Date().toISOString().slice(0, 10)
    const d = new Date()
    d.setFullYear(d.getFullYear() - 1)

    let lastYear = d.toISOString().slice(0, 10)

    let body = `{
      "ticker": "${stock}",
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

  const handleBlur = () => {
    const headers = new Headers()
    headers.append("content-type", "application/json")
    let today = new Date().toISOString().slice(0, 10)
    const d = new Date()
    d.setFullYear(d.getFullYear() - 1)

    let lastYear = d.toISOString().slice(0, 10)

    let body = `{
      "ticker": "${stock}",
      "startDate": "${lastYear}",
      "endDate": "${today.toString()}"
    }`
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
        if (result.length > 0) {
          setValidTicker(true)
          setStockData(result)
        } else {
          setValidTicker(false)
        }
      })
      .catch(e => {
        // error in e.message
      })
  }

  const [urls, setUrl] = useState("")

  const handleBacktest = (event: any) => {
    show()
    showSpin()
    const headers = new Headers()
    headers.append("content-type", "application/json")

    let entry = `{
      "action": "${action}",
      "indicatorOne": "${indicator1}",
      "comparator": "${comparator1}",
      "indicatorTwo": "${indicator2}"
    }`

    let body = `{
      "name": "${algoName}",
      "ticker": "${stock}",
      "cash": ${startingAmount},
      "startDate": "${startDate}",
      "endDate": "${endDate}",
      "runtime": "${runningTime}",
      "entry": [
        ${entry}
      ]
    }`

    let init = {
      method: "POST",
      headers,
      body,
    }

    fetch("http://127.0.0.1:5000/backtest", init)
      .then(response => {
        return response.json() // or .text() or .blob() ...
      })
      .then(text => {
        // text is the response body
        console.log(text)

        // alert(JSON.stringify(text))
        setBTresults(JSON.stringify(text))
        setBTendRes(text.EndingValue)
        setBTPnLNum(text.PnL)
        setBTPnLPer(text.PnLPercent)
        setBTstart(text.startingValue)

        setUrl(text.url)
        noShowSpin()
      })
      .catch(e => {
        // error in e.message
      })
    event.preventDefault()
  }

  const handleSubmit = (event: any) => {
    let entry = `{
        "action": "${action}",
        "indicatorOne": "${indicator1}",
        "comparator": "${comparator1}",
        "indicatorTwo": "${indicator2}"
      }`

    let body = `{
      "name": "${algoName}",
      "ticker": "${stock}",
      "runtime": "${runningTime}",
      "PnL": 0.0,
      "public": false,
      "userID": "${getUser().uid}",
      "description": "${newAlgoDescription}",
      "entry": [
        ${entry}
      ]
    }`
    const headers = new Headers()
    headers.append("content-type", "application/json")
    let init = {
      method: "POST",
      headers,
      body,
    }

    fetch("http://127.0.0.1:5000/create-algorithm", init)
      .then(response => {
        return response.json() // or .text() or .blob() ...
      })
      .then(text => {
        // text is the response body
        console.log(text)
        jsConfetti.addConfetti({
          emojis: ["💰", "🚀", "📈", "💸", "💵"],
          // emojiSize: 100,
        })
        jsConfetti.addConfetti()
      })
      .catch(e => {
        // error in e.message
      })
    event.preventDefault()
    navigate("/app/myalgorithms")
  }

  const BackTestingPart = () => (
    <div>
      <h2>Backtesting Data: {algoName}</h2>
      <Card variant="outlined" sx={{ minWidth: 275, mb: 5 }}>
        <CardContent>
          <Typography variant="h4" component="div" sx={{ mb: 1.5 }}>
            {stock}
          </Typography>
          <Typography variant="h5">Ending Value: ${BTendRes}</Typography>
          <Typography variant="h6">
            PnL Percentage: {BTPnLPer.toString().substring(0, 4)}%
          </Typography>
          <Typography variant="h6">Started with: ${BTstart}</Typography>
        </CardContent>
      </Card>
      <img src={`${urls}`}></img>
    </div>
  )

  return (
    <Layout>
      <Seo title="Autostock" />
      <h1>Create Algorithm</h1>
      <Typography
        sx={{ fontSize: 20, mb: 2 }}
        justifyContent="center"
        fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
        fontWeight="400"
        variant="h2"
        gutterBottom
      >
        Need help? See our <Link to="/app/quickstartcreatealgo">guide</Link> to
        create an algorithm!
      </Typography>
      <form>
        <h4>Algorithm Details</h4>
        <div>
          {/* Algorithm Name */}
          <Tooltip title="Give it a name!" placement="left" arrow>
            <TextField
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setAlgoName(e.target.value)
              }}
              sx={{
                mt: 2,
                mr: 5,
                minWidth: { xs: 300, md: 703 },
                maxWidth: 300,
              }}
              id="outlined-search"
              label="Algorithm Name "
              type="text"
              inputProps={{ maxLength: 100 }}
            />
          </Tooltip>
          {/* Stock Symbol */}
          <FormControl sx={{ my: 2, minWidth: 300, maxWidth: 300 }}>
            <Tooltip title="E.g. AAPL or TSLA" placement="left" arrow>
              <TextField
                onBlur={handleBlur}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setStocks(e.target.value)
                }}
                type="search"
                id="outlined-search"
                label="Stock "
                sx={{ input: { color: validTicker ? 'black' : 'red' } }}
                inputProps={{ maxLength: 9 }}
              />
            </Tooltip>
            <Typography
              variant="caption"
              color="red"
            >
              {validTicker ? null : "INVALID TICKER"}
            </Typography>
          </FormControl>
        </div>
        <div>
          <TextField
            inputProps={{ maxLength: 1000 }}
            value={newAlgoDescription}
            multiline
            rows={3}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setAlgoDescription(e.target.value)
            }}
            sx={{ mb: 0 }}
            label="Algorithm description"
            fullWidth
          ></TextField>
        </div>

        <div>
          <Divider sx={{ my: 2, mb: 2 }} />
        </div>

        <h4>Indicators</h4>
        <Entries updateEntries={updateEntries}/>
          <Typography>
            {indicator1} {comparator1} {indicator2}{action}
          </Typography>

        <div>
          <div>
            {/* <Button onClick sx={{ borderRadius: 1000 }}>
              <AddIcon /> Add Condition
            </Button> */}
            <Button onClick = {onAddBtnClick}> Add Condition</Button> 
          </div>
        </div>
        <div>
          <Divider sx={{ my: 2, mb: 2 }} />
        </div>        
        <div>
          <Button
            disabled={!algoName || !stock}
            type="submit"
            variant="contained"
            color="primary"
            sx={{ my: 2, mr: 5, minWidth: 300 }}
            onClick={handleSubmit}
          >
            Save Algorithm
          </Button>

          <Typography
            color="red"
            hidden={algoName != "" && stock != ""}
            fontSize={16}
          >
            Please fill out an Algorithm Name and Stock Ticker before Saving
          </Typography>
        </div>
      </form>

      <div>
        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            onClick={handleExpand}
          >
            <Typography>Historical Data</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <HighChart stock={stock} stockData={data} />
          </AccordionDetails>
        </Accordion>
      </div>
      <Divider sx={{ mt: 5, mb:2 }} />
      <h4>Backtesting</h4>

      <Stack direction="row" sx={{mb: 3}}>
        <Typography
          sx={{mr: 1, pt:1}}
        >
          Start Date:
        </Typography>
        <Box sx={{mr: 10}}>
          <input type="date" id="start" name="startDate" value={startDate} onChange={e => {setStartDate(e.target.value)}} max={yesterdaysDate}></input>
        </Box>
        <Typography
          sx={{mr: 1, pt:1}}
        >
          End Date:
        </Typography>   

        <input type="date" id="end" name="endDate" value={endDate} onChange={e => {setEndDate(e.target.value)}} max={todaysDate}></input>
      </Stack>
      <FormControl sx={{ m: 1 }}>
          <TextField
            id="outlined-search"
            label="Starting Amount"
            value={startingAmount}
            inputProps={{ maxLength: 7 }}
            onChange={e => {setStartingAmount(parseInt(e.target.value))}}
            >
          </TextField>
      </FormControl>
            
      <div id="BackTestButton">
        <Button
          disabled={!stock}
          type="submit"
          variant="contained"
          sx={{ my: 2, mr: 5, minWidth: 300 }}
          onClick={handleBacktest}
        >
          BackTest
        </Button>
        <Typography color="red" hidden={stock != ""} fontSize={16}>
          Please fill out a Stock Ticker before BackTesting
        </Typography>
        {showSpinner ? <CircularProgress sx={{mt:1}} color="inherit" /> : null}
      </div>
      <div id="backtesting">{showBT ? <BackTestingPart /> : null}</div>
    </Layout>
  )
}

export default CreateAlgorithm
