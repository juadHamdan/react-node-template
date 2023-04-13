const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactDetailsSchema = new Schema({
    phoneNumber: String,
    linkedIn: String,
    gitHub: String
})

const mentorSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "user" },
    skills: [{ type: Schema.Types.ObjectId, ref: "skill" }],
    workExperience: String,
    contactDetails: contactDetailsSchema
})

const Mentor = mongoose.model("mentor", mentorSchema)
module.exports = Mentor;