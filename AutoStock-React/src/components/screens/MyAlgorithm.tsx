import React, { useState, useEffect } from "react"
import MuiTable from "../muiTable"
import Layout from "../layout"
import Seo from "../seo"

import { getUser } from "../../services/auth"

const MyAlgorithm = () => {
  const [algorithms, setAlgorithms] = useState(false)

  useEffect(() => {
    if (!algorithms) {
      getAlgorithmsDB()
    }
    console.log(algorithms)
  }, [algorithms])

  const getAlgorithmsDB = () => {
    //fetch post to localhost
    fetch(`http://localhost:5000/list-algorithm/${getUser().uid}`, {
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
          {algorithms ? <MuiTable algorithm={algorithms} /> : null}
        </div>
      </div>
    </Layout>
  )
}

export default MyAlgorithm
