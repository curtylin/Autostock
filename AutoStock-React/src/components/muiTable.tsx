import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import TablePagination from "@mui/material/TablePagination"
import Button from "@mui/material/Button"
import { navigate } from "gatsby"

export default function MuiTable({ algorithm }: any) {
  const [page, setPage] = React.useState(0)
  const [rows, setRows] = React.useState(algorithm)

  React.useEffect(() => {
    setRows(algorithm)
    console.log(rows)
  }, [rows])

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage)
  }

  const handleShare = (event: any) => {
    let body = `{
        "public": true
        }
        `
    const headers = new Headers()
    headers.append("content-type", "application/json")
    let init = {
      method: "PUT",
      headers,
      body,
    }

    fetch(`http://127.0.0.1:5000/update-algorithm/${event.target.id}`, init)
      .then(response => {
        return response.json() // or .text() or .blob() ...
      })
      .catch(e => {
        // error in e.message
      })
    event.preventDefault()
  }

  const handleUnshare = (event: any) => {
    let body = `{
          "public": false
          }
          `
    const headers = new Headers()
    headers.append("content-type", "application/json")
    let init = {
      method: "PUT",
      headers,
      body,
    }
    fetch(`http://127.0.0.1:5000/update-algorithm/${event.target.id}`, init)
      .then(response => {
        return response.json() // or .text() or .blob() ...
      })
      .catch(e => {
        // error in e.message
      })
    event.preventDefault()
  }

  const handleEdit = (event: any) => {
    const algoID = event.target.id
    console.log("editing algo" + event.target.id)
  }

  // TODO NEED TO GET THE ALGO ID
  const handleDelete = (event: any) => {
    const headers = new Headers()
    headers.append("content-type", "application/json")
    let init = {
      method: "GET",
      headers,
    }
    console.log(event.target.id)

    fetch(`http://127.0.0.1:5000/delete-algorithm/${event.target.id}`, init)
      .then(response => {
        return response.json() // or .text() or .blob() ...
      })
      .catch(e => {
        // error in e.message
      })
    event.preventDefault()
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * 10 - rows.length) : 0

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 750 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Algorithm Name</TableCell>
              <TableCell align="right">Day Gain (%)</TableCell>
              <TableCell align="right">Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * 10, page * 10 + 10).map((row: any) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{"10%"}</TableCell>
                <TableCell align="right">
                  <Button
                    className="mdc-button mdc-button--raised"
                    id={row.id}
                    sx={{ m: 1 }}
                    onClick={event => {
                      navigate("/app/editalgorithm", {
                        state: { algorithm },
                      })
                    }}
                    variant="contained"
                    color="primary"
                  >
                    <span id={row.id} className="mdc-button__label">
                      Edit
                    </span>
                  </Button>

                  {row.public ? (
                    <Button
                      className="mdc-button mdc-button--raised"
                      id={row.id}
                      onClick={handleUnshare}
                    >
                      <span id={row.id} className="mdc-button__label">
                        Unshare
                      </span>
                    </Button>
                  ) : (
                    <Button
                      className="mdc-button mdc-button--raised "
                      id={row.id}
                      onClick={handleShare}
                      variant="contained"
                      color="primary"
                      sx={{ m: 1 }}
                    >
                      <span id={row.id} className="mdc-button__label">
                        Share
                      </span>
                    </Button>
                  )}
                  <Button
                    className="mdc-button mdc-button--raised"
                    id={row.id}
                    onClick={handleDelete}
                    variant="contained"
                    color="error"
                    sx={{ m: 1 }}
                  >
                    <span id={row.id} className="mdc-button__label">
                      Delete
                    </span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={rows.length}
        rowsPerPage={10}
        page={page}
        onPageChange={handleChangePage}
      />
    </Paper>
  )
}
