
const router = require("express").Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library');
//const axios = require('axios')

const isLoggedIn = require("../route-handlers");
const JWT_SECRET = 'test'
const User =  require('../models/User')

router.get("/user", async (req, res) => {
    //verify login here (MiddleWare)

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) return res.status(400).send({message: "Token Is Missing"})

    const isGoogleAuth = token.length > 500
    if(isGoogleAuth){
        console.log("Google User")
        try{
            const user = jwt.decode(token)
            res.send({firstName: user.given_name, lastName: user.family_name, email: user.email, password: "", picture: user.picture}).end()
        }
        catch(err){
            return res.status(401)
        }
    }
    else{
        //DECODE HERE TOO
        const user = jwt.decode(token, JWT_SECRET)
        console.log(user)
        
        jwt.verify(token, JWT_SECRET, async (err, data) => {
            if (err) {
                return res.sendStatus(401);
            }
            console.log(data)
            const user = await User.findById(data.id)
            console.log(user)
            res.send(user)
        })
        
    }
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body
    try{
        const existingUser = await User.findOne({email})
        if(!existingUser) return res.status(404).send({message: "User doesn't exist."})
        const isPasswordCorrect = bcrypt.compare(password, existingUser.password)
        if(!isPasswordCorrect) return res.status(400).send({message: "Invalid credentials"})
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, JWT_SECRET, {expiresIn: "1h"})
        res.send({result: existingUser, token})
    }
    catch(err){
        console.log(err)
        res.status(500).send({message: "Something Went Wrong"})
    }
})

router.post('/signin', async (req, res) => {
    const {firstName, lastName, email, password} = req.body
    try{
        const existingUser = await User.findOne({email})
        if(existingUser) return res.status(400).send({message: "User already exist."})
        
        const hashedPassword = await bcrypt.hash(password, 12)
        const result = await User.create({firstName: firstName, lastName: lastName, email: email, password: hashedPassword})
        
        const token = jwt.sign({email: result.email, id: result._id}, JWT_SECRET, {expiresIn: "1h"})
        res.send({result: result, token})
    }
    catch(err){
        console.log(err)
        res.status(500).send({message: "Something Went Wrong"})
    }
})

const verifyGoogleLogin = async (jwtToken) => {
    const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
        idToken: jwtToken,
        audience: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return payload;
}

//google-login
router.post('/google-login', async (req, res) => {
    const {authHeader} = req.body
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) return res.status(400).send({message: "Token Is Missing"})

    const payload = await verifyGoogleLogin(token)
    console.log(payload)
    const email = payload.email
    const existingUser = await User.findOne({email})
    if(existingUser){
        console.log("Existing User")
        res.send({message: "Logged In Successfully"})
    }
    else{
        console.log("Creating User")
        const result = await User.create({firstName: payload.given_name, lastName: payload.family_name, email: payload.email, password: "", picture: payload.picture})
        res.send({result: result, token})
    }
    

    //console.log(jwt.decode(token))
/*
    try{
        const response = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo?access_token=" + accessToken )
        console.log(response.data)
        const email = response.data.email
        console.log(email)


        //sign the token
        const existingUser = await User.findOne({email})
        if(existingUser) {
            const result = await User.create({firstName: firstName, lastName: lastName, email: email, password: hashedPassword})
        }
        
        
        const token = jwt.sign({email: result.email, id: result._id}, JWT_SECRET, {expiresIn: "1h"})
        res.send({result: result, token})



        if(!existingUser) {
            return res.status(404).send({message: "User doesn't exist."})
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
        if(!isPasswordCorrect) return res.status(400).send({message: "Invalid credentials"})
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, JWT_SECRET, {expiresIn: "1h"})
        res.send({result: existingUser, token})
    }
    catch(err){
        res.status(401)
    }
    */


    //return the token
})











module.exports = router


