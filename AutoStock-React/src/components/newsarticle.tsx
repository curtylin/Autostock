import React, { useState, useEffect } from "react"
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';



function SwipeableTextMobileStepper() {
  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

  const [articles, setArticles] = useState([])
    useEffect(() => {
      getArticles()
      console.log(articles)
    }, [])
  
  const getArticles = () => {
      //fetch post to localhost
      fetch("http://localhost:5000/getNews/AAPL", {
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
          setArticles(result)
        })
    }
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = 8;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: 1080, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 1,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        >
      {articles.map((article:any, index:any) => {
        return(
        <div key={article.index}>
          
          {Math.abs(activeStep - index) <= 2 ? (
            <Box>
              <Typography sx={{
          display: '-webkit-box',
          overflow: 'hidden',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 1,
          }}
          variant="body2">{article.title}</Typography>
            </Box>
              // component="img"
              // sx={{
              //   height: 1080,
              //   display: 'block',
              //   maxWidth: 1080,
              //   overflow: 'hidden',
              //   height: '100%',
              //   width: '100%',
              // }}
              // src="https://cpb-us-w2.wpmucdn.com/u.osu.edu/dist/6/44792/files/2017/04/stock-market-3-21gyd1b.jpg"
              // alt={article.title}

          ) : null}
          {/* <Typography>{article.link}</Typography> */}

        </div>
      )
      })}
        
        {/* {articles.map((articles:any, index:any) => (
          <div key={articles.label}>
            {/* {Math.abs(activeStep - index) <= 2 ? (
            //   <Box
            //     component="article"
            //     sx={{
            //       height: 255,
            //       display: 'block',
            //       maxWidth: 400,
            //       overflow: 'hidden',
            //       width: '100%',
            //     }}
            //     src={articles.imgPath}
            //     alt={articles.label}
            //   />
            ) : null}
          </div>
        ))} */}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}

export default SwipeableTextMobileStepper;