const { linkModel } = require("../db")

async function createLink(req, res) {
    console.log(req.body);
    const { platform, link, clerkId } = req.body

    try {
        await linkModel.create({
            platform,
            link,
            clerkId
        })

        //console.log(res)

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

async function getLinks(req, res) {
    // Destructure clerkId from the request parameters
    const { clerkId } = req.body;

    console.log(clerkId); // Log the clerkId for debugging

    try {
        // Query the database for links associated with the clerkId
        const links = await linkModel.find({ clerkId });

        // If no links are found, respond with a 404 status
        // if (!links || links.length === 0) {
        //     return res.status(404).json({ message: "No links found for this clerk ID." });
        // }

        // Return the found links with a 200 status
        console.log(links)
        return res.send(links)
        
    } catch (error) {
        //console.error("Error fetching links:", error.message); // Log the error

        // Respond with a 500 status for server errors
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}


module.exports = { createLink, getLinks }