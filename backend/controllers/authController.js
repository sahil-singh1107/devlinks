const { userModel } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "User already exists, you can login", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await userModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });

        return res.status(201).json({
            message: "Signup successful",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: "Auth failed", success: false });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).json({ message: "Auth failed", success: false });
        }

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "24h" });

        return res.status(200).json({
            message: "Login successful",
            success: true,
            token,
            email,
            name: { firstName: user.firstName, lastName: user.lastName }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

module.exports = {
    signup,
    login
};
