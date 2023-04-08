const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./passport');

require('mongoose').connect(process.env.DB_URL, { useNewUrlParser: true }).then(() => console.log("Database connected")).catch((err) => console.log(err));

const app = express();

// set encoding middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieSession({name: 'google-auth-session', keys: ['key1', 'key2']}))
app.use(passport.initialize());
app.use(passport.session());

const authRoute = require("./routes/auth");
app.use("/auth", authRoute);

const isLoggedIn = require("./route-handlers");

//request that requires login
app.get("/uid", isLoggedIn, (req, res) => {
  if(req.user) res.send(req.user.uid)
  else res.send("user not logged in")
})

//request that doesn't requires login
app.get("/api", (req, res) => {
  res.send("This is the response")
})

app.listen(process.env.PORT, () => console.log(`Running on port ${process.env.PORT}`))


























/*
const cors = require('cors');
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
*/
