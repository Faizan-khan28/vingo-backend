import express from "express"
import { logOut, signIn, signUp } from "../controllers/authController.js"

const authRouter = express.Router()

authRouter.post("/signup",signUp)
authRouter.post("/login",signIn)
authRouter.get("/logout",logOut)

export default authRouter;