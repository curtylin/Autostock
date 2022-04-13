import { string } from "prop-types"
import React, { useState, useEffect } from "react"

import Layout from "../layout"
import Seo from "../seo"
import { Link } from "gatsby"

const PublicAlgorithms = () => {
  const [algorithms, setAlgorithms] = useState([])
  const [users, setUsers] = useState(new Map<string, string>())
  useEffect(() => {
    getAlgorithmsDB()
    getUsersDB()
    console.log(users)
  }, [])

  const getAlgorithmsDB = () => {
    //fetch post to localhost
    fetch("http://localhost:5000/list-algorithm", {
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

  const getUsersDB = () => {
    //fetch post to localhost
    fetch("http://localhost:5000/list-user", {
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
        for (let i = 0; i < result.length; i++) {
          setUsers(
            prev => new Map([...prev, [result[i].userID, result[i].username]])
          )
        }
      })
  }

  return (
    <Layout>
      <Seo title="Autostock" />
      <title>Public Algorithms</title>
      <h1>Public Algorithms</h1>
      <div className="mdc-data-table">
        <div className="mdc-data-table__table-container">
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
                <th className="table_header" role="columnheader" scope="col">
                  Day Gain (%)
                </th>
                <th className="table_header" role="columnheader" scope="col">
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
                      <Link
                        className="table_links"
                        to="/app/algorithm"
                        state={algorithm}
                      >
                        {algorithm.name}
                      </Link>
                    </td>
                    <td className="table_data">
                      {(algorithm.PnLPercent == undefined || algorithm.PnLPercent == 0) ? "--" : Number(algorithm.PnLPercent.toFixed(5)) + "%"}
                    </td>
                    <td className="table_data">
                      {users.has(algorithm.userID)
                        ? users.get(algorithm.userID)
                        : algorithm.userID}
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

export default PublicAlgorithms
