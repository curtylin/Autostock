import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import { getUser, isLoggedIn } from "../../services/auth"
import Layout from "../layout"

const QuickStartGuide = () => {

    const [username, setUsername] = useState("")
    useEffect(() => {
        getUserDB()
        console.log(username)
      }, [])

    const getUserDB = () => {
        //fetch post to localhost
        // console.log("getting comp db" + window.history.state.id) 
        fetch(`http://localhost:5000/get-user/${getUser().uid}`, {
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
            if (result.username === null) {
                setUsername("")
            } else {
                setUsername(result.username)
            }
          })
      }    

    return (
        <Layout>
            <h1>Quick Start Guide</h1>
            <p>
                {username == "" ? (
                <>
                First, you need to <Link to="/app/edituser">set a username here.</Link>
                </>
                ) : (
                <>
                Welcome {username}! You are already have already set a username. If you would like to change it, click <Link to="/app/edituser">here</Link> or under the "Account" tab on the upper right corner.
                <br></br>
                You can now <Link to="/app/createalgorithm"> create an algorithm.</Link>

                </>
                )}
            </p>
        </Layout>
    )
}

export default QuickStartGuide