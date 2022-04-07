import React, { useState, useEffect } from "react"
import Button from "@mui/material/Button"

import Layout from "../layout"
import Seo from "../seo"

import { getUser } from "../../services/auth"
import { navigate } from "gatsby"
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';


const MyAlgorithm = () => {
  const [open, setOpen] = React.useState(false);
  const [openUnshared, setOpenUnshared] = React.useState(false);

  const openMsg = () => setOpen(true)
  const openMsgUnshared = () => setOpenUnshared(true)
  
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

    fetch(`http://127.0.0.1:5000/update-algorithm/${event.target.id}`, init)
      .then(response => {
        return response.json() // or .text() or .blob() ...
      })
      .catch(e => {
        // error in e.message
      })
    event.preventDefault()
    window.location.reload()
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
      fetch(`http://127.0.0.1:5000/update-algorithm/${event.target.id}`, init)
        .then(response => {
          return response.json() // or .text() or .blob() ...
        })
        .catch(e => {
          // error in e.message
        })
      event.preventDefault()
      window.location.reload()
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
    window.location.reload()
  }

  const [algorithms, setAlgorithms] = useState([])
  useEffect(() => {
    getAlgorithmsDB()
    console.log(algorithms)
  }, [])
  const getAlgorithmsDB = () => {
    //fetch post to localhost
    fetch(`http://localhost:5000/list-algorithm/${getUser().uid}` , {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then(res => {
        return res.json()
      })
      .then(result => {
        setAlgorithms(result)
      })
  }

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setOpenUnshared(false);
  };
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
  );

  return (
    <Layout>
      <Seo title="Autostock" />
      <title>My Algorithms</title>
      <h1>My Algorithms</h1>
      <div className="mdc-data-table">
        <div className="mdc-data-table__table-container">
          <table className="mdc-data-table__table" aria-label="my-algorithms">
            <thead>
              <tr className="mdc-data-table__header-row">
                <th
                  className="table_header"
                  role="columnheader"
                  scope="col"
                >
                  Algorithm Name
                </th>
                <th
                  className="table_header"
                  role="columnheader"
                  scope="col"
                >
                  Day Gain (%)
                </th>

                <th
                  className="table_header"
                  role="columnheader"
                  scope="col"
                >
                  <Button color="primary" variant="contained" className="mdc-button mdc-button--raised"
                        onClick={event => {navigate('/app/createalgorithm')}}
                        startIcon={<AddIcon />}>
                         <span className="mdc-button__label">Algorithm</span> 
                      </Button> 
                </th>
              </tr>
            </thead>
            <tbody className="mdc-data-table__content">
              {algorithms.map((algorithm: any, key: any) => {
                let sharingButton;
                if (algorithm.public){
                  sharingButton = <Button className="mdc-button mdc-button--raised" id={algorithm.id} onClick={handleUnshare}>
                  <span id={algorithm.id} className="mdc-button__label">Unshare</span>
                </Button>
                } else {
                  sharingButton = <Button className="mdc-button mdc-button--raised" id={algorithm.id} onClick={handleShare}>
                  <span id={algorithm.id} className="mdc-button__label">Share</span>
                  </Button>
                }
                return (
                  <tr className="table_row" key={key}>
                    <td className="table_data" scope="row">
                      {algorithm.name}
                    </td>
                    <td className="table_data">
                      {algorithm.PnL == undefined ? "--" : algorithm.PnL+"%"}
                    </td>
                    <td className="table_data">
                      <Button className="mdc-button mdc-button--raised"
                        id={algorithm.id}
                        onClick={event => {navigate('/app/editalgorithm', 
                        {
                          state: {algorithm},
                        }
                          )
                          }}>
                        <span id={algorithm.id} className="mdc-button__label">Edit</span> 
                      </Button>
                      {sharingButton}
                      <Button
                        className="mdc-button mdc-button--raised"
                        id={algorithm.id}
                        onClick={handleDelete}
                      >
                        <span id={algorithm.id} className="mdc-button__label">Delete</span>
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
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

    </Layout>
  )
}

export default MyAlgorithm
