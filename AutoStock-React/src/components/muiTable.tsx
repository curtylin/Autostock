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
import Snackbar from "@mui/material/Snackbar"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import AddIcon from "@mui/icons-material/Add"
import { Link } from "gatsby"

const MuiTable = ({ algorithm, myAlg, users }: any) => {
  const [page, setPage] = React.useState(0)
  const [rows, setRows] = React.useState(algorithm)
  const [open, setOpen] = React.useState(false)
  const [openUnshared, setOpenUnshared] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const openMsg = () => setOpen(true)
  const openMsgUnshared = () => setOpenUnshared(true)

  React.useEffect(() => {
    setRows(algorithm)
  }, [algorithm])

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleShare = (event: any) => {
    let body = `{
        "public": true
        }
        `
    const headers = new Headers()
    openMsg()
    headers.append("content-type", "application/json")
    let init = {
      method: "PUT",
      headers,
      body,
    }

    fetch(`http://localhost:5000/update-algorithm/${event.target.id}`, init)
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          event.preventDefault()
          window.location.reload() // or .text() or .blob() ...
          return response.json()
        } // or .text() or .blob() ...
      })
      .catch(e => {
        // error in e.message
      })
    event.preventDefault()
    //window.location.reload()
  }

  const handleUnshare = (event: any) => {
    let body = `{
          "public": false
          }
          `
    const headers = new Headers()
    openMsgUnshared()
    headers.append("content-type", "application/json")
    let init = {
      method: "PUT",
      headers,
      body,
    }
    fetch(`http://localhost:5000/update-algorithm/${event.target.id}`, init)
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          event.preventDefault()
          window.location.reload() // or .text() or .blob() ...
          return response.json()
        }
      })
      .catch(e => {
        // error in e.message
      })
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

    fetch(`http://localhost:5000/delete-algorithm/${event.target.id}`, init)
      .then(response => {
        window.location.reload() // or .text() or .blob() ...
        event.preventDefault()
        return response.json()
      })
      .catch(e => {
        // error in e.message
      })
    event.preventDefault()
  }

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }

    setOpen(false)
    setOpenUnshared(false)
  }
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  )

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  return (
    <Paper
      sx={{
        width: "100%",
        mb: 2,
        display: "flex",
        marginTop: "25px",
        overflowX: "hide",
      }}
    >
      <TableContainer component={Paper}>
        <Table
          style={{ tableLayout: "fixed", minWidth: 340 }}
          sx={{ minWidth: 650 }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell
                align="left"
                style={{ paddingRight: 4, paddingLeft: 5 }}
              >
                <text style={{ fontWeight: "bold", fontSize: "20px" }}>
                  Algorithm Name
                </text>
              </TableCell>
              <TableCell
                align="left"
                style={{ paddingRight: 4, paddingLeft: 5 }}
              >
                <text style={{ fontWeight: "bold", fontSize: "20px" }}>
                  Day Gain (%)
                </text>
              </TableCell>
              {myAlg ? (
                <TableCell
                  align="left"
                  style={{ paddingRight: 4, paddingLeft: 5 }}
                >
                  <text style={{ fontWeight: "bold", fontSize: "20px" }}>
                    Options
                  </text>
                </TableCell>
              ) : (
                <TableCell
                  align="left"
                  style={{ paddingRight: 4, paddingLeft: 5 }}
                >
                  <text style={{ fontWeight: "bold", fontSize: "20px" }}>
                    Creator
                  </text>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => (
                <TableRow key={row.name} hover={true}>
                  {myAlg ? (
                    <TableCell
                      align="left"
                      width="50%"
                      style={{ paddingRight: 4, paddingLeft: 5 }}
                    >
                      {row.name}
                    </TableCell>
                  ) : (
                    <TableCell
                      align="left"
                      width="50%"
                      style={{ paddingRight: 4, paddingLeft: 5 }}
                    >
                      <Link
                        className="table_links"
                        to="/app/algorithm"
                        state={row}
                      >
                        {row.name}
                      </Link>
                    </TableCell>
                  )}

                  <TableCell
                    align="left"
                    style={{ paddingRight: 4, paddingLeft: 5 }}
                  >
                    {row.PnLPercent == undefined ? "--" : row.PnLPercent + "%"}
                  </TableCell>

                  {myAlg ? (
                    <TableCell
                      align="left"
                      style={{ paddingRight: 4, paddingLeft: 5 }}
                    >
                      <Button
                        size="small"
                        className="mdc-button mdc-button--raised"
                        id={row.id}
                        sx={{ m: 1 }}
                        onClick={event => {
                          navigate("/app/editalgorithm", {
                            state: { algorithm: row },
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
                          size="small"
                          className="mdc-button mdc-button--raised"
                          id={row.id}
                          variant="contained"
                          color="secondary"
                          onClick={handleUnshare}
                        >
                          <span id={row.id} className="mdc-button__label">
                            Unshare
                          </span>
                        </Button>
                      ) : (
                        <Button
                          size="small"
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
                        size="small"
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
                  ) : (
                    <TableCell
                      align="left"
                      style={{ paddingRight: 4, paddingLeft: 5 }}
                    >
                      {users.has(row.userID)
                        ? users.get(row.userID)
                        : row.userID}
                    </TableCell>
                  )}
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Shared your algorithm!"
        action={action}
      />
      <Snackbar
        open={openUnshared}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Unshared your algorithm!"
        action={action}
      />
    </Paper>
  )
}

export default MuiTable
