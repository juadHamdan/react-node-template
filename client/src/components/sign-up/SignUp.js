import './sign-up.css'
import { useState } from 'react'
import { GoogleLogin, useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import LoadingPage from '../loading-page/LoadingPage'
import LogInForm from './LogInForm'
import SignUpForm from './SignUpForm'
import { googleLogin, emailSignUp, emailLogin } from '../../AuthApi'
import SignUpIcon from '../../assets/icons/sign-up.svg'
import GoogleIcon from '../../assets/icons/google.png'
import Checkbox from '@mui/material/Checkbox';


const SignUp = ({ onSubmitClick, onAuthorization }) => {
    const [isSignedUp, setIsSignedUp] = useState(false)
    const [showLoadingPage, setShowLoadingPage] = useState(false)
    const [isCompany, setIsCompany] = useState(false)

    const onEmailLogin = async (formData) => {
        onSubmitClick()
        console.log(formData)
        try {
            const token = await emailLogin(formData, isCompany)
            onAuthorization(token, isCompany)
        }
        catch (err) {
            toast(err.message)
        }
    }

    const onEmailSignUp = async (formData) => {
        onSubmitClick()
        console.log(formData)
        try {
            const token = await emailSignUp(formData, isCompany)
            onAuthorization(token, isCompany)
        }
        catch (err) {
            toast(err.message)
        }
    }

    async function onGoogleLoginSuccess(token) {
        setShowLoadingPage(true)
        onSubmitClick()
        try {
            await googleLogin(token, isCompany)
        }
        catch (err) {
            toast(err.message)
        }
        onAuthorization(token, isCompany)
        setShowLoadingPage(false)
    }

    return (
        <div id="sign-up-container">
            <ToastContainer />
            <LoadingPage show={showLoadingPage} text={"Logging You In ..."} />

            <div className="title-container">
                <img className="logo" src={SignUpIcon} />
                <h2 className="text">
                    {isSignedUp ? 'Sign In' : 'Sign Up'}
                </h2>
            </div>

            <div className="google-title-container">
                <img className="logo" src={GoogleIcon} />
                <p style={{ textDecoration: "underline" }}>Continue With Google:</p>
            </div>

            <div className="google-btn-container">
                <GoogleLogin
                    onSuccess={res => onGoogleLoginSuccess(res.credential)}
                    onError={() => toast('Login Failed')}
                />
            </div>

            <p style={{ textDecoration: "underline" }}>OR</p>

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
            <div className="checkbox-container">

            <Checkbox
                checked={isCompany}
                onClick={() => setIsCompany(isCompany => !isCompany)}
                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                />

                <p>Continue As Company</p>
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