import User from "../models/user.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/token.js";
import { sendOptMail } from "../utils/mail.js";

export const signUp = async (req, res) => {
  try {
    const { fullName, email, mobile, password, role } = req.body;

    if(!fullName || !email || !mobile || !password || !role) {
      return res.status(400).json({message: "all fields are required"})
    }

    let user = await User.findOne({ email });


    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }

    if (password.length < 6) {
     return res
        .status(400)
        .json({ message: "Password must be atleast 6 characters or long" });
    }

    if (mobile.length < 10) {
     return res
        .status(400)
        .json({ message: "Mobile Number must be atleast 10 Digits" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      fullName,
      email,
      mobile,
      password: hashPassword,
      role,
    });

    const token = await genToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 60 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res
      .status(201)
      .json({ message: "user registered succussfully", user });
  } catch (error) {
    return res.status(500).json(`error occuring in signUp ${error}`);
  }
};


export const Login = async (req,res) => {
    try {
    const {email, password} = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User Does not exist" });
    }
    
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) {
        return res.status(400).json({message: "incorrect password"})
    }

    const token = await genToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 60 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res
      .status(200)
      .json({ message: "user Login succssesfully", user });
  } catch (error) {
    return res.status(500).json(`error occuring in Login ${error}`);
  }
}

export const logOut = async (req,res) => {
    try {
      res.clearCookie("token")
      return res.status(200).json({message: "Log Out succussfully"})
    } catch (error) {
      return res.status(500).json({message: "error Occuring in Log Out"})
    }
}

export const sendOtp = async (req,res) => {
    try {
      const {email} = req.body
      const user = await User.findOne({email})
      if(!user) {
        return res.status(400).json({message: "User does not exist"})
      }
      const otp = Math.floor(1000 + Math.random() * 9000).toString()
      user.otp = otp
      user.otpExpire = Date.now()+5*60*1000
      user.otpVerified = false
      await user.save()
      await sendOptMail(email,otp)
      return res.status(200).json({message: "otp sent succussfully"})
    } catch (error) {
      return res.status(500).json({message: `error in send otp ${error}`})
    }
}

export const Otpverify = async (req ,res) => {
    try {
      const {email,otp} = req.body;
      const user = await User.findOne({email});
      if(!user ||String(user.otp) != String(otp) || user.otpExpire<Date.now()) {
        return res.status(400).json({message: "invalid/expired otp"})
      }
      user.otpVerified = true
      user.otp = undefined
      user.otpExpire = undefined
      await user.save()
      return res.status(200).json({message: "otp verified succussfully"})
    } catch (error) {
      return res.status(500).json({message: `error in otp verify ${error}`})
    }
}

export const resetPassword = async (req,res) => {
  try {
    const {email,newPassword} = req.body;
    const user = await User.findOne({email})
    if(!user || !user.otpVerified) {
      return res.status(400).json({message: "Otp verification required"})
    }
    const hashedPassword = await bcrypt.hash(newPassword,10)
    user.password = hashedPassword
    user.otpVerified = false
    await user.save()
    return res.status(200).json({message: "Password reset succussfull"})
  } catch (error) {
    return res.status(500).json({message: `error in reset password ${error}`})
  }
}

export const handleGoogleAuth = async (req,res) => {
  try {
  const {fullName,email,mobile,role} = req.body;
  let user = await User.findOne({email});
  if(!user) {
    user = await User.create({
      fullName,email,mobile,role
    })
  }

   const token = await genToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 60 * 60 * 60 * 1000,
      httpOnly: true,
    });

  return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(`error in googleAuthntication ${error}`)
  }
}