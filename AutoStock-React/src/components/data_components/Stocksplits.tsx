import React from 'react'
import { Table, TableCell, TableContainer, TableHead, TableRow, TableBody, Paper} from '@mui/material'
import { useEffect } from 'react'


export default function Stocksplits({stock}: any) {

  const [splits, setSplits] = React.useState([])

  useEffect(() => {
    if(stock !== '') {
      fetch(`http://localhost:5000/getStockSplits/${stock}`)
        .then(res => res.json())
        .then(result => {
          setSplits(result)
        })
      }
  },[stock])

  return (
    <div>
      <h5>Stock Splits</h5>
      <TableContainer component = {Paper}>
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
    </div>
  )
}
