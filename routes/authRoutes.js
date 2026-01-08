import express from "express"
import { handleGoogleAuth, Login, logOut, Otpverify, resetPassword, sendOtp, signUp,} from "../controllers/authController.js"

const authRouter = express.Router()

authRouter.post("/signup",signUp)
authRouter.post("/login",Login)
authRouter.get("/logout",logOut)

// Forgot password routes
authRouter.post("/send-otp",sendOtp)
authRouter.post("/otp-verify",Otpverify)
authRouter.post("/reset-password",resetPassword)

// Google auth route
authRouter.post("/google-auth",handleGoogleAuth)

export default authRouter;