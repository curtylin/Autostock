import React, { useState, useEffect } from "react"
import Button from "@mui/material/Button"

import Layout from "../layout"
import Seo from "../seo"

import { getUser } from "../../services/auth"
import { navigate } from "gatsby"


const MyAlgorithm = () => {
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
    navigate('app/editalgorithm', {replace: true})
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
      <title>My Algorithms</title>
      <h1>My Algorithms</h1>
      <div className="mdc-data-table">
        <div className="mdc-data-table__table-container">
          <table className="mdc-data-table__table" aria-label="my-algorithms">
            <thead>
              <tr className="mdc-data-table__header-row">
                <th
                  className="mdc-data-table__header-cell"
                  role="columnheader"
                  scope="col"
                >
                  Algorithm Name
                </th>
                <th
                  className="mdc-data-table__header-cell mdc-data-table__header-cell--numeric"
                  role="columnheader"
                  scope="col"
                >
                  Day Gain (%)
                </th>
                <th
                  className="mdc-data-table__header-cell mdc-data-table__header-cell--numeric"
                  role="columnheader"
                  scope="col"
                >
                  {" "}
                </th>
                <th
                  className="mdc-data-table__header-cell"
                  role="columnheader"
                  scope="col"
                >
                  {" "}
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
                  <tr className="mdc-data-table__row" key={key}>
                    <td className="mdc-data-table__cell" scope="row">
                      {algorithm.name}
                    </td>
                    <td className="mdc-data-table__cell mdc-data-table__cell--numeric">
                      10%
                    </td>
                    <td className="mdc-data-table__cell">
                      <Button className="mdc-button mdc-button--raised"
                        id={algorithm.id}
                        onClick={handleEdit}>
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
    </Layout>
  )
}

export default MyAlgorithm
