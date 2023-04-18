const mongoose = require('mongoose')
const Schema = mongoose.Schema

const skillSchema = new Schema({
    name: String,
    rating: { type: Number, min: 0, max: 5 },
    experienceYears : String,
    lastTimeUsed: Number,
})

const Skill = mongoose.model("skill", skillSchema)
module.exports = Skill;
