import './sign-up.css'
import { useState } from 'react'
import {googleLogin} from '../../AuthApi'
import LoadingPage from '../loading-page/LoadingPage'
import SignUpIcon from './icons/sign-up.svg'
import GoogleIcon from './icons/google.png'

import { GoogleLogin, useGoogleLogin } from '@react-oauth/google'
import LogInForm from './LogInForm'
import SignInForm from './SignInForm'
import axios from 'axios'

const SignUp = ({ onSubmitClick, onAuthorization }) => {
    const [isSignedUp, setIsSignedUp] = useState(false)
    const [showLoadingPage, setShowLoadingPage] = useState(false)

    const GoogleAuth = useGoogleLogin({
        onSuccess: async credentialResponse => {
            onSubmitClick()
            console.log(credentialResponse);
            await googleLogin(credentialResponse.access_token)
            onAuthorization(credentialResponse.access_token)
            setShowLoadingPage(false)
        },
        onError: () => {
            console.log('Login Failed');
            return null
        }
    });

    const onGoogleLogin = () => {
        setShowLoadingPage(true)
        GoogleAuth()
    }

    const onEmailLogin = async (formData) => {
        onSubmitClick()
        console.log(formData)
        const result = await axios.post('/auth/login', formData)
        onAuthorization(result.data.token)
    }

    const onEmailSignin = async (formData) => {
        onSubmitClick()
        console.log(formData)
        const result = await axios.post('/auth/signin', formData)
        onAuthorization(result.data.token)
    }

    return (
        <div id="sign-up-container">
            <LoadingPage show={showLoadingPage} text={"Logging You In ..."} />

            <div className="title-container">
                <img className="logo" src={SignUpIcon} />
                <h2 className="text">
                    {isSignedUp ? 'Sign In' : 'Sign Up'}
                </h2>
            </div>
            <GoogleLogin
                onSuccess={async credentialResponse => {
                    console.log(credentialResponse);
                    onSubmitClick()
                    console.log(credentialResponse);
                    await googleLogin(credentialResponse.credential)
                    onAuthorization(credentialResponse.credential)
                    setShowLoadingPage(false)
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
                />;

            <button className="google-btn" onClick={onGoogleLogin}>
                <img className="logo" src={GoogleIcon} />
                <p>Continue With Google</p>
            </button>
            <p>OR</p>

            {isSignedUp ? 
                <LogInForm onSubmit={onEmailLogin}/>
            :
                <SignInForm onSubmit={onEmailSignin}/>
            }

            <span>
                {isSignedUp ?
                    <a onClick={() => setIsSignedUp(false)} href="javascript:void(0);">Sign Up</a>
                :
                    <>
                        Already Signed Up? {' '}
                        <a onClick={() => setIsSignedUp(true)} href="javascript:void(0);">Log In</a>
                    </>
                }

            </span>
        </div>
    )
}

export default SignUp


/*
            <button className="facebook-btn" onClick={() => { }}>
                <img className="logo" src={FacebookIcon} />
                <p>Continue With Facebook</p>
            </button>
            <button className="apple-btn" onClick={() => { }}>
                <img className="logo apple-icon" src={AppleIcon} />
                <p>Continue With Apple</p>
            </button>
*/