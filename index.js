import express from "express";
import dotenv from "dotenv"
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoute.js";
import shopRouter from "./routes/createShopRoute.js";
import itemRouter from "./routes/itemRoute.js";
const app = express();
dotenv.config();

const PORT = process.env.PORT || 8003;

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
   origin : "http://localhost:5173",
   credentials : true,
   methods : "GET,POST,PUT,DELETE",
}))

// routes
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/shop",shopRouter)
app.use("/api/item",itemRouter)

app.listen(PORT, ()=> {
    connectDb();
    console.log(`server started at ${PORT}`)
})