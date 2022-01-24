//template from https://mui.com/getting-started/templates/
import * as React from "react"
import { navigate } from "gatsby"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Link from "@mui/material/Link"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
//import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth"
import { initializeApp } from "firebase/app"

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright ©AutoStock "}
      <Link color="inherit" href="https://localhost:8000/">
        AutoStock
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const theme = createTheme()

export default function SignInSide() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [username, setUsername] = React.useState("")
  // TODO: Replace the following with your app's Firebase project configuration
  const firebaseConfig = {
    apiKey: process.env.GATSBY_APP_FIREBASE_KEY,
    authDomain: process.env.GATSBY_APP_FIREBASE_DOMAIN,
    databaseURL: process.env.GATSBY_APP_FIREBASE_DATABASE,
    projectId: process.env.GATSBY_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.GATSBY_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.GATSBY_APP_FIREBASE_SENDER_ID,
    appId: process.env.GATSBY_APP_FIREBASE_APP_ID,
    measurementId: process.env.GATSBY_APP_FIREBASE_MEASUREMENT_ID,
  }

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const provider = new GoogleAuthProvider()

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  
  signInWithPopup(provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // eslint-disable-next-line no-console
    let info = {
      email: data.get("email")?.toString(),
      password: data.get("password")?.toString(),
      username: data.get("Username")?.toString(),
    }

    setEmail(info.email)
    setPassword(info.password)
    setUsername(info.Username)
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            // backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundColor: "#2B2A2A",
            backgroundRepeat: "no-repeat",

            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Box display="block" justifyContent="center" alignItems="center">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10em",
                textAlign: "center",
                width: "100%",
              }}
            >
              <h1 style={{ fontSize: "5em", color: "#FFFFFF" }}>AUTO</h1>
              <h1 style={{ fontSize: "5em", color: "#059A76" }}>STOCK</h1>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                width: "100%",
              }}
            >
              <h6 style={{ color: "#FFFFFF" }}>An Algo-Trading Platform.</h6>
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              {/*<LockOutlinedIcon />*/}
            </Avatar>
            <Typography component="h1" variant="h5">
              Create Account
            </Typography>
            <Button
              onClick={() => { // Google provider object is created here.
                const googleAuth = new GoogleAuthProvider(); // using the object we will authenticate the user.
                signInWithPopup(auth, googleAuth);
                }}>Sign in with Google</Button>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="Username"
                label="Username"
                type="Username"
                id="Username"
                autoComplete="Username"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create Account
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
