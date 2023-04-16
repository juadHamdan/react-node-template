const Mentor = require("../models/Mentor")
const Skill = require("../models/Skill")

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


module.exports = { getMentors, getMentorsBySkill }