
const router = require("express").Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library');
const isLoggedIn = require("../auth-route-handlers");
const User = require('../models/User')
const Company = require('../models/Company')


const verifyGoogleLogin = async (token) => {
    const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return payload;
}


router.get("/user", isLoggedIn, async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(400).send({ message: "Token Is Missing" })

    const isGoogleAuth = token.length > 500
    if (isGoogleAuth) {
        try {
            const user = jwt.decode(token)
            const userDocument = await User.findOne({ email: user.email });
            res.send(userDocument);
        }
        catch (err) {
            return res.status(401)
        }
    }
    else {
        const decodedData = jwt.decode(token, process.env.JWT_SECRET)
        const user = await User.findById(decodedData.id)
        res.send(user)
    }
})

router.get("/company", isLoggedIn, async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(400).send({ message: "Token Is Missing" })

    const isGoogleAuth = token.length > 500
    if (isGoogleAuth) {
        try {
            const company = jwt.decode(token)
            const companyDocument = await Company.findOne({ email: company.email });
            res.send(companyDocument);
        }
        catch (err) {
            return res.status(401)
        }
    }
    else {
        const decodedData = jwt.decode(token, process.env.JWT_SECRET)
        const user = await Company.findById(decodedData.id)
        res.send(user)
    }
})

router.post('/login', async (req, res) => {
    const isCompanyQuery = req.query.isCompany
    const { email, password } = req.body
    try {
        if(isCompanyQuery === 'false'){
            const existingUser = await User.findOne({ email })
            if (!existingUser) return res.status(404).send({ message: "User doesn't exist." })
            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
            if (!isPasswordCorrect) return res.status(400).send({ message: "Invalid credentials" })
            const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" })
            res.send({ result: existingUser, token })
        }
        else{
            const existingCompany = await Company.findOne({ email })
            if (!existingCompany) return res.status(404).send({ message: "Company doesn't exist." })
            const isPasswordCorrect = await bcrypt.compare(password, existingCompany.password)
            if (!isPasswordCorrect) return res.status(400).send({ message: "Invalid credentials" })
            const token = jwt.sign({ email: existingCompany.email, id: existingCompany._id }, process.env.JWT_SECRET, { expiresIn: "1h" })
            res.send({ result: existingCompany, token })
        }



    }
    catch (err) {
        console.log(err)
        res.status(500).send({ message: "Something Went Wrong" })
    }
})

router.post('/signup', async (req, res) => {
    const isCompanyQuery = req.query.isCompany
    const { firstName, lastName, email, password } = req.body
    try {
        const hashedPassword = await bcrypt.hash(password, 12)
        let result = null

        if(isCompanyQuery === 'false'){
            const existingUser = await User.findOne({ email })
            if (existingUser) return res.status(400).send({ message: "User already exist." })   
            result = await User.create({ firstName: firstName, lastName: lastName, email: email, password: hashedPassword, isPending: true })
 
        }
        else{
            const existingCompany = await Company.findOne({ email })
            if (existingCompany) return res.status(400).send({ message: "Company already exist." })
            result = await Company.create({ name: firstName, email: email, password: hashedPassword })
        }

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.JWT_SECRET, { expiresIn: "1h" })
        res.send({ result: result, token })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ message: "Something Went Wrong" })
    }
})


router.post('/google-login', async (req, res) => {
    const isCompanyQuery = req.query.isCompany
    const { authHeader } = req.body
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(400).send({ message: "Token Is Missing" })

    try {
        const payload = await verifyGoogleLogin(token)
        const email = payload.email

        if(isCompanyQuery === 'false'){
            const existingUser = await User.findOne({ email })
            if (existingUser) res.send({ message: "Logged In Successfully" })
            else {
                const result = await User.create({ firstName: payload.given_name, lastName: payload.family_name, email: payload.email, password: "", picture: payload.picture, isPending: true })
                res.send({ result: result, token })
            }
        }
        else{
            const existingCompany = await Company.findOne({ email })
            if (existingCompany) res.send({ message: "Logged In Successfully" })
            else {
                const result = await Company.create({ name: payload.name, email: payload.email, password: "" })
                res.send({ result: result, token })
            }
        }

    }
    catch (err) {
        console.log(err)
        res.status(401)
    }
})

module.exports = router


