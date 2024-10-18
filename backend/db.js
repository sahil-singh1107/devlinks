const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
})

const linkSchema = new Schema ({
    platform: String,
    link: String,
    creatorId: {type: Schema.Types.ObjectId, ref: "user"}
})

const userModel = mongoose.model ("user", userSchema)
const linkModel = mongoose.model("link", linkSchema)

module.exports = {
    userModel,
    linkModel
}