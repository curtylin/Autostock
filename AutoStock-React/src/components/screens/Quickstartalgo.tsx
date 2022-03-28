import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import { getUser} from "../../services/auth"
import Layout from "../layout"

const QuickStartGuide = () => {

    return (
        <Layout>
            <h1>I want to create an algorithm... where should I start?</h1>
            <br></br>

            <h2>1. Name your algorithm</h2>
            <p>We recommend naming it something with your name, ticker, and indicator with it. </p>
            {/* <img src="https://i.imgur.com/vYtuZIC.gif"></img> */}
            <br></br>

            <h2>2. Pick a stock ticker you would want to test your algorithm on.</h2>
            <p>We recommend taking look at the <Link to="/app/competitions">upcoming competitions</Link> to maximize your winnings by using a ticker you'd actually compete in.</p>
            {/* <img src="https://i.imgur.com/vYtuZIC.gif"></img> */}
            <br></br>

            <h2>3. Pick a time interval you'd want your algorithm to run for.</h2>
            <p>For example, a "1 Hour" interval means that your algorithm would check every hour to check the comparators.</p>
            {/* <img src="https://i.imgur.com/vYtuZIC.gif"></img> */}
            <br></br>

            <h2>4. Pick an indicator that would maximize the yield on your algorithm.</h2>
            <p>
                <Link to="https://www.investopedia.com/terms/s/sma.asp">SMA, or Simple moving average</Link> is the most basic indicator you can have. It essentially calculates the average of a selected range.
                <br></br>
                <Link to="https://www.investopedia.com/articles/trading/07/adx-trend-indicator.asp">ADX, or Average Directional Index Rating</Link> is a more advanced indicator that can be used to determine if the market is trending up or down.
                <br></br>
            </p>
            {/* <img src="https://i.imgur.com/vYtuZIC.gif"></img> */}
            <br></br>

            <h2>4. Select the Period 1.</h2>
            <p></p>
            {/* <img src="https://i.imgur.com/vYtuZIC.gif"></img> */}
            <br></br>

            <h2>5. Select the Indicator 2/Comparator.</h2>
            <p></p>
            {/* <img src="https://i.imgur.com/vYtuZIC.gif"></img> */}
            <br></br>

            <h2>6. Select the Period 2.</h2>
            <p></p>
            {/* <img src="https://i.imgur.com/vYtuZIC.gif"></img> */}
            <br></br>

            <h2>7. Select Buy or Sell.</h2>
            <p></p>
            {/* <img src="https://i.imgur.com/vYtuZIC.gif"></img> */}
            <br></br>

            <h2>8. Select the algorithm running time.</h2>
            <p></p>
            {/* <img src="https://i.imgur.com/vYtuZIC.gif"></img> */}
            <br></br>

            <h2>9. Add additional paramters.</h2>
            <p></p>
            {/* <img src="https://i.imgur.com/vYtuZIC.gif"></img> */}
            <br></br>

            <h2>10. When you are somewhat happy with your algorithm, Backtest!</h2>
            <p>You don't have to fully be satisfied with the algorithm at this point. Backtest your algorithm on historical data to see how well it would've done. Afterwards, you can repeat steps 2-10 until you feel like you are satisfied. Not only will it tell you how much money your algorithm would've made, it also tells you where your buy/sell orders were executed by the algorithm. </p>
            {/* <img src="https://i.imgur.com/vYtuZIC.gif"></img> */}
            <br></br>

            <h2>11. Save your algorithm</h2>
            <p>After you have backtested and feel your algorithm is ready, make sure to save your algorithm! This would allow you to enter your algorithm into a competition!</p>
            {/* <img src="https://i.imgur.com/vYtuZIC.gif"></img> */}
            <br></br>

            <h1>When you feel you are ready, let's <Link to="/app/createalgorithm">create an algorithm!</Link></h1>
        </Layout>
    )
}

export default QuickStartGuide