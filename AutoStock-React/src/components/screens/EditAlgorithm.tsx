import React, { useState, useEffect } from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import Tooltip from "@mui/material/Tooltip"
import Layout from "../layout"
import Seo from "../seo"
import JSConfetti from "js-confetti"
import HighChart from "../highChart"
import { Grid } from "@mui/material"
import { getUser } from "../../services/auth"

const jsConfetti = new JSConfetti()
const theme = {
  spacing: 8,
}
const handleDelete = () => {
  console.info("You clicked the delete icon.")
}

const EditAlgorithm = () => {
  const [algoName, setAlgoName] = useState("")
  const [stock, setStocks] = useState("")
  const [timeInterval, setTimeInterval] = useState("")
  const [indicator1, setIndicator1] = useState("")
  const [period1, setPeriod1] = useState("")
  const [indicator2, setIndicator2] = useState("")
  const [period2, setPeriod2] = useState("")
  const [action, setAction] = useState("")
  const [runningTime, setRunningTime] = useState("")
  const [showBT, setShowBT] = useState(false)
  const show = () => setShowBT(true)

  useEffect(() => {
    console.log(timeInterval)
  })

  const loadStocks = () => {
    fetch("https://api.iextrading.com/1.0/ref-data/symbols")
      .then(res => res.json())
      .then(data => {
        setStocks(data)
      })
  }
  const handleBacktest = (event: any) => {
    let currDate = new Date()
    //create json object
    let obj = {
      symbol: stock,
      cash: 1000,
      startDate: `${
        currDate.getFullYear() - 1
      }-${currDate.getMonth()}-${currDate.getDate()}`,
      endDate: `${currDate.getFullYear()}-${currDate.getMonth()}-${currDate.getDate()}`,
    }
    const headers = new Headers()
    headers.append("content-type", "application/json")

    let body = `{
      "symbol": "${stock}",
      "cash": 1000,
      "startDate": "${
        currDate.getFullYear() - 1
      }-${currDate.getMonth()}-${currDate.getDate()}",
      "endDate": "${currDate.getFullYear()}-${currDate.getMonth()}-${currDate.getDate()}"
      }
      `

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
        alert(JSON.stringify(text))
      })
      .catch(e => {
        // error in e.message
      })
    event.preventDefault()
  }

  const [algorithm, setAlgorithm] = useState<any>([])
  useEffect(() => {
    getAlgoDB()
    console.log(algorithm)
  }, [])
  const getAlgoDB = () => {
    fetch("http://localhost:5000/get-algorithm/L3quUBqabYhZe4zfvPgu", {
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
        setAlgorithm(result)
      })
  } 

  const handleSubmit = (event: any) => {
    let body = `{
            "name": "${algoName}",
            "ticker": "${stock}",
            "indicator": "${indicator1}",
            "indicator": "${timeInterval}",
            "comparator": "${indicator2}",
            "runtime": "${runningTime}",
            "period1": "${period1}",
            "period2": "${period2}",
            "public": false,
            "userID": "${getUser().uid}",
            "action": "${action}"
            }
            `
    const headers = new Headers()
    headers.append("content-type", "application/json")
    let init = {
      method: "POST",
      headers,
      body,
    }

    fetch(`http://127.0.0.1:5000/update-algorithm/${algoID}`, init)
      .then(response => {
        return response.json() // or .text() or .blob() ...
      })
      .then(text => {
        // text is the response body
        console.log(text)
        jsConfetti.addConfetti({
          emojis: ["😂", "📈", "👌", "💦", "🍑", "💯"],
          // emojiSize: 100,
        })
        jsConfetti.addConfetti()
      })
      .catch(e => {
        // error in e.message
      })
    event.preventDefault()
  }

  const BackTestingPart = () => (
    <div>
      <h2>Backtesting Data: {algoName}</h2>
      <HighChart setChart={`${stock}`} />
    </div>
  )

  return (
    <Layout>
      <Seo title="AutoStock" />
      <h2>Edit Algorithm</h2>

      <form>
        <div>
          {/* Algorithm Name */}
          <Tooltip title="Give it a name!" placement="left" arrow>
            <TextField
              required
              value={algorithm.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setAlgoName(e.target.value)
              }}
              sx={{ my: 2, mr: 5, minWidth: 300, maxWidth: 300 }}
              id="outlined-search"
              label="Algorithm Name"
              type="text"
            />
          </Tooltip>
        </div>
        <div>
          {/* Stock Symbol */}
          <FormControl sx={{ my: 2, mr: 5, minWidth: 300, maxWidth: 300 }}>
            <Tooltip title="E.g. AAPL or TSLA" placement="left" arrow>
              <TextField
                required
                value={algorithm.ticker}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setStocks(e.target.value)
                }}
                type="search"
                id="outlined-search"
                label="Stock"
              />
            </Tooltip>
            {/* <Stack sx={{ my: 1, mr: 5 }}direction="row" spacing={1}>
            <Chip id="chp1" label="Deletable" onDelete={handleDelete} />
            <Chip label="Deletable" onDelete={handleDelete}/>
          </Stack> */}
          </FormControl>
          {/* Time Interval */}
          <FormControl sx={{ my: 2, mr: 5, minWidth: 300 }}>
            <InputLabel required id="demo-simple-select-standard-label">
              Time Interval
            </InputLabel>
            <Tooltip title="How often?" placement="right" arrow>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Time Interval"
                value={timeInterval}
                onChange={e => {
                  setTimeInterval(e.target.value)
                }}
              >
                <MenuItem value="">None</MenuItem>
                <MenuItem value={1}>1 Hour</MenuItem>
                <MenuItem value={24}>1 Day</MenuItem>
                <MenuItem value={168}>1 Week</MenuItem>
              </Select>
            </Tooltip>
          </FormControl>
        </div>
        {/* Indicator */}
        <FormControl sx={{ my: 2, mr: 5, minWidth: 200, maxWidth: 200 }}>
          <InputLabel required id="demo-simple-select-standard-label">
            Indicator 1
          </InputLabel>
          {/* <Tooltip title="Which Indicator?" placement="left" arrow> */}
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="Indicator 1"
            value={indicator1}
            onChange={e => {
              setIndicator1(e.target.value)
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>SMA - Simple Moving Average </MenuItem>
            <MenuItem value={2}>BBANDS - Bollinger Bands</MenuItem>
            <MenuItem value={3}>EMA - Exponential Moving Average</MenuItem>
            <MenuItem value={4}>
              DEMA - Double Exponential Moving Average
            </MenuItem>
            <MenuItem value={5}>
              HT_TRENDLINE - Hilbert Transform - Instantaneous Trendline
            </MenuItem>
            <MenuItem value={6}>
              KAMA - Kaufman Adaptive Moving Average
            </MenuItem>
            <MenuItem value={7}>MA - Moving average</MenuItem>
            <MenuItem value={8}>MAMA - MESA Adaptive Moving Average</MenuItem>
            <MenuItem value={9}>
              MAVP - Moving average with variable period
            </MenuItem>
            <MenuItem value={10}>MIDPOINT - MidPoint over period</MenuItem>
            <MenuItem value={11}>SAR - Parabolic SAR</MenuItem>
            <MenuItem value={12}>SAREXT - Parabolic SAR - Extended</MenuItem>
            <MenuItem value={13}>
              T3 - Triple Exponential Moving Average
            </MenuItem>
            <MenuItem value={14}>
              TEMA - Triple Exponential Moving Average
            </MenuItem>
            <MenuItem value={15}>TRIMA - Triangular Moving Average</MenuItem>
            <MenuItem value={16}>WMA - Weighted Moving Average</MenuItem>
          </Select>
          {/* </Tooltip> */}
        </FormControl>
        {/* Period 1 */}
        <FormControl required sx={{ my: 2, mr: 5, minWidth: 200 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Period 1
          </InputLabel>
          <Tooltip title="Period 1" placement="left" arrow>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Period 1"
              value={period1}
              onChange={e => {
                setPeriod1(e.target.value)
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>(close) 20</MenuItem>
            </Select>
          </Tooltip>
        </FormControl>
        {/* Indicator 2 */}
        <FormControl required sx={{ my: 2, mr: 5, minWidth: 200 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Indicator 2
          </InputLabel>
          <Tooltip title="Indicator 2" placement="left" arrow>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Indicator2"
              value={indicator2}
              onChange={e => {
                setIndicator2(e.target.value)
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={0}>Goes Above</MenuItem>
              <MenuItem value={1}>Goes Below</MenuItem>
            </Select>
          </Tooltip>
        </FormControl>
        {/* Period 2 */}
        <FormControl required sx={{ my: 2, minWidth: 200 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Period 2
          </InputLabel>
          <Tooltip title="Period 2" placement="left" arrow>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Period 2"
              value={period2}
              onChange={e => {
                setPeriod2(e.target.value)
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={0}>(close) 20</MenuItem>
            </Select>
          </Tooltip>
        </FormControl>
        <div>
          {/* Action */}
          <FormControl required sx={{ my: 2, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Action
            </InputLabel>
            <Tooltip title="Buy or Sell" placement="right" arrow>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Action"
                value={action}
                onChange={e => {
                  setAction(e.target.value)
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={0}>Buy</MenuItem>
                <MenuItem value={1}>Sell</MenuItem>
              </Select>
            </Tooltip>
          </FormControl>
        </div>
        {/* Running Time */}
        <FormControl required sx={{ my: 2, minWidth: 500 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Algorithm Running Time
          </InputLabel>
          <Tooltip title="How long will this run?" placement="right" arrow>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Algorithm Running Time"
              value={runningTime}
              onChange={e => {
                setRunningTime(e.target.value)
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>1 Day</MenuItem>
              <MenuItem value={3}>3 Days</MenuItem>
              <MenuItem value={7}>1 Week</MenuItem>
              <MenuItem value={30}>1 Month</MenuItem>
            </Select>
          </Tooltip>
        </FormControl>
        <div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ my: 2, mr: 5, minWidth: 300 }}
            onClick={handleSubmit}
          >
            Save Algorithm
          </Button>

          <Button type="submit" variant="contained" color="secondary">
            Share
          </Button>
        </div>
      </form>

      <div id="backtesting">{showBT ? <BackTestingPart /> : null}</div>

      <div id="BackTest">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={show}
        >
          BackTest
        </Button>
      </div>
    </Layout>
  )
}

export default EditAlgorithm