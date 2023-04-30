const express = require("express");
const router = express.Router();
const databaseQueries = require("../services/databaseQueries");



router.get("/:id", async (req, res) => {
    let mentorId = req.params.id;
    try {
        let mentor = await databaseQueries.getMentorByID(mentorId);
        res.send(mentor);
    } catch (error) {
        res.send(error);
    }
});


router.get("/users/:userId", async (req, res) => {
    let userId = req.params.userId;
    console.log(userId)
    try {
        let mentor = await databaseQueries.getMentorByUserId(userId);
        res.send(mentor);
    } catch (error) {
        res.send(error);
    }
});

router.get("/names/:companyID", async (req, res) => {
    let companyID = req.params.companyID
    try {
        let mentorsNames = await databaseQueries.getCompanyMentorsNames(companyID);
        mentorsNames = mentorsNames.map((mentor) => {
            return {
                _id: mentor._id,
                fullName: mentor.user.firstName + " " + mentor.user.lastName,
            };
        });
        res.send(mentorsNames);
    } catch (error) {
        res.send(error);
    }
});

router.patch("/:userID", async (req, res) => {
    try {
        await databaseQueries.approveUser(req.params.userID);
        res.send("The user registered successfully in the company.")
    } catch (error) {
        res.send(error);
        console.log(error);
    }
})

router.post("/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const skills = req.body.skills;
        const workExperience = req.body.workExperience;
        const contactDetails = {
            githubUrl: req.body.githubUrl,
            phoneNumber: req.body.phoneNumber,
            linkedinUrl: req.body.linkedinUrl,
        };
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

router.put("/:id", async (req, res) => {
    try {
        const userID = req.params.id;
        const updatedMentor = req.body;
        const mentor = await databaseQueries.updateMentor(userID, updatedMentor);
        res.status(200).send({ mentor });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

router.delete("/pages/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const result = await databaseQueries.getUserByID(userId);
        if (result) {
            const mentor = await databaseQueries.getMentorByUserId(userId);
            await databaseQueries.updateUser(userId);
            await databaseQueries.deleteMentorByID(mentor._id);
        }
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal server error" });
    }
});

router.delete("/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const result = await databaseQueries.getUserByID(userId);
        if (result && result.isMentor) {
            //is mentor
            const mentor = await databaseQueries.getMentorByUserId(userId);
            await databaseQueries.deleteMentorByID(mentor._id);
            await databaseQueries.deleteUserByID({
                _id: userId,
            });
        } else {
            //only user
            await databaseQueries.deleteUserByID({
                _id: userId,
            });
        }
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal server error" });
    }
});


module.exports = router;
