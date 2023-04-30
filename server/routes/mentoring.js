const express = require("express");
const router = express.Router();
const databaseQueries = require("../services/databaseQueries");

const { upload } = require("../middlewares/mutler");
const { createZoomMeeting } = require("../services/zoom-meeting")



router.post("/meetings/:userID", async (req, res) => {
        const userID = req.params.userID
        const title = req.body.title
        const startDate = req.body.startDate
        const endDate = req.body.endDate
        const colleagueID = req.body.colleagueId
  try {
    
    const mentor = await databaseQueries.getMentorByUserId(userID);
    console.log(mentor);
    let duration = (endDate - startDate) / 60000;
    const zoomLink = await createZoomMeeting(startDate, duration, title, mentor.email);
    const user = await databaseQueries.getUserByID(req.params.userID);
    if (user.isMentor) {
      let meetingID = await databaseQueries.addMeeting(
        userID,
        title,
        startDate,
        endDate,
        colleagueID,
        zoomLink
      );
      res.send(meetingID.toString());
    } else {
      res.send("This user is not a mentor");
    }
  } catch (error) {
    console.log(error);
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
   
      mentorMeetings = await databaseQueries.getMentorMeetings(userID);
      let mentorMeetingsAsMentee = await databaseQueries.getMenteeMeetings(userID);
      mentorMeetings.push(...mentorMeetingsAsMentee)
      console.log(mentorMeetings);
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
    
    res.send(mentorMeetings);
  } catch (error) {
    res.send(error);
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

router.get("/reviews/:mentorID", async (req, res) => {
  try {
    let reviews = await databaseQueries.getReviews(req.params.mentorID);
    reviews = reviews.map(review => {
      return {
        picture: review.mentee.picture,
        fullName: review.mentee.firstName + " " + review.mentee.lastName,
        rating: review.rating,
        description: review.description
      }
    })
    res.send(reviews)
  } catch (error) {
    console.log(error);
    res.send(error)
  }
})

router.post("/reviews/:meetingID", async (req, res) => {
  let rating = req.body.rating;
  let description = req.body.description;
  try {
    await databaseQueries.addReview(req.params.meetingID, rating, description);
    res.send("review added successfully.")
  } catch (error) {
    console.log(error);
    res.send(error)
  }
})


module.exports = router;
