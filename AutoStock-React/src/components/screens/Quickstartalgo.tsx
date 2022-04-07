import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import { getUser } from "../../services/auth"
import Layout from "../layout"

const QuickStartGuide = () => {
  return (
    <Layout>
      <h1>I want to create an algorithm... where should I start?</h1>
      <br></br>
      <img src="https://i.imgur.com/ZGZ7EXP.png"></img>

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

      <h2>3. Pick a time interval you'd want your algorithm to run for.</h2>
      <p>
        For example, a "1 Hour" interval means that your algorithm would check
        every hour to check the comparators.
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

      <h2>5. Select the Period 1.</h2>
      <p>
        {" "}
        While different indicators take in different inputs, the most common
        indicators belong to the moving average family. Moving averages take in
        an input known as periods. The smaller the period the more sensative it
        will be to price changes. For Moving Averages a period will average the
        prices for the input period ammount and add the price on the previous
        day. While periods are common for many algotrading strategies they will
        change in more complicated strategies. It is recommend to play arround
        with periods respect to moving averages.
      </p>

      <br></br>

      <h2>6. Select the Indicator 2/Comparator.</h2>
      <p>
        Next portion of the entry is to give it another indicator or strategy to
        compare to. This will determine the different entry rules on when to buy
        and sell. <br></br>
        In the example, we have it so that we are comparing the 20 day open
        average and the 10 day open average. In other words, if the 20 day open
        average is higher than the 10 day open, we will execute a buy order.{" "}
      </p>

      <br></br>

      <h2>7. Select the Period 2.</h2>
      <p>
        {" "}
        Similar to period 1, Period 2 works as the period for the second
        indicator to complete the entry rules.{" "}
      </p>

      <br></br>

      <h2>8. Select Buy or Sell.</h2>
      <p>
        You are given an action that will perform when the conditions that are
        meant in the Entry/Entries are met. <br></br>
        <Link to="https://www.investopedia.com/terms/s/sma.asp">
          For more information about buy and sell orders
        </Link>
        .{" "}
      </p>

      <h2>9. Select the algorithm running time.</h2>
      <p>
        This will determine how long your algorithm will run for. Strategies
        especially indicators will be more effective depending on the length ran
        for.{" "}
      </p>

      <br></br>

      <h2>10. Add additional paramters.</h2>
      <p>
        You may chainlink different entries together in order to form a new
        strategy. This is not recommended for beginners and we recommend playing
        arround with one entry first, but is encouraged for more advanced users.{" "}
      </p>

      <br></br>

      <h2>11. When you are somewhat happy with your algorithm, Backtest!</h2>
      <p>
        You don't have to fully be satisfied with the algorithm at this point.
        Backtest your algorithm on historical data to see how well it would've
        done. Afterwards, you can repeat steps 2-10 until you feel like you are
        satisfied. Not only will it tell you how much money your algorithm
        would've made, it also tells you where your buy/sell orders were
        executed by the algorithm.{" "}
      </p>
      <br></br>

      <h2>12. Save your algorithm</h2>
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
