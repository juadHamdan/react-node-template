function compareRatings(mentor1, mentor2) {
    let mentor1Ratings = 0;
    let mentor2Ratings = 0;
    for (let i = 0; i < mentor1.skills.length; i++) {
        mentor1Ratings += mentor1.skills[i].rating;
        mentor2Ratings += mentor2.skills[i].rating;
    }
    if (mentor1Ratings >= mentor2Ratings) {
        return -1;
    }
    return 1;
}

module.exports = { compareRatings };