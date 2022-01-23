import * as firebase from 'firebase/app';
import * as fb from 'firebase/auth';
import config from './config';

var defaultAuth = firebase.initializeApp(config.firebase);

// // Add or Remove authentification methods here.
// export const Providers = {
//     google: new firebase.auth.GoogleAuthProvider(),
// };

export const auth = new fb.GoogleAuthProvider();
export default defaultAuth;