import axios from 'axios'
import { SERVER_URL } from './Constants';

async function googleLogin(token){
    try {
        const response = await axios.post('/auth/google-login', { authHeader: `Bearer ${token}`} )
        console.log(response.data)
        return response.data
        //const response = await axios.get(GOOGLE_LOGIN_ROUTE, { headers: {"Authorization" : `Bearer ${token}`} })
        //console.log(response.data)
        //return response.data
    }
    catch(err){
        console.log(err.response.statusText)
        return null
    }
}

async function fetchUser(token){
    try {
        const response = await axios.get('/auth/user', { headers: {"Authorization" : `Bearer ${token}`} })
        return response.data
    }
    catch(err){
        console.log(err.response.statusText)
        return null
    }
}

export {fetchUser, googleLogin}