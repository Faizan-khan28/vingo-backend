import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
const app = express();
dotenv.config();

// middleware
app.use(express.json());

const PORT = process.env.PORT || 8000;
const DB_URL = process.env.MONGODB_URL;


// data base connection 
try {
    await mongoose.connect(DB_URL)
    console.log("connected to MongoDB")
} catch (error) {
    console.log(error)
}

app.get("/", (req, res) => {
  res.send("Server running");
});


app.listen(PORT, ()=> {
    console.log(`server started at ${PORT}`)
})