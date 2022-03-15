import React, { useEffect, useState } from "react"
import "./screens.css"

import Layout from "../layout"
import Seo from "../seo"

const Algorithm = () => {

  const [algorithm, setAlgorithm] = useState<any>([])
  const [username, setUsername] = useState("")
  useEffect(() => {
    console.log(window.history.state)
    console.log(window.history.state.id)
    getAlgoDB()
    getUserDB()
    console.log(algorithm)
  }, [])

  const getAlgoDB = () => {
    fetch(`http://localhost:5000/get-algorithm/${window.history.state.id}`, {
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
        console.log(result )
        setAlgorithm(result)
      })
  }

  const getUserDB = () => {
    fetch(`http://localhost:5000/get-user/${window.history.state.userID}`, {
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
        console.log(result)
        if (result === null) {
          setUsername(window.history.state.userID)
      } else {
          setUsername(result.username)
      }
      })
  }


  return (
  <Layout>
    <Seo title="AutoStock" />
    <h1 className="algo_name">{algorithm.name}</h1>
    <h2>Ticker: {algorithm.ticker}</h2>
    <h3>Time Interval: {algorithm.timeInterval >= 24 ? (<>{algorithm.timeInterval/24} Days</>) : (<>{algorithm.timeInterval} Hours</>)}</h3>
    <h3>Indicator 1: {algorithm.indicator1}</h3>
    <h3>Period 1: {algorithm.period1}      Comparator: {algorithm.comparator}      Period 2: {algorithm.period2}</h3>
    <h3>Action: {algorithm.action}</h3>
    <h2>Algorithm Runtime: {algorithm.runningTime} Days</h2>
    <h3>Username: {username}</h3>
  </Layout>
  )
}


export default Algorithm
