const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
require('mongoose').connect(process.env.DB_URL, { useNewUrlParser: true }).then(() => console.log("Database connected")).catch((err) => console.log(err));
const app = express();
const path = require('path');

// set encoding middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const authRoute = require("./routes/auth");
app.use("/auth", authRoute);
const mentoringRoute = require("./routes/mentoring");
app.use("/", mentoringRoute);
app.use("/images", express.static(path.join(__dirname, 'images')))

const companyRoute = require("./routes/company");
app.use("/companies", companyRoute);

const mentorRoute = require("./routes/mentor");
app.use("/mentors", mentorRoute);

const isLoggedIn = require("./auth-route-handlers");

//request that requires login
app.get("/api-login", isLoggedIn, (req, res) => {
  res.send("request that requires login")
})

//request that doesn't requires login
app.get("/api", (req, res) => {
  res.send("request that doesn't requires login is successfull")
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
