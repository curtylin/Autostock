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

    const [competitions, setCompetitions] = useState([])
  
    useEffect(() => {
      fetch("http://localhost:5000/list-competitions")
        .then(res => {
          return res.json()
        })
        .then(result => {
          setCompetitions(result)
        })
    }, [])

  return (
    <Layout>
      <Seo title="AutoStock" />
      <title>Leaderboards</title>
      <h1>Leaderboards</h1>
      <Stack direction="column" spacing={2} sx={{my: 5}}>
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
                      <Card key={index} variant="outlined" sx={{minWidth: 275}} >
                      <CardContent>
                        <Typography variant="h5" component="div">
                            {comp.name}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          Competition Length: {comp.duration}
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
                                      {algorithm.algorithmID}
                                    </td>
                                    <td className="table_data">{algorithm.profit}</td>
                                    <td className="table_data">{algorithm.userID}</td>
                                  </tr>
                                )
                              })}
                            </tbody>
                          </table>
                      </CardContent>
                      <CardActions>
                      <Button className="mdc-button mdc-button--raised"
                        onClick={event => {navigate('/app/competition', 
                        {
                          state: {id: comp.id},
                        }
                          )
                          }}> Learn More

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
