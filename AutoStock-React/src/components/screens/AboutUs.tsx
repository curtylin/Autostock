import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import Layout from "../layout"
import Logo from "../../images/AutostockLogo_green.jpg"
import linkedIn from "../../images/LI-Logo.png"
import { Divider, IconButton, Stack, Typography } from "@mui/material"
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const AboutUs = () => {


    return (
        <Layout>
            <br></br>
            <img style={{marginBottom:"auto", marginRight:"auto", marginLeft:"auto", display:"block"}} width={250} src={Logo}></img>
            {/* <img style={{marginBottom:"auto", marginRight:"auto", marginLeft:"auto", display:"block"}} width={250} src={"https://logos-world.net/wp-content/uploads/2021/08/Among-Us-Logo.png"}></img> */}

            <h1>Overview</h1>
            <p>Autostock is an algo trading platform that will allow users to have a more simplified experience when trading algorithmically. 
                Users are able to backtest their strategies on previous data, as well as test it in a real world trading environment. 
                One of the main features of our platform is to provide the “gamification” of algo-trading by having a leaderboard based system 
                where users can go head to head and test/compare their strategies.</p>
            <br></br>

            <h2>Architecture Diagram</h2>
            <img style={{marginBottom:"auto", marginRight:"auto", marginLeft:"auto", display:"block"}} width={600} src={"https://cdn.discordapp.com/attachments/888161914419552306/966098359603564564/Copy_of_Untitled_Diagram.drawio.png"}></img>
            <br></br>
            <h1>Our Story</h1>
            <p>We are currently in our final year of completion of the Computer Science B.S. Program at the University of Utah. This is our senior capstone project. We hope you like it, we do.</p>
            <br></br>

            <h1>Our Mission</h1>
            <p>Our goal is to create a new trading platform targeted towards quantitative analysts, programmers, trading hobbyists, and anyone willing to learn. 
                We want to simplify/gamify while teaching the key concepts of trading without having the user have to commit their hard earned money. 
                This can be done through simulations to compare a user’s own strategies with known strategies/our strategies/their friend’s strategies. 
                In our finished product, we want to create a platform that  creates a blend between both a simulation and real life trading platform.</p>
            <br></br>

            <h1>Our Team</h1>

            <hr></hr>
            <img src="https://i.imgur.com/8MdBMaS.jpg" alt="Albert Zhang portrait" width="250"></img>
            <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
                <Typography
                    fontSize={28}
                    fontWeight={600}
                    sx={{mb:0, mt: 1}}
                >
                    Albert Zhang
                </Typography>
                <IconButton aria-label="linkedIn" href="https://www.linkedin.com/in/albertzhang1/">
                    <LinkedInIcon fontSize="large" style={{color:"#007FFF"}}/>
                </IconButton>
            </Stack>
            <h4>Back End</h4>
            <a href = "mailto:albert.zhang8@gmail.com">albert.zhang8@gmail.com</a>
            <p> On AutoStock I focused mainly on the backend specifically the backtesting portion. I spent most of the time testing 
                and implementing new strategies as well as a couple front end features.For my personal portion of the project I added the chained feature in the edit and create algorithm.
                This project has been a great experience with me as it gave me the opportunity to learn a lot about web dev and algo trading. In my free time I like to swim, ski, play video games
                and the piano. 
                 </p>

            <hr></hr>
            <img src="https://i.imgur.com/dcHhpSR.jpg" alt="Brandon Nham portrait" width="250"></img>
            
            <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
                <Typography
                    fontSize={28}
                    fontWeight={600}
                    sx={{mb:0, mt: 1}}
                >
                    Brandon Nham
                </Typography>
                <IconButton aria-label="linkedIn" href="https://www.linkedin.com/in/brandon-nham/">
                    <LinkedInIcon fontSize="large" style={{color:"#007FFF"}}/>
                </IconButton>
            </Stack>
            <h4>Front End</h4>
            <a href = "mailto:brandon.nham@gmail.com">brandon.nham@gmail.com</a>
            <p>With Autostock, I focused on the front end of the project. For my personal feature, the discussion boards, I was able to dip my toes into the back end. For me, this project has 
                given me the opportunity to work closely with a team on new skills that I have found to enjoy. I also enjoy learning new skills outside of class like cooking and playing the guitar, even though 
                I am not very good at either. </p>

            <hr></hr>
            <img src="https://i.imgur.com/854jut8.jpg" alt="Curtis Lin portrait" width="250"></img>
            <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
                <Typography
                    fontSize={28}
                    fontWeight={600}
                    sx={{mb:0, mt: 1}}
                >
                    Curtis Lin
                </Typography>
                <IconButton aria-label="linkedIn" href="https://www.linkedin.com/in/curtis-lin/">
                    <LinkedInIcon fontSize="large" style={{color:"#007FFF"}}/>
                </IconButton>
            </Stack>
            <h4>Full Stack</h4>
            <a href = "mailto:curtylin@gmail.com">curtylin@gmail.com</a>
            <p>I am proud to have joined Autostock for the capstone project as the guy for full stack engineering. For this project, I did everything relating to the database including competitions, algorithms, and users. For my rank 3, I realized there was a need for bots for each competition to boost the competitiveness. This is my first time working on React and I am proud of what I have done. 
                In my freetime, I love experiencing new flavors and places. I also take plenty of pictures to document all of my experiences.
                <br></br>
            </p>


            <hr></hr>
            <img src="https://i.imgur.com/63zNA4E.jpg" alt="Jonathan Fairbanks portrait" width="250"></img>
            <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
                <Typography
                    fontSize={28}
                    fontWeight={600}
                    sx={{mb:0, mt: 1}}
                >
                    Jonathan Fairbanks
                </Typography>
                <IconButton aria-label="linkedIn" href="https://www.linkedin.com/in/jonathan-a-fairbanks/">
                    <LinkedInIcon fontSize="large" style={{color:"#007FFF"}}/>
                </IconButton>
            </Stack>
            <h4>Back End</h4>
            <a href = "mailto:jfairbanks.ames@gmail.com">jfairbanks.ames@gmail.com</a>
            <p>Hello, I am Jonathan Fairbanks I am currently an Software Engineering Intern at MasterControl and also a computer science student at the University of Utah. In my free time I enjoy building keyboards and making hot dogs. For this project I was primarily responsible for the backend as well as many of the devops operations,
                 including backtesting and competitions. My personal contributions was adding an analysis page so a user can see more data about a stock, and make the best algorithms that they can!  </p>

            <hr></hr>
            <img src="https://i.imgur.com/hJrdDDM.jpg" alt="Nick Mountz portrait" width="250"></img>
            <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
                <Typography
                    fontSize={28}
                    fontWeight={600}
                    sx={{mb:0, mt: 1}}
                >
                    Nick Mountz
                </Typography>
                <IconButton aria-label="linkedIn" href="https://www.linkedin.com/in/nicholasmountz/">
                    <LinkedInIcon fontSize="large" style={{color:"#007FFF"}}/>
                </IconButton>
            </Stack>
            <h4>Front End</h4>
            <a href = "mailto:nickmountz16@gmail.com">nickmountz16@gmail.com</a>
            <p>Nick is a fullstack developer and senior at the University of Utah studying Computer Science. He is very passionate about engineering and problem solving. Nick can be found designing and building new (and old) applications in his free time. </p>
            <br></br>


            <br></br>

        </Layout>
    )
}

export default AboutUs