import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { createShop } from "../controllers/shopController.js"

const shopRouter = express.Router()

shopRouter.post("create-edit",isAuth,createShop)

export default shopRouter;