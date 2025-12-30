import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import connectDb from "./config/db.js";
const app = express();
dotenv.config();

// middleware
app.use(express.json());

const PORT = process.env.PORT || 8000;



app.get("/", (req, res) => {
  res.send("Server running");
});


app.listen(PORT, ()=> {
    connectDb();
    console.log(`server started at ${PORT}`)
})