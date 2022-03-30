import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import Layout from "../layout"

const AboutUs = () => {


    return (
        <Layout>
            {/* <h2>1. Create an algorithm</h2>
            <p>You can get started by <Link to="/app/createalgorithm">creating an algorithm.</Link></p>
            <img src="https://i.imgur.com/vYtuZIC.gif"></img>
            <br></br> */}

            <h1>Overview</h1>
            <p>Autostock is an algo trading platform that will allow users to have a more simplified experience when trading algorithmically. 
                Users are able to backtest their strategies on previous data, as well as test it in a real world trading environment. 
                One of the main features of our platform is to provide the “gamification” of algo-trading by having a leaderboard based system 
                where users can go head to head and test/compare their strategies.</p>
            <br></br>

            <h1>Our Story</h1>
            <p>insert who we are</p>
            <br></br>

            <h1>Our Mission</h1>
            <p>Our goal is to create a new trading platform targeted towards quantitative analysts, programmers, trading hobbyists, and anyone willing to learn. 
                We want to simplify/gamify while teaching the key concepts of trading without having the user have to commit their hard earned money. 
                This can be done through simulations to compare a user’s own strategies with known strategies/our strategies/their friend’s strategies. 
                In our finished product, we want to create a platform that  creates a blend between both a simulation and real life trading platform.</p>
            <br></br>

            <h1>Our Team</h1>
            <p>insert user Bios</p>
            <br></br>


            <br></br>

        </Layout>
    )
}

export default AboutUs