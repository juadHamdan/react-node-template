const Mentor = require("../models/Mentor");
const Skill = require("../models/Skill");
const User = require("../models/User");
const Meeting = require("../models/Meeting");
const mongoose = require("mongoose");

const getIdObject = (id) => {
  return new mongoose.Types.ObjectId(id);
};

function getMentors() {
  return Mentor.find({}).populate([
    { path: "skills" },
    { path: "user", select: "firstName lastName picture email position" },
  ]);
}

async function getMentorsBySkill(skillName) {
  const mentors = await getMentors();
  let mentorsWithSkill = mentors.filter((mentor) => {
    return mentor.skills.some((skill) => {
      return skill.name.toLowerCase() === skillName.toLocaleLowerCase();
    });
  });
  return mentorsWithSkill;
}

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

function getMentorsNames() {
  return Mentor.find({}).populate({
    path: "user",
    select: "firstName lastName",
  });
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

async function addMeeting(userID, title, startDate, endDate) {
  let userIdObject = getIdObject(userID);
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  let meeting = new Meeting({
    title,
    startDate,
    endDate,
    mentor: userIdObject,
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

async function bookMeeting(meetingID, menteeID) {
  let menteeIdObject = getIdObject(menteeID);
  await Meeting.findByIdAndUpdate(meetingID, { mentee: menteeIdObject });
}

async function updateUser(userId) {
  return User.findByIdAndUpdate(userId, { new: false });
}

module.exports = {
  getMentors,
  getMentorsBySkill,
  createMentor,
  getMentorByID,
  getMentorsNames,
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
  updateUser,
};
