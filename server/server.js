const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
require('mongoose').connect(process.env.DB_URL, { useNewUrlParser: true }).then(() => console.log("Database connected")).catch((err) => console.log(err));
const app = express();

// set encoding middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const authRoute = require("./routes/auth");
app.use("/auth", authRoute);

const isLoggedIn = require("./route-handlers");

//request that requires login
app.get("/uid", isLoggedIn, (req, res) => {
})

//request that doesn't requires login
app.get("/api", (req, res) => {
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
