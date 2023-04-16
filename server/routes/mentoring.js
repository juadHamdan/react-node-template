const express = require("express");
const router = express.Router();
const databaseQueries = require("../services/databaseQueries");

router.get("/mentors", async (req, res) => {
    let skill = req.query.skill;
    let mentors = [];
    try {
        if (!skill) {
            mentors = await databaseQueries.getMentors();
        }
        else {
            mentors = await databaseQueries.getMentorsBySkill(skill);
        }
        res.send(mentors);
    } catch (error) {
        res.send(error)
    }
})

module.exports = router