import './sign-up.css'
import { useState } from 'react'
import { GoogleLogin, useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import LoadingPage from '../loading-page/LoadingPage'
import LogInForm from './LogInForm'
import SignUpForm from './SignUpForm'
import { googleLogin, emailSignUp, emailLogin } from '../../AuthApi'
import SignUpIcon from './icons/sign-up.svg'
import GoogleIcon from './icons/google.png'


const SignUp = ({ onSubmitClick, onAuthorization }) => {
    const [isSignedUp, setIsSignedUp] = useState(false)
    const [showLoadingPage, setShowLoadingPage] = useState(false)

    const onEmailLogin = async (formData) => {
        onSubmitClick()
        console.log(formData)
        try{
            const token = await emailLogin(formData)
            onAuthorization(token)
        }
        catch(err){
            toast(err.message)
        }
    }

    const onEmailSignUp = async (formData) => {
        onSubmitClick()
        console.log(formData)
        try{
            const token = await emailSignUp(formData)
            onAuthorization(token)
        }
        catch(err){
            toast(err.message)
        }
    }

    async function onGoogleLoginSuccess(token) {
        setShowLoadingPage(true)
        onSubmitClick()
        try {
            await googleLogin(token)
        }
        catch (err) {
            toast(err.message)
        }
        onAuthorization(token)
        setShowLoadingPage(false)
    }

    return (
        <div id="sign-up-container">
            <ToastContainer/>
            <LoadingPage show={showLoadingPage} text={"Logging You In ..."} />

            <div className="title-container">
                <img className="logo" src={SignUpIcon} />
                <h2 className="text">
                    {isSignedUp ? 'Sign In' : 'Sign Up'}
                </h2>
            </div>

            <div className="google-title-container">
                <img className="logo" src={GoogleIcon} />
                <p style={{textDecoration: "underline"}}>Continue With Google:</p>
            </div>

            <div className="google-btn-container" onMouseEnter={() => console.log("click")}>
                <GoogleLogin
                    onSuccess={res => onGoogleLoginSuccess(res.credential)}
                    onError={() => toast('Login Failed')}
                />
            </div>

            <p style={{textDecoration: "underline"}}>OR</p>

            {isSignedUp ? <LogInForm onSubmit={onEmailLogin} /> : <SignUpForm onSubmit={onEmailSignUp} />}

            <div className="auth-toggle">
                {isSignedUp ?
                    <button onClick={() => setIsSignedUp(false)}>Sign Up</button>
                :
                    <>
                        <p>Already Signed Up? {' '}</p>
                        <button onClick={() => setIsSignedUp(true)}>Log In</button>
                    </>
                }

            </div>
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