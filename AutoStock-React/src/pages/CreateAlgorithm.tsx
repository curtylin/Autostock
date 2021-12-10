import * as React from "react"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import Layout from "../components/layout"
import Seo from "../components/seo"
import { useEffect, useState } from "react";

const theme = {
  spacing: 8,
}
const handleDelete = () => {
  console.info("You clicked the delete icon.")
}

const CreateAlgorithm = () => {
  const [algoName, setAlgoName] = useState("")
  const [stock, setStocks] = useState("")
  const [timeInterval, setTimeInterval] = useState("")
  const [indicator, setIndicator] = useState("")
  const [period1, setPeriod1] = useState("")
  const [comparator, setComparator] = useState("")
  const [period2, setPeriod2] = useState("")
  const [action, setAction] = useState("")
  const [runningTime, setRunningTime] = useState("")

  useEffect(() => {
    console.log(timeInterval)
  })

  const handleSubmit = () => {
    //create json object
    let obj = {
      symbol: stock,
      timeInterval: timeInterval,
      indicatorOne: indicator,
    }

    //fetch post to localhost
    fetch("localhost:5000/backtest", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(obj),
    }).then(res => {
      console.log(res)
    })
  }

  return (
    <Layout>
      <Seo title="AutoStock" />
      <h2>Create Algorithm</h2>

      <form>
        <div>
          {/* Algorithm Name */}
          <Tooltip title="Give it a name!" placement="left" arrow>
            <TextField
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setAlgoName(e.target.value)
              }}
              sx={{ my: 2, mr: 5, minWidth: 300, maxWidth: 300 }}
              id="outlined-search"
              label="Algorithm Name"
              type="search"
            />
          </Tooltip>
        </div>
        <div>
          {/* Stock Symbol */}
          <FormControl sx={{ my: 2, mr: 5, minWidth: 300, maxWidth: 300 }}>
            <Tooltip title="E.g. AAPL or TSLA" placement="left" arrow>
              <TextField
                required
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
                <MenuItem value={10}>1 Hour</MenuItem>
                <MenuItem value={20}>1 Day</MenuItem>
                <MenuItem value={30}>1 Week</MenuItem>
              </Select>
            </Tooltip>
          </FormControl>
        </div>
        {/* Indicator */}
        <FormControl sx={{ my: 2, mr: 5, minWidth: 200, maxWidth: 200 }}>
          <InputLabel required id="demo-simple-select-standard-label">
            Indicator
          </InputLabel>
          <Tooltip title="Which Indicator?" placement="left" arrow>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Indicator"
              value={indicator}
              onChange={e => {
                setIndicator(e.target.value)
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Simple Moving Average (SMA)</MenuItem>
            </Select>
          </Tooltip>
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
              <MenuItem value={10}>(close) 20</MenuItem>
            </Select>
          </Tooltip>
        </FormControl>
        {/* Comparator */}
        <FormControl required sx={{ my: 2, mr: 5, minWidth: 200 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Comparator
          </InputLabel>
          <Tooltip title="Comparator" placement="left" arrow>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Comparator"
              value={comparator}
              onChange={e => {
                setComparator(e.target.value)
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Goes Above</MenuItem>
              <MenuItem value={10}>Goes Below</MenuItem>
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
              <MenuItem value={10}>(close) 20</MenuItem>
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
                <MenuItem value={10}>Buy</MenuItem>
                <MenuItem value={10}>Sell</MenuItem>
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
              <MenuItem value={10}>1 Day</MenuItem>
              <MenuItem value={10}>3 Days</MenuItem>
              <MenuItem value={10}>1 Week</MenuItem>
              <MenuItem value={10}>1 Month</MenuItem>
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
            Save and Backtest Algorithm
          </Button>

          <Button type="submit" variant="contained" color="secondary">
            Share
          </Button>
        </div>
      </form>
    </Layout>
  )
}

export default CreateAlgorithm