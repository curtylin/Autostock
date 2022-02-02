import React, { useState, useEffect } from "react"
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

export default function TextMobileStepper() {

  const [articles, setArticles] = useState([])
    useEffect(() => {
    getArticles()
    console.log(articles)
    }, [])
  
  
  const getArticles = () => {
    //fetch post to localhost
    fetch("http://localhost:5000/getNews", {
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
  const [activeArticle, setActiveArticle] = React.useState(0);
  const maxArticles = 4

  const handleNext = () => {
    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
  };

  const handleBack = () => {
    setActiveArticle((prevActiveArticle) => prevActiveArticle - 1);
  };

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography>{articles[activeArticle].publisher}</Typography>
      </Paper>
      <Box sx={{ height: 255, maxWidth: 400, width: '100%', p: 2 }}>
        {articles[activeArticle].title
      </Box>
      <MobileStepper
        variant="text"
        articles={maxArticles}
        position="static"
        activeArticle={activeArticle}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeArticle === maxArticles - 1}
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
          <Button size="small" onClick={handleBack} disabled={activeArticle === 0}>
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