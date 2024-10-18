const express = require("express")

const {signup , login} = require("../controllers/authController")

const {signupValidation, loginValidation} = require("../middlewares/AuthValidation")

const userRouter = express.Router()

userRouter.post("/signup", signupValidation, signup) 

userRouter.post("/signin",loginValidation, login)

module.exports = {userRouter: userRouter} 