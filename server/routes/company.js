const express = require("express");
const router = express.Router();
const companyQueries = require("../services/companyQueries");
const { compareSkillsRatings, compareSkillRating } = require("../utils/compare-ratings");
const { formatTime } = require("../utils/time-formate")

router.get("/", async (req, res) => {
    try {
        const companies = await companyQueries.getCompanies();
        res.send(companies);
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

router.patch("/pendings/:companyID/:userID", async (req, res) => {
    let companyID = req.params.companyID;
    let userID = req.params.userID;
    console.log("Here", companyID, userID)
    try {
        await companyQueries.addUserToCompanyPending(companyID, userID);
        res.send("user added to company pending successfully.")
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

router.post("/", async (req, res) => {
    try {
        let companyData = req.body;
        await companyQueries.addCompany(companyData);
        res.send("Company added successfully.")
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

// companies/users/34656example546?isPending = true
router.get("/users/:companyID", async (req, res) => {
    try {
        let isPending = req.query.isPending
        isPending = isPending ? JSON.parse(isPending.toLowerCase()) : false;
        if (isPending) {
            let pendingUsers = await companyQueries.getPendingUsers(req.params.companyID);
            res.send(pendingUsers);
        }
        else {
            let companyUsers = await companyQueries.getCompanyUsers(req.params.companyID);
            res.send(companyUsers);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

// When using one of the route in this page you need to add mentors to the route:
// example : /mentors/335465(companyID)

router.get("/mentors/:companyID", async (req, res) => {
    let companyID = req.params.companyID;
    let skill = req.query.skill;
    let limit = req.query.limit;
    let mentors = [];
    try {
        if (!skill) {
            mentors = await companyQueries.getCompanyMentors(companyID);
            mentors = mentors.sort(compareSkillsRatings);
        } else {
            mentors = await companyQueries.getMentorsCompanyBySkill(skill, companyID);
            mentors = mentors.sort((mentor1, mentor2) =>
                compareSkillRating(mentor1, mentor2, skill)
            );
        }
        mentors = limit ? mentors.slice(0, limit) : mentors;
        res.send(mentors);
    } catch (error) {
        console.log(error)
        res.send(error);
    }
});

router.get("/meetings/:companyID", async (req, res) => {
    let companyID = req.params.companyID
    try {
        let meetings = await companyQueries.getMeetingsInCompany(companyID)
        meetings = meetings.map(meeting => {
            let date = meeting.startDate.toString().split(" ").slice(0, 3).join(" ");
            let startTime = formatTime(meeting.startDate.getHours(), meeting.startDate.getMinutes())
            let endTime = formatTime(meeting.endDate.getHours(), meeting.endDate.getMinutes())
            return {
                Title: meeting.title,
                Mentor: meeting.mentor.firstName + " " + meeting.mentor.lastName,
                Mentee: meeting.mentee.firstName + " " + meeting.mentee.lastName,
                Date: date + ", " + startTime + " - " + endTime
            }
        })
        res.send(meetings)
    } catch (error) {
        console.log(error)
        res.send(error);
    }
})

module.exports = router;