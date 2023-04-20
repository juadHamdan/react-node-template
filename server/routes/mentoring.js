const express = require("express");
const router = express.Router();
const databaseQueries = require("../services/databaseQueries");
const {
  compareSkillsRatings,
  compareSkillRating,
} = require("../utils/compare-ratings");

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
      mentors = mentors.sort((mentor1, mentor2) =>
        compareSkillRating(mentor1, mentor2, skill)
      );
    }
    mentors = limit ? mentors.slice(0, limit) : mentors;
    res.send(mentors);
  } catch (error) {
    res.send(error);
  }
});

router.get("/mentorsNames", async (req, res) => {
  let mentorsNames = await databaseQueries.getMentorsNames();
  mentorsNames = mentorsNames.map((mentor) => {
    return {
      _id: mentor._id,
      fullName: mentor.user.firstName + " " + mentor.user.lastName,
    };
  });
  res.send(mentorsNames);
});

router.get("/mentors/:id", async (req, res) => {
  let mentorId = req.params.id;
  try {
    let mentor = await databaseQueries.getMentorByID(mentorId);
    res.send(mentor);
  } catch (error) {
    res.send(error);
  }
});

router.get("/mentor/:userId", async (req, res) => {
  let userId = req.params.userId;
  try {
    let mentor = await databaseQueries.getMentorByUserId(userId);
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

<<<<<<< HEAD
router.delete("/mentor/:userId", async (req, res) => {
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
=======
router.put("/mentor/:id", async (req, res) => {
  try {
    const userID = req.params.id;
    const updatedMentor = req.body;
    const mentor = await databaseQueries.updateMentor( userID , updatedMentor)
    res.status(200).send({ mentor });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});
router.post("/meetings/:userID", async (req, res) => {
  try {
    const user = await databaseQueries.getUserByID(req.params.userID)
    if (user.isMentor) {
      let meetingID = await databaseQueries.addMeeting(req.params.userID, req.body.title, req.body.startDate, req.body.endDate)
      res.send(meetingID.toString())
    }
    else {
      res.send("This user is not a mentor");
    }
  } catch (error) {
    res.send(error)
  }
})

router.delete("/meetings/:meetingID", async (req, res) => {
  try {
    await databaseQueries.deleteMeeting(req.params.meetingID)
    res.send({ msg: "The meeting deleted successfully" })
  } catch (error) {
    res.send(error)
  }
})

router.patch("/meetings/:meetingID", async (req, res) => {
  try {
    await databaseQueries.updateMeeting(req.params.meetingID, req.body.title, req.body.startDate, req.body.endDate)
    res.send("Meeting updated successfully.")
  } catch (error) {
    res.send(error);
  }
})

router.get('/meetings/:userID', async (req, res) => {
  try {
    let userID = req.params.userID
    let user = await databaseQueries.getUserByID(userID);
    let mentorMeetings = []
    if (user.isMentor) {
      mentorMeetings = await databaseQueries.getMentorMeetings(userID)
      mentorMeetings = mentorMeetings.map(meeting => {
        return {
          _id: meeting._id,
          startDate: meeting.startDate,
          endDate: meeting.endDate,
          mentor: meeting.mentor,
          mentee: meeting.mentee,
          isBooked: meeting.mentee ? true : false
        }
      })
    }
    else {
      mentorMeetings = await databaseQueries.getMenteeMeetings(userID)
    }
    res.send(mentorMeetings)
  } catch (error) {
    res.send(error);
  }
})

router.patch('/book-meeting/:meetingID/:menteeID', async (req, res) => {
  try {
    await databaseQueries.bookMeeting(req.params.meetingID, req.params.menteeID);
    res.send("Meeting booked successfully.")
  } catch (error) {
    console.log(error);
    res.send(error)
  }
})

>>>>>>> master
module.exports = router;

