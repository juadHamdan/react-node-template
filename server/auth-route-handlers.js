const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library');

const isGoogleLoginVerified = async (token) => {
    const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
    try{
        await client.verifyIdToken({ idToken: token, audience: process.env.REACT_APP_GOOGLE_CLIENT_ID })
        return true
    }
    catch(err){
        return false
    }
}

const isEmailLoginVerified = (token) => {
    try{
        const decodedData = jwt.decode(token, process.env.JWT_SECRET)
        console.log(decodedData)
        return true
    }
    catch(err){
        return false
    }
}

function isLoggedIn(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(400).send({ message: "Token Is Missing" })

    const isGoogleAuth = token.length > 500
    const isEmailAuth = !isGoogleAuth
    if(isGoogleAuth && isGoogleLoginVerified(token)) next()
    else if(isEmailAuth && isEmailLoginVerified(token)) next()
    else res.status(401).send("User Not Logged In").end()
}

module.exports = isLoggedIn