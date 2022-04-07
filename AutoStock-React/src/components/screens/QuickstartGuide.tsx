import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import { getUser} from "../../services/auth"
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
            if (result === null) {
                setUsername("")
            } else {
                setUsername(result.username)
            }
          })
      }    

    return (
        <Layout>
            <h1>I just signed up for Autostock. What do I do first?</h1>
            <h3>
                {username == "" ? (
                <>
                First, you need to <Link to="/app/edituser">set a username here.</Link>
                </>
                ) : (
                <>
                Welcome {username}!
                <br></br>
                Looks like you are already have already set a username! If you would like to change it, go to the "<Link to="/app/edituser">Edit Account</Link>" tab on the upper right corner.
                </>
                )}
            </h3>
            <br></br>

            <h2>1. Create an algorithm</h2>
            <p>You can get started by <Link to="/app/createalgorithm">creating an algorithm.</Link></p>
            <img src="https://i.imgur.com/ems0VXa.gif"></img>
            <br></br>

            <h2>2. Backtest your algorithm</h2>
            <p>Be sure to backtest your algorithm against historical data. Here is where you can see if some parts of the algorithm needs to be changed for a better yield.</p>
            <br></br>
            <img src="https://i.imgur.com/rvqOhoM.gif"></img>
            <br></br>

            <h2>3. Save your algorithm</h2>
            <p>Once you have saved your algorithm, remember to save it and your algorithm will be available for you to see in the "<Link to="/app/myalgorithm">My Algorithms</Link>" page. Here, you can edit, share, and delete your algorithm. <br></br><br></br> Please note: There will only be a day gain IF and only if you have submitted your algorithm to an active competition. Otherwise, please use the backtest function in the edit algorithm page.</p>
            <img src="https://i.imgur.com/HFqAOBv.gif"></img>
            <img src="https://i.imgur.com/2NZRo09.gif"></img>
            <br></br>

            <h2>4. View other people's algorithms for inspiration</h2>
            <p>Once your algorithm is shared with the world, and it can be viewed under the "<Link to="/app/publicalgorithms">Public Algorithms</Link>" page.</p>
            <img src="https://i.imgur.com/rTw7ljU.gif"></img>
            <br></br>

            <h2>5. Enter your algorithm into a competition</h2>
            <p> 
                Once you are happy with your algorithm, you can also enter it into a competition that you are interested in. You can do this by going to the "<Link to="/app/competition">Competitions</Link>" page. Make sure you submit your algorithm before the closing date of the competition. You are able to change the algorithm you submit anytime until the closing date.
                <img src="https://i.imgur.com/OcvTZa5.gif"></img>
                <br></br>
                Note: Make sure your algorithm's ticker is the same as the ticker of the competition.
            </p>
        </Layout>
    )
}

export default QuickStartGuide