import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import Layout from "../layout"
import Logo from "../../images/AutostockLogo_green.jpg"

const AboutUs = () => {
  return (
    <Layout>
      <br></br>
      <img
        style={{
          marginBottom: "auto",
          marginRight: "auto",
          marginLeft: "auto",
          display: "block",
        }}
        width={250}
        src={Logo}
      ></img>

      <h1>Overview</h1>
      <p>
        Autostock is an algo trading platform that will allow users to have a
        more simplified experience when trading algorithmically. Users are able
        to backtest their strategies on previous data, as well as test it in a
        real world trading environment. One of the main features of our platform
        is to provide the “gamification” of algo-trading by having a leaderboard
        based system where users can go head to head and test/compare their
        strategies.
      </p>
      <br></br>

      <h1>Our Story</h1>
      <p>
        We are currently in our final year of completion of the Computer Science
        B.S. Program at the University of Utah. This is our senior capstone
        project. We hope you like it, we do.
      </p>
      <br></br>

      <h1>Our Mission</h1>
      <p>
        Our goal is to create a new trading platform targeted towards
        quantitative analysts, programmers, trading hobbyists, and anyone
        willing to learn. We want to simplify/gamify while teaching the key
        concepts of trading without having the user have to commit their hard
        earned money. This can be done through simulations to compare a user’s
        own strategies with known strategies/our strategies/their friend’s
        strategies. In our finished product, we want to create a platform that
        creates a blend between both a simulation and real life trading
        platform.
      </p>
      <br></br>

      <h1>Our Team</h1>

      <hr></hr>
      <img
        src="https://media-exp1.licdn.com/dms/image/C4E03AQGi-_LJJPb3Uw/profile-displayphoto-shrink_200_200/0/1587842235640?e=1654128000&v=beta&t=mISNSvknyptico7TEqa9hth2e4s98q2HxmInKCZaS8o"
        alt="Albert Zhang portrait"
        width="250"
      ></img>
      <h2>Albert Zhang</h2>
      <h4>Weekend</h4>
      <p>Albert's BIO HERE</p>

      <hr></hr>
      <img
        src="https://media-exp1.licdn.com/dms/image/C4D03AQGa2YqdqowjTg/profile-displayphoto-shrink_200_200/0/1626983303468?e=1654128000&v=beta&t=BbviMuehzZhurC__h_R9HOiyZQx4RIL_ku1yGUqgXt4"
        alt="Brandon Nham portrait"
        width="250"
      ></img>
      <h2>Brandon Nham</h2>
      <h4>Frontend</h4>
      <p>Brandon's BIO HERE</p>

      <hr></hr>
      <img
        src="https://i.imgur.com/854jut8.jpg"
        alt="Curtis Lin portrait"
        width="250"
      ></img>
      <h2>Curtis Lin</h2>
      <h4>Full Stack</h4>
      <p>
        I am proud to have joined Autostock for the capstone project as the main
        guy for full stack engineering. For this project, I did everything
        relating to the database including competitions, algorithms, and users.
        For my rank 3, I realized there was a need for bots for each competition
        to boost the competitiveness. This is my first time working on React and
        I am proud of what I have done. In my freetime, I love experiencing new
        flavors and places. I also take plenty of pictures to document all of my
        experiences.
        <br></br>
        Find me on{" "}
        <Link to="https://www.linkedin.com/in/curtis-lin">LinkedIn</Link>!
      </p>

      <hr></hr>
      <img
        src="https://i.imgur.com/63zNA4E.jpg"
        alt="Jonathan Fairbanks portrait"
        width="250"
      ></img>
      <h2>Jonathan Fairbanks</h2>
      <h4>Backend</h4>
      <p>I like Hotdog. </p>

      <hr></hr>
      <img
        src="https://media-exp1.licdn.com/dms/image/C5603AQGxsLrwpvSVyA/profile-displayphoto-shrink_200_200/0/1621444830519?e=1654128000&v=beta&t=0za5UikHUTBDNvYiZY39Hsi7rN9nGz3Kgvj1c0FvBho"
        alt="Nick Mountz portrait"
        width="250"
      ></img>
      <h2>Nick Mountz</h2>
      <h4>Frontend</h4>
      <p>Nick's BIO HERE</p>

      <br></br>

      <br></br>
    </Layout>
  )
}

export default AboutUs
