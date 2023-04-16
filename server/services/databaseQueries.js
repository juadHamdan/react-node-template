const Mentor = require("../models/Mentor")
const Skill = require("../models/Skill")
const User = require("../models/User")

function getMentors() {
    return Mentor.find({}).populate([{ path: 'skills' }, { path: 'user', select: 'firstName lastName picture email position' }]);
}

async function getMentorsBySkill(skillName) {
    const mentors = await getMentors();
    let mentorsWithSkill = mentors.filter(mentor => {
        return mentor.skills.some(skill => {
            return skill.name.toLowerCase() === skillName.toLocaleLowerCase()
        });
    })
    return mentorsWithSkill;
}

async function createMentor(userId, skills, workExperience, contactDetails) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
  
    const skillDocs = skills.map(skill => new Skill(skill));
    const savedSkills = await Promise.all(skillDocs.map(doc => doc.save()));
  
    const mentor = new Mentor({
      user,
      skills: savedSkills.map(doc => doc._id),
      workExperience,
      contactDetails
    });
  
    const result = await mentor.save();
    return result;
  }

module.exports = { getMentors, getMentorsBySkill , createMentor}