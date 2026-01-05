import express from "express"
import { Login, logOut, otpSend, resetPassword, signUp, verifyOtp } from "../controllers/authController.js"

const authRouter = express.Router()

authRouter.post("/signup",signUp)
authRouter.post("/login",Login)
authRouter.get("/logout",logOut)

// Forgot password routes
authRouter.post("/otp-send",otpSend)
authRouter.post("/verify-otp",verifyOtp)
authRouter.post("/reset-password",resetPassword)

export default authRouter;