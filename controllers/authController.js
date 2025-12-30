import User from "../models/user.js";
import bcrypt from "bcryptjs"
import genToken from "../utils/token.js";

const signUp = async (req , res) => {
    const {fullName , email, password ,mobile, role} = req.body;
    const user = await User.findOne({email})
    if(user) {
        return res.status(400).json({message : "User already exist"})
    }
    if(password.length < 10) {
        res.status(400).json({message : "Password must be atleast 10 characters"})
    }
    if(mobile.length < 10) {
        res.status(400).json({message : "Mobile Number must be atleast 10 Digits"})
    }
    
    const hashPassword = await bcrypt.hash(password,10);

    user = await User.create({
        fullName,
        email,
        mobile,
        role,
        password : hashPassword
        
    });

    const token = await genToken(user._id)
    res.cookie("token", token)
    
}