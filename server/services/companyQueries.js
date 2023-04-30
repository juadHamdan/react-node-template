const Mentor = require("../models/Mentor");
const mongoose = require("mongoose");
const Company = require("../models/Company");
const User = require("../models/User")
const Meeting = require("../models/Meeting")

const getIdObject = (id) => {
  return new mongoose.Types.ObjectId(id);
};

function getCompanies() {
  return Company.find({});
}

async function addCompany(companyData) {
  const company = new Company(companyData)
  return company.save();
}

function getPendingUsers(companyID) {
  companyID = getIdObject(companyID)
  return User.find({ $and: [{ companyID: companyID }, { isPending: true }] })
}

// mentors and users 
function getCompanyUsers(companyID) {
  companyID = getIdObject(companyID)
  return User.find({ $and: [{ companyID: companyID }, { isPending: false }] })
}

async function getMentorsCompanyBySkill(skillName, companyID) {
  const mentors = await getCompanyMentors(companyID);
  let mentorsWithSkill = mentors.filter((mentor) => {
    return mentor.skills.some((skill) => {
      return skill.name.toLowerCase() === skillName.toLocaleLowerCase();
    });
  });
  return mentorsWithSkill;
}

async function getCompanyMentors(companyID) {
  let companyIDObj = getIdObject(companyID);
  let mentors = await Mentor.find({}).populate({
    path: 'user',
    match: { 'companyID': companyIDObj }
  }).populate({ path: "skills", model: "skill" })
  mentors = mentors.filter((mentor => mentor.user != null));
  return mentors;
}

function addUserToCompanyPending(companyID, userID) {
  companyID = getIdObject(companyID);
  return User.findByIdAndUpdate(userID, { companyID: companyID });
}

async function getMeetingsInCompany(companyID) {
  companyID = getIdObject(companyID);
  let meetings = await Meeting.find({  startDate: { $gte: new Date() } }).populate({
    path: 'mentor',
    match: { 'companyID': companyID }
  }).populate({ path: 'mentee', model: 'user' })
  meetings = meetings.filter((meeting => meeting.mentor != null))
  return meetings
}

module.exports = {
  getCompanies, addCompany, getPendingUsers, getCompanyUsers, getMentorsCompanyBySkill,
  getCompanyMentors, addUserToCompanyPending, getMeetingsInCompany
}