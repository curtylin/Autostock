import React, { useState, useEffect } from "react"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Layout from "../layout"
import Seo from "../seo"
import "./screens.css"

import { getUser } from "../../services/auth"
import { navigate } from "gatsby"
import { Divider, Stack } from "@mui/material";


const Leaderboards = () => {
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

  return (
    <Layout>
      <Seo title="AutoStock" />
      <title>Leaderboards</title>
      <h1>Leaderboards</h1>
      <Stack direction="column" spacing={2} sx={{my: 5}}>
          
      <Card variant="outlined" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
            Competition Name
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Length
        </Typography>
        <table className="mdc-data-table__table" aria-label="my-algorithms">
            <thead>
              <tr className="mdc-data-table__header-row">
                <th
                  className="table_header"
                  role="columnheader"
                  scope="col"
                  align="center"
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
                  {" "}
                  Creator{" "}
                </th>
              </tr>
            </thead>
            <tbody className="mdc-data-table__content">
              {algorithms.map((algorithm: any, key: any) => {
                return (
                  <tr className="table_row" key={key}>
                    <td className="table_data" scope="row">
                      Hi
                    </td>
                    <td className="table_data">10</td>
                    <td className="table_data">yo</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    <Card  variant="outlined" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
            Competition Name
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Length
        </Typography>
        <table className="mdc-data-table__table" aria-label="my-algorithms">
            <thead>
              <tr className="mdc-data-table__header-row">
                <th
                  className="table_header"
                  role="columnheader"
                  scope="col"
                  align="center"
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
                  {" "}
                  Creator{" "}
                </th>
              </tr>
            </thead>
            <tbody className="mdc-data-table__content">
              {algorithms.map((algorithm: any, key: any) => {
                return (
                  <tr className="table_row" key={key}>
                    <td className="table_data" scope="row">
                      Hi
                    </td>
                    <td className="table_data">10</td>
                    <td className="table_data">yo</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </Stack>
    </Layout>
  )
}

export default Leaderboards
