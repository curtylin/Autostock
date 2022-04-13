import React, { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Layout from "../layout"
import Seo from "../seo"
import "./screens.css"

import { getUser } from "../../services/auth"
import { Link, navigate } from "gatsby"
import { Divider, Stack } from "@mui/material"

const Leaderboards = () => {
  const [competitions, setCompetitions] = useState([])
  const [algorithms, setAlgorithms] = useState(new Map<string, string>())
  const [users, setUsers] = useState(new Map<string, string>())

  useEffect(() => {
    getAlgorithmsDB()
    getUsersDB()
    console.log(algorithms)
    fetch("http://34.106.176.23:5000//list-ongoing-competitions")
      .then(res => {
        return res.json()
      })
      .then(result => {
        setCompetitions(result)
      })
  }, [])
  const getAlgorithmsDB = () => {
    //fetch post to 34.106.176.23
    fetch("http://34.106.176.23:5000/list-algorithm", {
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
          setAlgorithms(
            prev => new Map([...prev, [result[i].id, result[i].name]])
          )
        }
      })
  }
  const getUsersDB = () => {
    //fetch post to 34.106.176.23
    fetch("http://34.106.176.23:5000/list-user", {
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
      <title>Leaderboards</title>
      <h1>Leaderboards</h1>
      <Stack direction="column" spacing={2} sx={{ my: 5 }}>
        {competitions.slice(0, 6).map((comp: any, index: number) => {
          let cardProps = {
            compLength: comp.duration,
            compTicker: comp.name,
            compStartingVal: `Starting Balance: ${comp.startingBalance}`,
            compDeadline: comp.closeDate,
            description: comp.description,
            leader: comp.leaderboard,
            id: comp.id,
          }
          return (
            <Stack key={index} direction="column" spacing={2}>
              <Card key={index} variant="outlined" sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {comp.name}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Competition Length: {comp.duration}
                  </Typography>
                  <table
                    className="mdc-data-table__table"
                    aria-label="my-algorithms"
                  >
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
                          Profit
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
                      {comp.leaderboard.map((algorithm: any, key: any) => {
                        return (
                          <tr className="table_row" key={key}>
                            <td className="table_data" scope="row">
                              {algorithms.has(algorithm.algorithm) ? (
                                <Link
                                  to="/app/algorithm"
                                  state={{
                                    id: algorithm.algorithm,
                                    userID: algorithm.userID,
                                  }}
                                >
                                  {algorithms.get(algorithm.algorithm)}
                                </Link>
                              ) : (
                                "Private Algorithm"
                              )}
                            </td>
                            <td className="table_data">
                              {Number(algorithm.PnLPercent).toFixed(5)}%
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
                </CardContent>
                <CardActions>
                  <Button
                    className="mdc-button mdc-button--raised"
                    id={comp.id}
                    onClick={event => {
                      navigate(`/app/competition`, {
                        state: comp,
                      })
                    }}
                  >
                    {" "}
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Stack>
          )
        })}
      </Stack>
    </Layout>
  )
}

export default Leaderboards
