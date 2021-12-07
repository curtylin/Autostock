import * as React from "react"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormGroup } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import Layout from "../components/layout"
import Seo from "../components/seo"
const theme = {
  spacing: 8,
}

const CreateAlgorithm = () => (
  <Layout>
    <Seo title="AutoStock" />
    <h2>Create Algorithm</h2>

    <form>
    <div className="form-check">
      <TextField sx={{ mr: 2 }} id="outlined-search" label="Algorithm Name" type="search" />
      <TextField id="outlined-search" label="Ticker Symbol" type="search" />
    </div>
    <FormControl  sx={{ mt:1, mr: 2, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-standard-label">Time Interval</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="Time Interval"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>1 Hour</MenuItem>
          <MenuItem value={20}>1 Day</MenuItem>
          <MenuItem value={30}>1 Week</MenuItem>
        </Select>
        
      </FormControl>
      <FormControl  sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-standard-label">Indicator</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="Indicator"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Simple Moving Average (SMA)</MenuItem>
        </Select> 
      </FormControl>
    
      <div className="form-check">
        <label>Period 1 </label>
        <select className="form-control">
          <option>(close) 20</option>
        </select>
      </div>
      <div className="form-check">
        <label>Comparator </label>
        <select className="form-control">
          <option>Goes Above</option>
          <option>Goes Below</option>
        </select>
      </div>
      <div className="form-check">
        <label>Period 2 </label>
        <select className="form-control">
          <option>(close) 50</option>
        </select>
      </div>
      <div className="form-check">
        <label>Action </label>
        <select className="form-control">
          <option>Buy</option>
          <option>Sell</option>
        </select>
      </div>
      <div className="form-check">
        <label>Algorithm Running Time </label>
        <select className="form-control">
          <option>14 Days (a fortnite)</option>
        </select>
      </div>
      
      <button type="submit" className="btn btn-primary" >Save and Backtest Algorithm</button>
      <button type="submit" className="btn btn-primary">Share</button>

    </form>

  </Layout>
)

export default CreateAlgorithm