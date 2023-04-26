function compareSkillsRatings(mentor1, mentor2) {
    let mentor1Ratings = 0;
    let mentor2Ratings = 0;
    mentor1.skills.forEach(skill => {
        mentor1Ratings += skill.rating;
    });
    mentor2.skills.forEach(skill => {
        mentor2Ratings += skill.rating;
    });
    let mentor1RatingsAvg = mentor1Ratings / (mentor1.skills.length * 5);
    let mentor2RatingsAvg = mentor2Ratings / (mentor2.skills.length * 5);
    if (mentor1RatingsAvg >= mentor2RatingsAvg) {
        return -1;
    }
    return 1
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