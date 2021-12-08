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

const theme = {
  spacing: 8,
}
const handleDelete = () => {
  console.info('You clicked the delete icon.');
}



const CreateAlgorithm = () => (
  <Layout>
    <Seo title="AutoStock" />
    <h2>Create Algorithm</h2>
    
    <form>
      <div>
        {/* Algorithm Name */}
        <Tooltip title="Give it a name!" placement="left" arrow>       
          <TextField required sx={{ my: 2, mr: 5, minWidth: 300, maxWidth: 300}} id="outlined-search" label="Algorithm Name" type="search" />
        </Tooltip>
      </div>
      <div>
        {/* Stock Symbol */}
        <FormControl  sx={{ my: 2, mr: 5, minWidth: 300, maxWidth: 300 }}>
          <Tooltip title="E.g. AAPL or TSLA" placement="left" arrow>       
            <TextField required type="search" id="outlined-search" label="Stock" />
          </Tooltip>
          {/* <Stack sx={{ my: 1, mr: 5 }}direction="row" spacing={1}>
            <Chip id="chp1" label="Deletable" onDelete={handleDelete} />
            <Chip label="Deletable" onDelete={handleDelete}/>
          </Stack> */}
        </FormControl>
        {/* Time Interval */}
        <FormControl  sx={{ my: 2, mr: 5, minWidth: 300 }}>
            <InputLabel required id="demo-simple-select-standard-label">Time Interval</InputLabel>
            <Tooltip title="How often?" placement="right" arrow>    
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
            </Tooltip>
        </FormControl>
      </div>
        {/* Indicator */}
        <FormControl  sx={{ my: 2, mr: 5, minWidth: 200, maxWidth:200 }}>
          <InputLabel required id="demo-simple-select-standard-label">Indicator</InputLabel>
          <Tooltip title="Which Indicator?" placement="left" arrow> 
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
          </Tooltip>       
        </FormControl>
        {/* Period 1 */}
        <FormControl required sx={{ my: 2, mr: 5, minWidth: 200 }}>
          <InputLabel id="demo-simple-select-standard-label">Period 1</InputLabel>
          <Tooltip title="Period 1" placement="left" arrow> 
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Period 1"
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
          <InputLabel id="demo-simple-select-standard-label">Comparator</InputLabel>
          <Tooltip title="Comparator" placement="left" arrow> 
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Comparator"
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
          <InputLabel id="demo-simple-select-standard-label">Period 2</InputLabel>
          <Tooltip title="Period 2" placement="left" arrow> 
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Period 2"
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
          <InputLabel id="demo-simple-select-standard-label">Action</InputLabel>
          <Tooltip title="Buy or Sell" placement="right" arrow> 
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              label="Action"
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
              <InputLabel id="demo-simple-select-standard-label">Algorithm Running Time</InputLabel>
              <Tooltip title="How long will this run?" placement="right" arrow> 
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="Algorithm Running Time"
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

        <Button type="submit" variant="contained" color="primary" sx={{ my: 2, mr:5, minWidth: 300 }}>Save</Button>

        <Button type="submit" variant="contained" color="secondary">Share</Button>
        </div>
      </form>

    <div id="container" className="chart"></div>

  </Layout>
)

export default CreateAlgorithm