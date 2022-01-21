import * as React from "react"



// import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
// import { any } from "prop-types";


//   const auth = getAuth();
//   const Algorithm = () => ():any

//     signInWithEmailAndPassword(auth, email:any, password :any).then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });
// )

// export default login
const config = {
  firebase: {
      apiKey: process.env.REACT_APP_FIREBASE_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
      measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  }
}

export default config;