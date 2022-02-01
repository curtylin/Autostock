import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { minHeight } from '@mui/system';

function createData(
  user: string,
  competition: string,
  indicator: string,
  gain: number,
) {
  return { user, competition, indicator, gain };
}

const rows = [
  createData('Bill Gates', 'MSFT (30 days)', 'SMA', 24),
  createData('Elon Musk', 'TSLA (14 days)', 'EMA', 37),
  createData('Curtis', 'GME (14 days)', 'MAMA', 24),
  createData('Jonathan', 'AMC (7 Days)', 'KEMA', 67),
  createData('Brandon', 'NASDAQ (30 days)', 'EMA', 49),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 960 }} aria-label="simple table">
        <TableHead>
          <TableRow style={{background:"#059A76"}}>
            <TableCell style={{fontWeight:"bold"}} align="center">User</TableCell>
            <TableCell style={{fontWeight:"bold"}} align="center">Competition</TableCell>
            <TableCell style={{fontWeight:"bold"}} align="left">Indicator</TableCell>
            <TableCell style={{fontWeight:"bold"}} align="left">Gain</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.user}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {row.user}
              </TableCell>
              <TableCell align="center">{row.competition}</TableCell>
              <TableCell align="left">{row.indicator}</TableCell>
              <TableCell align="left">{row.gain}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
