const { linkModel, userModel } = require("../db")

async function createLink (req,res) {
    const {platform, link} = req.body
    const user = req.user

    if (!link.includes(platform) || !link) {
        return res.status(400).json({
            message: "Please check the url",
            success: false
        })
    }

    try {
        const findUser = await userModel.findOne({email: user.email})
        console.log(findUser)

        await linkModel.create({
            platform,
            link,
            creatorId: findUser._id
        })

        return res.status(201).json({
            message: "Added sucessfully",
            success: true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}

async function  getLinks (req,res) {
    const user = req.user
    console.log(user)
    try {
        const findUser = await userModel.findOne({email: user.email})
        
        const response = await linkModel.find({creatorId: findUser._id});

        const links = response.map(element => {
            return { platform: element.platform, link: element.link };
        });
       

        return res.status(200).json({
            message: "",
            links
        })

    } catch (error) {
        
    }
}

module.exports = {createLink, getLinks}