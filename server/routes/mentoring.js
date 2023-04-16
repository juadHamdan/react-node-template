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
        res.send(mentorById[0]);
      });
  } catch (error) {
    res.send(error);
  }
});

router.post("/mentor/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const skills = req.body.skills;
    const workExperience = req.body.workExperience;
    const contactDetails = req.body.contactDetails;

    const result = await databaseQueries.createMentor(
      userId,
      skills,
      workExperience,
      contactDetails
    );

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
