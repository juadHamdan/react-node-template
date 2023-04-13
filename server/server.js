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

const Mentor = require("./models/Mentor")
const Skill = require("./models/Skill")

app.get("/mentors", (req, res) => {
  let skill = req.query.skill;
  try {
    Mentor.find({}).populate([{ path: 'skills' }, { path: 'user', select: 'firstName lastName picture email position' }]).then(mentors => {
      if (!skill) {
        res.send(mentors)
      }
      else {
        let mentorsWithSkill = mentors.filter(mentor => {
          return mentor.skills.some(element => {
            return element.skill.toLowerCase() === skill.toLocaleLowerCase()
          });
        })
        res.send(mentorsWithSkill)
      }
    })
  } catch (error) {
    res.send(error)
  }
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
