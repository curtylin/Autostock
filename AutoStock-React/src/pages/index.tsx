import React, { useEffect, useState } from "react"
import { getUser, isLoggedIn } from "../services/auth"
import LayoutLanding from "../components/layout_landing"
import Seo from "../components/seo"
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "../components/screens/landingPage.css"
import { Link, navigate } from "gatsby"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Divider } from "@mui/material";
import stockPic1 from "../images/maxim-hopman.jpg"
import stockPic2 from "../images/wance-paleri.jpg"
import stockPic3 from "../images/jason-briscoe.jpg"
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';


const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color:" #1098F7",
  backgroundColor: "#1098F7",
  '&:hover': {
    backgroundColor:"#059a76",
  },
  textTransform: "none",
  width:" 200px",
  height: "60px",
}));

const theme = createTheme();

const IndexPage = () => {
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

  let link_start
  if (isLoggedIn()) {
    link_start = (
      <Link
        to="/app/home"
        style={{
          color: "white",
          textDecoration: "none",
          justifyContent: "center",
          textAlign: "center",
        }}
        className="autostock-link"
      >
        Get Started
      </Link>
    )
  } else {
    link_start = (
      <Link
        to="/app/login"
        style={{
          color: "white",
          textDecoration: "none",
          justifyContent: "center",
          textAlign: "center",
        }}
        className="autostock-link"
      >
        Get Started
      </Link>
    )
  }
  return (
    <LayoutLanding>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: '#14110F',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="md">
          <Typography
            fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
            fontWeight="500"
            variant="h2"
            component="div"
            sx={{
              mt: { xs: 0, md: 0 },
              mb: 0,
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
            }}
            style={{ color: "#F2F4FF" }}
          >
            {isLoggedIn() ? (
              <>
                {username == "" ? (
                  <>Welcome to Autostock</>
                ) : (
                  <>
                    Welcome to Autostock, {username}!<br></br>
                  </>
                )}
                <br></br>
              </>
            ) : (
              <>
                Welcome to Autostock!
                <br></br>
              </>
            )}
          </Typography>
         
          </Container>
          
        </Box>
        
        <Container sx={{ py: 8 }} maxWidth="md">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Typography
            fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
            fontSize="30px"
            fontWeight="600"
            component="div"
            textAlign="center"
            sx={{ display: { xs: "flex", md: "flex" }, mb: 5 }}
            style={{ color: "#059a76" }}
          >
            Start your journey with Autostock today!
          </Typography>
          </div>
          <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <ColorButton sx={{mt:0, mb:5}} variant="contained">

            <Typography
              fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
              variant="h5"
              fontSize="25px"
              noWrap
              component="div"
              sx={{display: { xs: "flex", md: "flex" } }}
              style={{ color: "white" }}
            >
              {isLoggedIn() ? (
                <Link
                  to="/app/home"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                  className="autostock-link"
                >
                  Get Started
                </Link>
              ) : (
                <Link
                  to="/app/login"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                  className="autostock-link"
                >
                  Get Started
                </Link>
              )}
            </Typography>
            </ColorButton>        
            </div>
        <Divider sx={{mb: 5}}/>
        <Grid sx={{mt:2}} direction={{xs:'column', md:'row'}} container spacing={2} justifyContent="center" alignContent={{xs:'center',sm:'flex', md:'flex'}}>
          <Grid item sm={12} md={4} lg={4} justifyContent="center">
            <Card  sx={{ maxWidth: 345 }}>
              <CardActionArea onClick={isLoggedIn() ? () => navigate(`/app/createalgorithm`) : () => navigate('/app/login')}>
              <CardMedia
                component="img"
                height="140"
                src={stockPic3}
                alt="stock image"
                sx={{mb:0}}
              />
              <CardContent>
              <Typography
                  sx={{ fontSize: 30 }}
                  justifyContent="center"
                  fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                  fontWeight="medium"
                  variant="h2"
                  gutterBottom
                >
                  Create.
                </Typography>
                <Typography sx={{mb:0}} variant="body2" color="text.secondary">
                  Design unique algorithms to practice trading strategies with the stocks
                  of your choice!
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          </Grid>
          <Grid item sm={12} md={4} lg={4} justifyContent="center">
            <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={isLoggedIn() ? () => navigate(`/app/competitions`) : () => navigate('/app/login')}>
            <CardMedia
              component="img"
              height="140"
              src={stockPic1}
              alt="stock image"
              sx={{mb:0}}
            />
            <CardContent >
              <Typography
                sx={{ fontSize: 30 }}
                justifyContent="center"
                fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                fontWeight="medium"
                variant="h2"
                gutterBottom
              >                
                  Compete.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                  Enter competitions with other traders to see who can create the best trading algorithms.
              </Typography>
            </CardContent>
            </CardActionArea>
          </Card>
          </Grid>
          <Grid item sm={12} md={4} lg={4} justifyContent="center">
            <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={isLoggedIn() ? () => navigate(`/app/publicalgorithms`) : () => navigate('/app/login')}>
            <CardMedia
              component="img"
              height="140"
              src={stockPic2}
              alt="stock image"
              sx={{mb:0}}
            />
            <CardContent >
              <Typography
                sx={{ fontSize: 30 }}
                justifyContent="center"
                fontFamily="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif"
                fontWeight="medium"
                variant="h2"
                gutterBottom
              >
                Share.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                View the algorithms created by other traders and share your own with the community!
              </Typography>
            </CardContent>
            </CardActionArea>
          </Card>
          </Grid>
        </Grid>
        </Container>

        <Container sx={{ }} maxWidth="md">
        <Divider sx={{mb: 5,mt:0}}/>
        <Typography
          fontSize={40}
          fontWeight="500"
          sx={{mb:5}}
        >
            The Autostock Team
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
          
          <Stack direction="column">
            <Grid sx={{mb:10}}direction={{xs:'column', md:'row'}} container spacing={12} justifyContent="center" alignContent={{xs:'center',sm:'flex', md:'flex'}}>
              <Grid item sm={12} md={4} lg={4} justifyContent="center" alignItems={"center"}>

                <Card style={{ maxWidth:200, maxHeight:200, borderRadius: '50%'}} >
                  <CardMedia >
                    <img
                      src="https://media-exp1.licdn.com/dms/image/C4E03AQGi-_LJJPb3Uw/profile-displayphoto-shrink_200_200/0/1587842235640?e=1654128000&v=beta&t=mISNSvknyptico7TEqa9hth2e4s98q2HxmInKCZaS8o"
                      alt="Albert Zhang portrait"
                      width="250"
                    ></img>                  
                  </CardMedia>
                </Card>
                <Typography sx={{mt: 1, mb:0, display: "flex",textAlign: "center",justifyContent: "center",}} color="#1098f6" fontWeight="600" fontSize="25px" noWrap>Albert Zhang</Typography>
                <Typography sx={{display: "flex",textAlign: "center",justifyContent: "center",}} fontWeight="500" fontSize="22px" noWrap>Back End</Typography>

              </Grid>
              <Grid item sm={12} md={4} lg={4} justifyContent="center">

              <Card style={{ maxWidth:200, maxHeight:200, borderRadius: '50%'}} >
                <CardMedia >
                    <img
                      src="https://media-exp1.licdn.com/dms/image/C4D03AQGa2YqdqowjTg/profile-displayphoto-shrink_200_200/0/1626983303468?e=1654128000&v=beta&t=BbviMuehzZhurC__h_R9HOiyZQx4RIL_ku1yGUqgXt4"
                      alt="Brandon Nham portrait"
                      width="250"
                    ></img>                  
                  </CardMedia>
                </Card>
                <Typography sx={{mt: 1, mb:0, display: "flex",textAlign: "center",justifyContent: "center",}} color="#1098f6" fontWeight="600" fontSize="25px" noWrap>Brandon Nham</Typography>
                <Typography sx={{display: "flex",textAlign: "center",justifyContent: "center",}} fontWeight="500" fontSize="22px" noWrap>Front End</Typography>

              </Grid>
              <Grid item sm={12} md={4} lg={4} justifyContent="center">

              <Card style={{ maxWidth:200, maxHeight:200, borderRadius: '50%'}} >
                <CardMedia >
                  <img
                    src="https://media-exp1.licdn.com/dms/image/C5603AQHwwK5bJU13AA/profile-displayphoto-shrink_200_200/0/1591376666560?e=1654128000&v=beta&t=7YdhOkopgDn31-WMuTt6bkYEcnG2xM0c2PM0Ne710-o"
                    alt="Curtis Lin portrait"
                    width="250"
                  ></img>                  
                </CardMedia>
              </Card>
              <Typography sx={{mt: 1, mb:0, display: "flex",textAlign: "center",justifyContent: "center",}} color="#1098f6" fontWeight="600" fontSize="25px" noWrap>Curtis Lin</Typography>
              <Typography sx={{display: "flex",textAlign: "center",justifyContent: "center",}} fontWeight="500" fontSize="22px" noWrap>Full Stack</Typography>
              </Grid>
            </Grid>

            <Grid sx={{mb:5}} direction={{xs:'column', md:'row'}} container spacing={12} justifyContent="center" alignContent={{xs:'center',sm:'flex', md:'flex'}}>
             <Grid item sm={12} md={4} lg={4} justifyContent="center">

                <Card style={{ maxWidth:200, maxHeight:200, borderRadius: '50%'}} >
                  <CardMedia >
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/autostock-fef22.appspot.com/o/jony.png?alt=media&token=d99b5016-45cc-4b4f-90cd-eba7dc57f37f"
                      alt="Jonathan Fairbanks portrait"
                      width="250"
                    ></img>                  
                  </CardMedia>
                </Card>
                <Typography sx={{mt: 1, mb:0, display: "flex",textAlign: "center",justifyContent: "center",}} color="#1098f6" fontWeight="600" fontSize="25px" noWrap>Jon Fairbanks</Typography>
                <Typography sx={{display: "flex",textAlign: "center",justifyContent: "center",}} fontWeight="500" fontSize="22px" noWrap>Back End</Typography>
              </Grid>
              <Grid item sm={12} md={4} lg={4} justifyContent="center">
                <Card style={{ maxWidth:200, maxHeight:200, borderRadius: '50%'}} >
                  <CardMedia >
                    <img
                      src="https://media-exp1.licdn.com/dms/image/C5603AQGxsLrwpvSVyA/profile-displayphoto-shrink_200_200/0/1621444830519?e=1654128000&v=beta&t=0za5UikHUTBDNvYiZY39Hsi7rN9nGz3Kgvj1c0FvBho"
                      alt="Nick Mountz portrait"
                      width="250"
                    ></img>                  
                  </CardMedia>
                </Card>
                <Typography sx={{mt: 1, mb:0, display: "flex",textAlign: "center",justifyContent: "center",}} color="#1098f6" fontWeight="600" fontSize="25px" noWrap>Nick Mountz</Typography>
                <Typography sx={{display: "flex",textAlign: "center",justifyContent: "center",}} fontWeight="500" fontSize="22px" noWrap>Front End</Typography>
              </Grid>
            </Grid>
          </Stack>
        </div>

        </Container>
      </main>
      {/* Footer */}

    </ThemeProvider>
    </LayoutLanding>
  )
}

export default IndexPage
