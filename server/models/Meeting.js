const mongoose = require('mongoose')
const Schema = mongoose.Schema

const meetingSchema = new Schema({
    title: String,
    startDate: Date,
    endDate: Date,
    mentor: { type: Schema.Types.ObjectId, ref: "user" },
    mentee: { type: Schema.Types.ObjectId, ref: "user" },
    zoomLink: String,
    rating: { type: Number, min: 0, max: 5 },
    description: String
})

const Meeting = mongoose.model("meeting", meetingSchema)
module.exports = Meeting;