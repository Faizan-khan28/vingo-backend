import User from "../models/user.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/token.js";

export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }

    if (password.length < 10) {
      res
        .status(400)
        .json({ message: "Password must be atleast 10 characters" });
    }

    if (mobile.length < 10) {
      res
        .status(400)
        .json({ message: "Mobile Number must be atleast 10 Digits" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      fullName,
      email,
      mobile,
      role,
      password: hashPassword,
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


export const signIn = async () => {
    try {
    const {email, password} = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User Does not exist" });
    }
    
    const isMatch = bcrypt.compare(password,user.password);
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
      .json({ message: "user sign succssesfully", user });
  } catch (error) {
    return res.status(500).json(`error occuring in signIn ${error}`);
  }
}