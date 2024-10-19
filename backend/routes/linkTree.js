const express = require("express")
const { linkTreeModel } = require("../db")


const linkTreeRouter = express.Router()
 
linkTreeRouter.get("/getLinkTree", async function (req,res) {
    const {username} = req.body

    try {
        const result = await linkTreeModel.find({username})
        res.status(200).send(result);
    } catch (error) {
        console.log("Error", error)
        return res.status(500).json({message: "Internal Server Error"})
    }
})

linkTreeRouter.post("/createLinkTree", async function(req,res) {
    const {username, links} = req.body

    try {
        await linkTreeModel.create({username, userLinks: links})

        return res.status(201).json({message: "link tree created"})
    } catch (error) {
        console.log("Error", err)
        return res.status(500).json({message: "Internal Server Error"})
    }
})

module.exports = {linkTreeRouter: linkTreeRouter}