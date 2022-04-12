import { Tooltip, TextField, FormControl, Typography } from "@mui/material"
import React, { useState } from "react"


const AlgoDetails = ({
    updateAlgoDetails
}: any) => {
    const [data, setData] = useState({algoName: "", stock: "", algoDescription: ""})

    const handleBlur = (e:any) => {
      updateAlgoDetails(data)
    }
    
    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }))
    };
    return (
<form>
<h4>Algorithm Details</h4>
<div>
  {/* Algorithm Name */}
  <Tooltip title="Give it a name!" placement="left" arrow>
    <TextField
      required
      onChange={handleChange}
      onBlur={handleBlur}
      value={algoName}
      name="algoName"
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
        // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        //   setStocks(e.target.value)
        // }}
        onChange={handleChange}
        value={data.stock}
        name="stock"
        type="search"
        id="outlined-search"
        label="Stock "
        // sx={{ input: { color: validTicker ? 'black' : 'red' } }}
        inputProps={{ maxLength: 9 }}
      />
    </Tooltip>
    <Typography
      variant="caption"
      color="red"
    >
      {/* {validTicker ? null : "INVALID TICKER"} */}
    </Typography>
  </FormControl>
</div>
<div>
  <TextField
    inputProps={{ maxLength: 1000 }}
    multiline
    rows={3}
    onChange={handleChange}
    value={data.algoDescription}
    name="algoDescription"
    onBlur={handleBlur}
    sx={{ mb: 0 }}
    label="Algorithm description"
    fullWidth
  ></TextField>
</div>
</form>
    )
}
export default AlgoDetails
function algoName(algoName: any, arg1: string, stock: any, arg3: string, algoDescription: any, arg5: string): [any, any] {
    throw new Error("Function not implemented.")
}

function stock(algoName: any, arg1: string, stock: any, arg3: string, algoDescription: any, arg5: string): [any, any] {
    throw new Error("Function not implemented.")
}

function algoDescription(algoName: any, arg1: string, stock: any, arg3: string, algoDescription: any, arg5: string): [any, any] {
    throw new Error("Function not implemented.")
}

