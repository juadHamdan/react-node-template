const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({                   
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    picture: String,
    position: String,
    companyID: { type: Schema.Types.ObjectId, ref: "company" },
    isMentor : Boolean,
    isPending: Boolean
})

const User = mongoose.model("user", userSchema)
module.exports = User

