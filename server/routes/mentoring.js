const express = require("express");
const router = express.Router();
const databaseQueries = require("../services/databaseQueries");
const { compareRatings } = require("../utils/compare-ratings")


router.get("/mentors", async (req, res) => {
  let skill = req.query.skill;
  let limit = req.query.limit;
  let mentors = [];
  try {
    if (!skill) {
      mentors = await databaseQueries.getMentors();
    } else {
      mentors = await databaseQueries.getMentorsBySkill(skill);
    }
    mentors = mentors.sort(compareRatings);
    mentors = limit ? mentors.slice(0, limit) : mentors;
    res.send(mentors);
  } catch (error) {
    res.send(error);
  }
});


router.get("/mentors/:id", async (req, res) => {
  let mentorId = req.params.id;
  try {
    let mentor = await databaseQueries.getMentorByID(mentorId);
    res.send(mentor)
  } catch (error) {
    res.send(error);
  }
});

router.post("/mentor/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const skills = req.body.skills;
    const workExperience = req.body.workExperience;
    const contactDetails = { githubUrl: req.body.githubUrl, phoneNumber: req.body.phoneNumber, linkedinUrl: req.body.linkedinUrl };
    const result = await databaseQueries.createMentor(userId, skills, workExperience, contactDetails);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
