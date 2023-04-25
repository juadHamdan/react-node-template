const express = require("express");
const router = express.Router();
const databaseQueries = require("../services/databaseQueries");
const {
  compareSkillsRatings,
  compareSkillRating,
} = require("../utils/compare-ratings");

const { upload } = require("../middlewares/mutler");
const { createZoomMeeting } = require("../services/zoom-meeting")



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
    res.send(mentor);
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
router.put("/mentor/:id", async (req, res) => {
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
router.post("/meetings/:userID", async (req, res) => {
  try {
    const user = await databaseQueries.getUserByID(req.params.userID);
    if (user.isMentor) {
      let meetingID = await databaseQueries.addMeeting(
        req.params.userID,
        req.body.title,
        req.body.startDate,
        req.body.endDate
      );
      res.send(meetingID.toString());
    } else {
      res.send("This user is not a mentor");
    }
  } catch (error) {
    res.send(error);
  }
});

router.delete("/meetings/:meetingID", async (req, res) => {
  try {
    await databaseQueries.deleteMeeting(req.params.meetingID);
    res.send({ msg: "The meeting deleted successfully" });
  } catch (error) {
    res.send(error);
  }
});

router.patch("/meetings/:meetingID/:userID", async (req, res) => {
  try {
    let isMentee = await databaseQueries.checkIfMentee(
      req.params.meetingID,
      req.params.userID
    );
    if (isMentee) {
      res.status(403).send("You are not allowed to change the mentor schedule");
      return;
    }
    await databaseQueries.updateMeeting(
      req.params.meetingID,
      req.body.title,
      req.body.startDate,
      req.body.endDate
    );
    res.send("Meeting updated successfully.");
  } catch (error) {
    res.send(error);
  }
});

router.patch("/meetings/:meetingID", async (req, res) => {
  try {
    await databaseQueries.updateMeeting(
      req.params.meetingID,
      req.body.title,
      req.body.startDate,
      req.body.endDate
    );
    res.send("Meeting updated successfully.");
  } catch (error) {
    res.send(error);
  }
});

router.get("/meetings/:userID", async (req, res) => {
  try {
    let userID = req.params.userID;
    let user = await databaseQueries.getUserByID(userID);
    let mentorMeetings = [];
    if (user.isMentor) {
      mentorMeetings = await databaseQueries.getMentorMeetings(userID);
      mentorMeetings = mentorMeetings.map((meeting) => {
        return {
          _id: meeting._id,
          title: meeting.title,
          startDate: meeting.startDate,
          endDate: meeting.endDate,
          mentor: meeting.mentor,
          mentee: meeting.mentee,
          isBooked: meeting.mentee ? true : false,
          zoomLink: meeting.zoomLink
        }
      })
    } else {
      mentorMeetings = await databaseQueries.getMenteeMeetings(userID);
    }
    res.send(mentorMeetings);
  } catch (error) {
    res.send(error);
  }
});

router.patch("/book-meeting/:meetingID/:menteeID", async (req, res) => {
  try {
    const meetingId = req.params.meetingID;
    const menteeId = req.params.menteeID;
    const action = req.body.action;
    if (action === 'book') {
      let meeting = await databaseQueries.getMeetingById(meetingId);
      let duration = (meeting.endDate - meeting.startDate) / 60000;
      let zoomLink = await createZoomMeeting(meeting.startDate, duration, meeting.title, meeting.mentor.email);
      await databaseQueries.bookMeeting(req.params.meetingID, req.params.menteeID, zoomLink);
      res.send("Meeting booked successfully.");
    } else if (action === 'cancel') {
      await databaseQueries.cancelMeeting(meetingId, menteeId);
      res.send("Meeting cancelled successfully.");
    } else {
      throw new Error('Invalid action.');
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});


router.delete("/mentor-Page/:userId", async (req, res) => {
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

router.put("/images/:userID", upload.single("profileImg"), async (req, res) => {
  let userID = req.params.userID;
  try {
    const url = req.protocol + "://" + req.get("host");
    let pictureURL = url + "/images/" + req.file.filename;
    await databaseQueries.deletePreviousPicture(userID);
    await databaseQueries.updatesUserPicture(userID, pictureURL);
    res.send("image uploaded successfully.");
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

router.put("/users/:userID", async (req, res) => {
  let userID = req.params.userID;
  let newFirstName = req.query.filename;
  let newLastName = req.query.lastName;
  try {
    await databaseQueries.changeUserName(userID, newFirstName, newLastName);
    res.send("user name changed successfully.");
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
