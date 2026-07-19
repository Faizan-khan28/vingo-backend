import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { createShop, getmyShop, getShopByCity } from "../controllers/shopController.js"
import {upload} from "../middlewares/multer.js"

const shopRouter = express.Router()

shopRouter.post("/create-edit",isAuth,upload.single("image"),createShop)
shopRouter.get("/get-myshop",isAuth,getmyShop)
shopRouter.get("/get-shopbycity/:city",isAuth,getShopByCity)

export default shopRouter;