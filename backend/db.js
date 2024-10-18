const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    clerkId: {type: String, unique: true},
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
})

const linkSchema = new Schema ({
    platform: String,
    link: String,
})

const userModel = mongoose.model ("user", userSchema)
const linkModel = mongoose.model("link", linkSchema)

module.exports = {
    userModel,
    linkModel
}