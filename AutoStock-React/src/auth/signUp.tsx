import React, { useState } from 'react'
import ReactDOM from 'react-dom';
//import { Link } from 'react-router-dom';
import {Link, navigate} from 'gatsby'
import firebase from 'firebase';

import IPageProps from '../../interface/page.interface';
import { SignInWithSocialMedia } from '../../modules/auth';
import { Providers } from '../../config/firebase';


const SignUpPage: React.FunctionComponent<IPageProps> = props => {
    const [authenticating, setAuthenticating] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
  //  const navigate = navigate("/");

    const signInWithSocialMedia = (provider: firebase.auth.AuthProvider) => {
        if (error !== '') setError('');

        setAuthenticating(true);

        SignInWithSocialMedia(provider)
            .then(result => {
                navigate('/');
            })
            .catch(error => {
                setAuthenticating(false);
                setError(error.message);
            });
    }

    return (
        <div className="AuthLogin">
            <div className="auth-main-container">
                <div>
                    <h1 >Welcome to React App</h1>
                    <p >Please Signup to continue by choosing one of the options below.</p>
                </div>
                <div className="auth-btn-wrapper">
                    <button
                        disabled={authenticating}
                        onClick={() => signInWithSocialMedia(Providers.google)}
                    >
                        SignUp with Google</button>

                    <Link to={`/`}>
                        <button>Back To Home Page</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}


export default SignUpPage;