const express = require("express");
const router = express.Router();
const databaseQueries = require("../services/databaseQueries");
const Mentor = require("../models/Mentor");

router.get("/mentors", async (req, res) => {
  let skill = req.query.skill;
  let mentors = [];
  try {
    if (!skill) {
      mentors = await databaseQueries.getMentors();
    } else {
      mentors = await databaseQueries.getMentorsBySkill(skill);
    }
    res.send(mentors);
  } catch (error) {
    res.send(error);
  }
});
router.get("/mentor/:id", (req, res) => {
  let mentorId = req.params.id;
  console.log(mentorId);
  try {
    Mentor.find({})
      .populate([{ path: "skills" }, { path: "user" }])
      .then((mentors) => {
        let mentorById = mentors.filter((mentor) => {
          console.log(mentor._id);
          console.log(mentorId);
          return mentor._id == mentorId;
        });
        console.log(mentorById);
        res.send(mentorById);
      });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
