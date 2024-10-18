const express = require("express")

const {ensureAuthenticated} = require("../middlewares/Auth")
const {createLink, getLinks} = require("../controllers/linkController")

const linkRouter = express.Router()

linkRouter.post("/createLink", ensureAuthenticated, createLink)
linkRouter.post("/getLinks", ensureAuthenticated, getLinks)


module.exports = {linkRouter: linkRouter}