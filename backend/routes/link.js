const express = require("express")

//const {ensureAuthenticated} = require("../middlewares/Auth")
const {createLink ,getLinks} = require("../controllers/linkController")

const linkRouter = express.Router()

function middleware (req,res,next) {
    console.log(req);
    next();
}

linkRouter.post("/createLink", createLink)
linkRouter.post("/getLinks", middleware, getLinks)


module.exports = {linkRouter: linkRouter}