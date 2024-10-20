const express = require("express")
const { linkTreeModel } = require("../db")


const linkTreeRouter = express.Router()
 
linkTreeRouter.post("/getLinkTree", async function (req,res) {
    const {username} = req.body

    try {
        const result = await linkTreeModel.find({username});
        //console.log(result[0])
        const data = [result[0].userLinks, result[0].imageUrl]
        //console.log(data);
        res.status(200).send(data);
    } catch (error) {
        console.log("Error", error)
        return res.status(500).json({message: "Internal Server Error"})
    }
})

linkTreeRouter.post("/createLinkTree", async function(req,res) {
    const {username, links, imageUrl, clerkId} = req.body

    if (!username || !links || !imageUrl || !clerkId) {
        return res.status(500);
    }

    try {
        await linkTreeModel.create({username, userLinks: links, imageUrl, clerkId})

        return res.status(201).json({message: "link tree created"})
    } catch (error) {
        console.log("Error", err)
        return res.status(500).json({message: "Internal Server Error"})
    }
})

linkTreeRouter.post("/getAllLinkTrees", async function(req,res) {
    const {clerkId} = req.body;

    try {
        const result = await linkTreeModel.find({clerkId});
        return res.status(200).send(result)
    } catch (error) {
        console.log("Error", error)
        return res.status(500).json({message: "Internal Server Error"})
    }
})

linkTreeRouter.post("/deleteLinkTree", async function (req,res) {
    const {clerkId, username} = req.body
    console.log(req.body);
    if (!clerkId) return res.status(500);

    try {   
        await linkTreeModel.deleteOne({clerkId, username})
        return res.status(200);
    } catch (error) {
        console.log(error)
        return res.status(500);
    }

    
})

module.exports = {linkTreeRouter: linkTreeRouter}