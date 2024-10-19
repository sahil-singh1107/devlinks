const mongoose = require("mongoose")
const Schema = mongoose.Schema

const linkSchema = new Schema ({
    platform: String,
    link: String,
    clerkId: String
})

const linkTreeSchema = new Schema ({
    username: String,
    imageUrl: String,
    userLinks: [],
})

const linkModel = mongoose.model("link", linkSchema)
const linkTreeModel = mongoose.model("linkTree", linkTreeSchema)
module.exports = {
    linkModel,
    linkTreeModel
}