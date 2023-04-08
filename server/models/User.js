const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    uid: String,
    firstName: String, 
    lastName: String,
    email: String,
    picture: String
})

/*
String – mapped to javascript String
Number – mapped to javascript Number
Boolean - mapped to javascript Boolean
Array – mapped to javascript Array(object)
Date – mapped to javascript object (date object)
ObjectId | Oid – mapped to javascript object
Mixed – mapped to javascript object
*/

const User = mongoose.model("user", userSchema)
module.exports = User