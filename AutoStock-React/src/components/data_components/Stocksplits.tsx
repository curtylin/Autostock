import React from 'react'
import { Table, TableCell, TableContainer, TableHead, TableRow, TableBody, Paper} from '@mui/material'
import { useEffect } from 'react'
import { CircularProgress } from '@mui/material'


export default function Stocksplits({stock}: any) {

  const [splits, setSplits] = React.useState([])

  useEffect(() => {
    setSplits([])
    if(stock !== '') {
      fetch(`/api/getStockSplits/${stock}`)
        .then(res => res.json())
        .then(result => {
          setSplits(result)
        })
      }
  },[stock])

  return (
    <div>
      <h5>Stock Splits</h5>
      {splits.length > 0 ? 
      <TableContainer component = {Paper} sx={{maxHeight: 500}}>
        <Table aria-label="simple table">

          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Split Ratio</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {splits.map((splits: any) => (
              <TableRow key={splits.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>{splits.name}</TableCell>
                <TableCell>{splits.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
      : <CircularProgress sx={{ mt: 1 }} color="inherit" /> }
    </div>
  )
}
