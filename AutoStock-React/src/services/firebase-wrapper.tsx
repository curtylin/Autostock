import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { initializeApp } from "firebase/app"
import { navigate } from "gatsby"

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
const isBrowser = typeof window !== "undefined"

const lazy = (fn: any) => {
  let isLoaded = false
  let result: any
  return () => {
    if (!isLoaded) {
      isLoaded = true
      result = fn()
    }
    return result
  }
}

const googleAuthProvider = lazy(() => new GoogleAuthProvider())
const GetAuth = (app: any) => lazy(() => app.getAuth())
const SignInWithEmailAndPassword = (auth: any, email: any, password: any) =>
  lazy(() =>
    signInWithEmailAndPassword(auth, email!, password!)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user
        if (isBrowser) {
          console.log("Signed in as:", user.email)
          window.localStorage.setItem("currentUser", JSON.stringify(user))
          navigate(`/app/home`)
        }
        // ...
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
  )
const SignInWithPopup = (auth: any, provider: any) =>
  lazy(() =>
    signInWithPopup(auth, provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential?.accessToken
        // The signed-in user info.
        const user = result.user
        if (isBrowser) {
          console.log("Signed in via google as:", user.email)
          window.localStorage.setItem("currentUser", JSON.stringify(user))
          navigate(`/app/home`)
        }
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        console.log(errorCode, errorMessage, email, credential)
      })
  )
const InitializeApp = lazy(() => initializeApp(firebaseConfig))

export {
  googleAuthProvider,
  GetAuth,
  SignInWithEmailAndPassword,
  SignInWithPopup,
  InitializeApp,
  firebaseConfig,
}
