const mongoose = require('mongoose')
const Schema = mongoose.Schema

const skillSchema = new Schema({
    skill: String,
    rating: { type: Number, min: 0, max: 5 },
    gitHubLink: String,
    description: String,
    logo: String
})

const Skill = mongoose.model("skill", skillSchema)
module.exports = Skill;
