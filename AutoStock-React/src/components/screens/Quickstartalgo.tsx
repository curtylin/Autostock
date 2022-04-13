import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import { getUser } from "../../services/auth"
import Layout from "../layout"

const QuickStartGuide = () => {
  return (
    <Layout>
      <h1>I want to create an algorithm... where should I start?</h1>
      <br></br>
      <img src="https://i.imgur.com/Mm6YIb7.png"></img>

      <h2>0. Research your Ticker!</h2>
      <img src="https://i.imgur.com/947hjMu.png"></img>
      <p>
        We included a page called Analysis on the top right corner of the create algorithm page. Just put in a ticker and this allows you to get more information about the company you would want to research. This breaks down a company visually by showing you information such as Major Share holders, Options calendars to get you up to speed, and Recommendations whether to buy or sell. We also give information about quarterly earnings showing the performance of the company in the last year. {" "}
      </p>
      <br></br>

      <h2>1. Name your algorithm</h2>
      <p>
        We recommend naming it something with your name, ticker, and indicator
        with it.{" "}
      </p>
      <br></br>

      <h2>2. Pick a stock ticker you would want to test your algorithm on.</h2>
      <p>
        We recommend taking look at the{" "}
        <Link to="/app/competitions">upcoming competitions</Link> to maximize
        your winnings by using a ticker you'd actually compete in.
      </p>
      {/* <img src="https://i.imgur.com/vYtuZIC.gif"></img> */}
      <br></br>

      <h2>3. Write a brief description about your algorithm</h2>
      <p>
        This will be shown to people if you choose to make your algorithm public. 
      </p>
      {/* <img src="https://i.imgur.com/vYtuZIC.gif"></img> */}
      <br></br>

      <h2>
        4. Pick an indicator that would maximize the yield on your algorithm.
      </h2>
      <p>
        Now we must start with the entry portion of the strategy or rules that
        signal when to buy or sell. Indicators are technical strategies that are
        built into most algotrading API's that initiate trades based off
        different trends. Picking your indicator is very vital to ensuring your
        algotrading strategy is successful which is why we recommend
        backtesting, looking at different trends and doing your research. Below
        are some links to some basic indicators:
        <br></br>
        <br></br>
        In the example above, we selected{" "}
        <Link to="https://www.investopedia.com/terms/s/sma.asp">
          SMA, or Simple moving average
        </Link>
        . It is the most basic indicator you can have. It essentially calculates
        the average of a selected range.
        <br></br>
        <Link to="https://www.investopedia.com/articles/trading/07/adx-trend-indicator.asp">
          ADX, or Average Directional Index Rating
        </Link>{" "}
        is a more advanced indicator that can be used to determine if the market
        is trending up or down.
        <br></br>
        The list goes on and on.
      </p>
      <br></br>

      <h2>5. Select the Indicator 2/Comparator.</h2>
      <p>
        Next portion of the entry is to give it another indicator or strategy to
        compare to. This will determine the different entry rules on when to buy
        and sell. <br></br>
        In the example, we have it so that we are comparing the 20 day open
        average and the 10 day open average. In other words, if the 20 day open
        average is higher than the 10 day open, we will execute a buy order.{" "}
      </p>

      <br></br>

      <h2>6. Select Buy or Sell.</h2>
      <p>
        You are given an action that will perform when the conditions that are
        meant in the Entry/Entries are met. <br></br>
        <Link to="https://www.investopedia.com/terms/s/sma.asp">
          For more information about buy and sell orders
        </Link>
        .{" "}
      </p>
      <br></br>

      <h2>7. Add additional paramters.</h2>
      <p>
        You may chainlink different entries together in order to form a new
        strategy. This is not recommended for beginners and we recommend playing
        arround with one entry first, but is encouraged for more advanced users.{" "}
      </p>

      <br></br>

      <h2>8. And/Or For the Chained Entry.</h2>
      <p>
        When you have multiple entries, you can add an "And" or "Or" to compare your entry 1 to entry 2 fields. {" "}
      </p>

      <br></br>

      <h2>9. Select Buy or Sell.</h2>
      <p>
        You are given an action that will perform when the conditions that are
        meant in the Entry/Entries are met. <br></br>
        <Link to="https://www.investopedia.com/terms/s/sma.asp">
          For more information about buy and sell orders
        </Link>
        .{" "}
      </p>
      <br></br>

      <h2>10-12. When you are somewhat happy with your algorithm, Backtest!</h2>
      <p>
        You don't have to fully be satisfied with the algorithm at this point.
        Backtest your algorithm on historical data to see how well it would've
        done. Afterwards, you can repeat steps 2-10 until you feel like you are
        satisfied. Not only will it tell you how much money your algorithm
        would've made, it also tells you where your buy/sell orders were
        executed by the algorithm. Your start date is the starting point of where you will test your algorithm. Your end date is where your backtest will end. {" "}
      </p>
      <br></br>

      <h2>13. Save your algorithm</h2>
      <p>
        After you have backtested and feel your algorithm is ready, make sure to
        save your algorithm! This would allow you to enter your algorithm into a
        competition!
      </p>
      <br></br>

      <h1>
        When you feel you are ready, let's{" "}
        <Link to="/app/createalgorithm">create an algorithm!</Link>
      </h1>
    </Layout>
  )
}

export default QuickStartGuide
