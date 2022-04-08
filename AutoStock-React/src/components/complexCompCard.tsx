import * as React from "react"
import { styled } from "@mui/material/styles"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Collapse from "@mui/material/Collapse"
import Avatar from "@mui/material/Avatar"
import IconButton, { IconButtonProps } from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import { red } from "@mui/material/colors"
import { CardActionArea } from "@mui/material"
import "../components/complexCompCard.css"
import { Link, navigate } from "@reach/router"
import Button from "@mui/material/Button"

const subheaders = ""
const ComplexCompCard = ({
  compLength,
  compTicker,
  compStartingVal,
  compDeadline,
  description,
  id,
  logo,
}: any) => {
  return (
    <Card variant="outlined" className="compCard" sx={{ maxWidth: 500 }}>
      <CardActionArea
        id={id}
        onClick={event => {
          navigate(`/app/competition`, {
            state: { id },
          })
        }}
      >
        {" "}
        {/*CHANGE THIS TO CORRESPONDING COMP*/}
        {/* <CardHeader
          className="compHeader"
          title={compTicker}
          subheader={compLength}
        /> */}
        <CardContent sx={{pb:0}}>
        <Typography
            fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
            fontWeight="600"
            fontSize="28px"
            variant="h4"
            noWrap
            component="div"
            sx={{display: { xs: "flex", md: "flex" } }}
            style={{ color: "black" }}
          >{compTicker}</Typography>
        </CardContent>
        <CardContent>
        <Typography
            fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
            fontWeight="400"
            fontSize="20px"
            variant="h4"
            noWrap
            component="div"
            sx={{ mb:0, pb:0 ,display: { xs: "flex", md: "flex" } }}
          >{compLength}
          </Typography>
        </CardContent>
        <CardMedia
          style={{
            width: "auto",
            maxHeight: "200px",
            margin: "auto",
          }}
          component="img"
          height="140"
          // maybe scrape for an image using the ticker
          image={logo}
          alt="Ticker logo"
          sx={{ mb: 0 }}
        ></CardMedia>
        <CardContent>
          <Button
            className="mdc-button mdc-button--raised"
            id={id}
            onClick={event => {
              navigate(`/app/competition`, {
                state: { id },
              })
            }}
          >
            {" "}
            Learn More
          </Button>
        </CardContent>
        
      </CardActionArea>
    </Card>
  )
}
export default ComplexCompCard

