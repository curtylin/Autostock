import { Table, TableCell, TableContainer, TableHead, TableRow, TableBody, Paper} from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { CircularProgress } from '@mui/material'


export default function Sustainability({stock}: any) {

  const [sustainability, setSustainability] = React.useState([])


  useEffect(() => {
    setSustainability([])
    if(stock !== '') {
      fetch(`/api/getSustainability/${stock}`)
        .then(res => res.json())
        .then(result => {
          setSustainability(result)
        })
      }
  },[stock])
  


  return (
    <div>
      <h5>Sustainability</h5>
      {sustainability.length > 0 ? 
      <TableContainer component = {Paper} sx={{maxHeight: 500}}>
        <Table aria-label="simple table">

          <TableHead>
            <TableRow>
              <TableCell>Sustainability</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sustainability.map((sustainability: any) => (
              <TableRow key={sustainability.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>{sustainability.name}</TableCell>
                <TableCell>{sustainability.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
      : <CircularProgress sx={{ mt: 1 }} color="inherit" /> }
    </div>
  )
}
