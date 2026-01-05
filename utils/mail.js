import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

const transporter = nodemailer.createTransport({
  host: "Gmail",
  port: 465,
  secure: true, // Use true for port 465, false for port 587
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export const sendOptMail = async (to,otp) => {
   await transporter.sendMail({
        from: process.env.EMAIL,
        to,
        subject: "Reset Your Password",
        html: `Your OTP for passwors is <b>${otp}<b/>. It expires in 5 Mins`
    })
};