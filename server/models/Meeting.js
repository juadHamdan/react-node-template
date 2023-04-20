const mongoose = require('mongoose')
const Schema = mongoose.Schema

const meetingSchema = new Schema({
    title: String,
    startDate: Date,
    endDate: Date,
    mentor: { type: Schema.Types.ObjectId, ref: "user" },
    mentee: { type: Schema.Types.ObjectId, ref: "user" },
})

const Meeting = mongoose.model("meeting", meetingSchema)
module.exports = Meeting;