import axios from 'axios'
import { SERVER_URL } from './Constants';

async function trySignOut() {
    try{
        await axios.get('auth/logout')
        return true
    }
    catch(err){
        console.log(err.response.statusText)
        return false
    }
}

async function onGoogleSignUp() {
    window.open(SERVER_URL + "/auth/google", "_self");
}

async function fetchUser(){
    try {
        const response = await axios.get("/auth/success")
        return response.data.user
    }
    catch(err){
        console.log(err.response.statusText)
        return null
    }
}

export {fetchUser, onGoogleSignUp, trySignOut}