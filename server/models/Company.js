const mongoose = require('mongoose')
const Schema = mongoose.Schema

const companySchema = new Schema({
    name: String,
    workers: [{ type: Schema.Types.ObjectId, ref: "user" }],
    mentors: [{ type: Schema.Types.ObjectId, ref: "mentor" }],
    logo: String
})

const Company = mongoose.model("company", companySchema)
module.exports = Company