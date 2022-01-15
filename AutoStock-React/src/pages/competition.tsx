import React, { useState, useEffect } from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

const Competition = () => {
  const [competition, setCompetition] = useState([])
  useEffect(() => {
    getCompDB()
    console.log(competition)
  }, [])

  const getCompDB = () => {
    //fetch post to localhost
    fetch("http://localhost:5000/get-competition/SbwzV5O2QkV9GS9EFNn4", {
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
        setCompetition(result)
      })
  }
  return (
    <Layout>
      <Seo title="AutoStock" />
      <h1>{competition.name}</h1> 
      <h2>Ticker: {competition.ticker}</h2>
      <h3>Participants: {competition.competitiors}</h3>
      <h3>Duration: {competition.competitiors}</h3>
      <h3>Starting Balance: {competition.startingBalance}</h3>
      <p>Details: {competition.description}</p>
      <></>
      <p>Submissions Close: {competition.closeDate}</p>

      <h2> someone pls add a algorithm selection form</h2>
      <button>Submit Algorithm</button>
    </Layout>
  )
}

export default Competition

function setTotalReactPackages(total: any): any {
  throw new Error("Function not implemented.")
}
