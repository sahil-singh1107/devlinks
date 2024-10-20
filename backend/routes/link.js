const express = require("express")

//const {ensureAuthenticated} = require("../middlewares/Auth")
const {createLink ,getLinks} = require("../controllers/linkController");
const { linkModel } = require("../db");

const linkRouter = express.Router()

function middleware (req,res,next) {
    //console.log(req);
    next();
}

linkRouter.post("/createLink", createLink)
linkRouter.post("/getLinks", middleware, getLinks)
linkRouter.post("/deleteLink", async function (req,res) {
    const {link} = req.body
    try {
        await linkModel.deleteOne({link})
        return res.status(200);
    } catch (error) {
        console.log(error)
        return res.status(500)
    }
})


module.exports = {linkRouter: linkRouter}