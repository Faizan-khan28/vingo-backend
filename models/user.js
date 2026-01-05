import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    
    mobile : {
        type : String,
        required : true
    },
    password : {
        type : String,
    },
    role : {
        type : String,
        enum : ["user","owner","deliveryBoy"],
        required : true
    },
    otp : {
        type : String
    },
    otpVerified : {
        type : Boolean,
        default : false
    },
    otpExpire : {
        type : Date
    }
},{timestamps : true})

const User = mongoose.model("User",userSchema)

export default User;