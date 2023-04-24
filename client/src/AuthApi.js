import axios from 'axios'

async function googleLogin(token){
    try{
        const response = await axios.post('/auth/google-login', { authHeader: `Bearer ${token}`} )
        return response.data
    }
    catch(err){
        if(err.response.status === 500) throw new Error("Log In Failed.")
        else throw new Error(err)
    }
}   

async function emailLogin(signUpData){
    try{
        const result = await axios.post('/auth/login', signUpData)
        return result.data.token
    }
    catch(err){
        if(err.response.status === 400) throw new Error("Invalid Credentials.")
        if(err.response.status === 404) throw new Error("Incorrect Email / Password.")
        if(err.response.status === 500) throw new Error("Log In Failed.")
        else throw new Error(err)
    }
}

async function emailSignUp(signUpData){
    try{
        const result = await axios.post('/auth/signup', signUpData)
        return result.data.token
    }
    catch(err){
        if(err.response.status === 400) throw new Error("User Already Exists.")
        else throw new Error(err)
    }
}

async function fetchUser(token){
    try {
        const response = await axios.get('/auth/user', { headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response.data)
        return response.data
    }
    catch(err){
        console.log(err)
        return null
    }
}

export {fetchUser, googleLogin, emailSignUp, emailLogin}