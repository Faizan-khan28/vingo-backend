import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { createShop, getmyShop } from "../controllers/shopController.js"
import upload from "../middlewares/multer.js"

const shopRouter = express.Router()

shopRouter.post("create-edit",isAuth,upload.singe("image"),createShop)
shopRouter.post("get-myshop",isAuth,upload.singe("image"),getmyShop)

export default shopRouter;