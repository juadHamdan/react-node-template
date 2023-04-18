function compareSkillsRatings(mentor1, mentor2) {
    let mentor1Ratings = 0;
    let mentor2Ratings = 0;
    let skillLength = mentor1.skills.length > mentor2.skills.length ? mentor1.skills.length : mentor2.skills.length
    for (let i = 0; i < skillLength; i++) {
        mentor1Ratings += mentor1.skills[i]?.rating ? mentor1.skills[i].rating : 0;
        mentor2Ratings += mentor2.skills[i]?.rating ? mentor2.skills[i].rating : 0;
    }
    if (mentor1Ratings >= mentor2Ratings) {
        return -1;
    }
    return 1;
}

function compareSkillRating(mentor1, mentor2, skillName) {
    let mentor1SkillRating = mentor1.skills.find(skill => skill.name.toLowerCase() == skillName.toLowerCase()).rating;
    let mentor2SkillRating = mentor2.skills.find(skill => skill.name.toLowerCase() == skillName.toLowerCase()).rating;
    if (mentor1SkillRating >= mentor2SkillRating) {
        return -1;
    }
    return 1;
}

module.exports = { compareSkillsRatings, compareSkillRating };