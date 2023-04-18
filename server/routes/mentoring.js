const express = require("express");
const router = express.Router();
const databaseQueries = require("../services/databaseQueries");
const { compareSkillsRatings, compareSkillRating } = require("../utils/compare-ratings")


router.get("/mentors", async (req, res) => {
  let skill = req.query.skill;
  let limit = req.query.limit;
  let mentors = [];
  try {
    if (!skill) {
      mentors = await databaseQueries.getMentors();
      mentors = mentors.sort(compareSkillsRatings);
    } else {
      mentors = await databaseQueries.getMentorsBySkill(skill);
      mentors = mentors.sort((mentor1, mentor2) => compareSkillRating(mentor1, mentor2, skill));
    }
    mentors = limit ? mentors.slice(0, limit) : mentors;
    res.send(mentors);
  } catch (error) {
    res.send(error);
  }
});

router.get("/mentorsNames", async (req, res) => {
  let mentorsNames = await databaseQueries.getMentorsNames();
  mentorsNames = mentorsNames.map(mentor => {
    return { _id: mentor._id, fullName: mentor.user.firstName + " " + mentor.user.lastName }
  })
  res.send(mentorsNames);
})

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
