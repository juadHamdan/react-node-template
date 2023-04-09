import './sign-up.css'
import {useState} from 'react'
import LoadingPage from '../loading-page/LoadingPage'
import SignUpIcon from './icons/sign-up.svg'
import FacebookIcon from './icons/facebook.svg'
import AppleIcon from './icons/apple.svg'
import GoogleIcon from './icons/google.png'
import EmailIcon from './icons/email.svg'
import {onGoogleSignUp} from '../../AuthApi'


const SignUp = () => {
    const [showLoadingPage, setShowLoadingPage] = useState(false)
    
    async function handleGoogleSignUp(){
        setShowLoadingPage(true)
        await onGoogleSignUp()
    }

    return (
        <div id="sign-up-container">
            <LoadingPage show={showLoadingPage} text={"Logging You In ..."}/>

            <div className="title-container">
                <img className="logo" src={SignUpIcon} />
                <h2 className="text">Sign Up</h2>
            </div>
            
            <button className="google-btn" onClick={handleGoogleSignUp}>
                <img className="logo" src={GoogleIcon} />
                <p>Continue With Google</p>
            </button>
            <button className="facebook-btn" onClick={handleGoogleSignUp}>
                <img className="logo" src={FacebookIcon} />
                <p>Continue With Facebook</p>
            </button>
            <button className="apple-btn" onClick={handleGoogleSignUp}>
                <img className="logo apple-icon" src={AppleIcon} />
                <p>Continue With Apple</p>
            </button>
            <p>OR</p>
            <button className="email-btn" onClick={handleGoogleSignUp}>
                <img className="logo" src={EmailIcon} />
                <p>Continue With Email</p>
            </button>
        </div>
    )
}

export default SignUp