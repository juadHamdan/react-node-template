const Mentor = require("../models/Mentor");
const Skill = require("../models/Skill");
const User = require("../models/User");
const Meeting = require("../models/Meeting");
const mongoose = require("mongoose");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

const getIdObject = (id) => {
  return new mongoose.Types.ObjectId(id);
};





async function createMentor(userId, skills, workExperience, contactDetails) {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  } else {
    user.isMentor = true;
    user.save();
  }
  const skillDocs = skills.map((skill) => new Skill(skill));
  const savedSkills = await Promise.all(skillDocs.map((doc) => doc.save()));
  const mentor = new Mentor({
    user,
    skills: savedSkills.map((skill) => skill._id),
    workExperience,
    contactDetails,
  });
  const result = await mentor.save();
  return result;
}

function getMentorByID(mentorID) {
  return Mentor.findById(mentorID).populate([
    { path: "skills" },
    { path: "user", select: "firstName lastName picture email position" },
  ]);
}

async function getCompanyMentorsNames(companyID) {
  let companyIDObj = getIdObject(companyID);
  let mentors = await Mentor.find({}).populate({
    path: "user",
    match: { 'companyID': companyIDObj },
    select: "firstName lastName",
  });
  mentors = mentors.filter((mentor => mentor.user != null));
  return mentors;
}

async function getUserByID(userID) {
  const user = await User.findById(userID);
  console.log(user);
  if (!user) {
    throw new Error("User not found");
  } else {
    return user;
  }
}

function deleteMentorByID(mentorID) {
  return Mentor.findOneAndDelete(mentorID).populate([
    { path: "skills" },
    { path: "user", select: "firstName lastName picture email position" },
  ]);
}

function deleteUserByID(userID) {
  return User.findOneAndDelete(userID);
}

function getMentorByUserId(userId) {
  return Mentor.findOne({ user: userId }).populate("skills user");
}

async function updateMentor(userId, updatedMentor) {
  const mentor = await getMentorByUserId(userId);
  return Mentor.findByIdAndUpdate(mentor._id, updatedMentor, { new: true });
}

function getUserByID(userID) {
  return User.findById(userID);
}

async function addMeeting(userID, title, startDate, endDate, colleagueId, zoomLink) {
  let userIdObject = getIdObject(userID);
  let menteeIdObject = getIdObject(colleagueId)
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  let meeting = new Meeting({
    title,
    startDate,
    endDate,
    mentor: userIdObject,
    mentee: menteeIdObject,
    zoomLink: zoomLink
  });
  meeting = await meeting.save();
  return meeting._id;
}

function deleteMeeting(meetingID) {
  return Meeting.findByIdAndDelete(meetingID);
}

function updateMeeting(meetingID, title, startDate, endDate) {
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  return Meeting.findByIdAndUpdate(meetingID, { title, startDate, endDate });
}

function getMentorMeetings(userID) {
  let userIdObject = getIdObject(userID);
  return Meeting.find({ mentor: userIdObject });
}

function getMenteeMeetings(userID) {
  let userIdObject = getIdObject(userID);
  return Meeting.find({ mentee: userIdObject });
}

async function bookMeeting(meetingID, menteeID, zoomLink) {
  let menteeIdObject = getIdObject(menteeID)
  await Meeting.findByIdAndUpdate(meetingID, { mentee: menteeIdObject, zoomLink: zoomLink })
}

async function updateUser(userId) {
  return User.findByIdAndUpdate(userId, { new: false });
}

async function cancelMeeting(meetingID, menteeID) {
  let menteeIdObject = getIdObject(menteeID);
  let meeting = await Meeting.findById(meetingID);
  if (meeting.mentee.equals(menteeIdObject)) {
    meeting.mentee = null;
    await meeting.save();
  } else {
    throw new Error('The provided mentee ID does not match the mentee for this meeting');
  }
}

function updatesUserPicture(userID, pictureURL) {
  return User.findOneAndUpdate({ _id: userID }, { picture: pictureURL });
}

async function deletePreviousPicture(userID) {
  const user = await User.findById(userID);
  try {
    let userCurrentProfilePicture = user.picture;
    let userCurrentProfilePicturePath =
      userCurrentProfilePicture.split("/images/")[1];
    let deleted = await unlinkAsync("images/" + userCurrentProfilePicturePath);
    return deleted;
  } catch (error) {
    console.log(error);
  }
}

async function changeUserName(userID, newFirstName, newLastName) {
  let updated = await User.findByIdAndUpdate(userID, {
    firstName: newFirstName,
    lastName: newLastName,
  });
  return updated;
}

function getMeetingById(meetingID) {
  return Meeting.findById(meetingID).populate("mentor");
}

async function checkIfMentee(meetingID, userID) {
  userID = getIdObject(userID);
  let meeting = await Meeting.findOne({
    $and: [{ _id: meetingID }, { mentee: userID }],
  });
  if (meeting) {
    return true;
  }
  return false;
}

async function getReviews(mentorID) {
  let mentor = await Mentor.findById(mentorID);
  let userID = mentor.user._id;
  return Meeting.find({ $and: [{ mentor: userID }, { description: { $exists: true } }] }).populate("mentee");
}

function addReview(meetingID, rating, description) {
  return Meeting.findByIdAndUpdate(meetingID, { rating: rating, description: description });
}

async function approveUser(userID) {
  return User.findByIdAndUpdate(userID, { isPending: false }, { new: true });
}


module.exports = {
  approveUser,
  createMentor,
  getMentorByID,
  getCompanyMentorsNames,
  addMeeting,
  getUserByID,
  deleteMeeting,
  updateMeeting,
  getMentorMeetings,
  getMenteeMeetings,
  bookMeeting,
  getMentorByUserId,
  updateMentor,
  deleteMentorByID,
  deleteUserByID,
  updatesUserPicture,
  deletePreviousPicture,
  changeUserName,
  checkIfMentee,
  cancelMeeting,
  updateUser,
  getMeetingById,
  getReviews,
  addReview,
}

