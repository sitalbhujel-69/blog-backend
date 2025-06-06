import { User } from "../models/User.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import { sendEmail } from "../utils/sendEmail.js";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const doExist = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (doExist) {
      return res.status(400).json("user already exists");
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const user = await User.create({
      username,
      email,
      password,
      otp,
      otpExpiry: Date.now() + 5 * 60 * 1000,
    });
    await sendEmail(
      email,
      otp,
      `\n\n your OTP is ${otp} \n\n It will expires in 5 minutes`
    );
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.otp) {
    return res.status(404).json({ message: "Invalid user or OTp" });
  }
  if (Date.now() > user.otpExpiry) {
    return res.status(400).json({ message: "Token expired" });
  }
  const isMatch = await bcrypt.compare(otp, user.otp);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid otp" });
  }

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();

  res.status(200).json({ message: "Account verified successfully!" });
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = generateToken(user);

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
      })
      .json({
        message: "Login successful",
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "something went wrong while logging in", error });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json(`logged out successfully`);
  } catch (error) {
    return res.status(401).json(`unauthorized!`);
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user =await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User with this email doesnot exists" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiry = Date.now() + 5*60*1000;
    await sendEmail(email,otp,`\n\nyour otp is ${otp}. it will expire in 5 minutes\n\n`)
    await user.save({validateBeforeSave:false})
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({message:'something went wrong while forgotting password'})
  }
};

const createNewPassword = async (req,res)=>{
  const {email,otp,newPassword,confirmPassword} = req.body;
  try {
    const user = await User.findOne({email});
    if(!user || !user.otp){
      return res.status(404).json({message:"Invalid User or token not found"})
    }
    if(Date.now()>user.otpExpiry){
      return res.status(400).json({message:'Token expired!'})
    }
    const isValid = await bcrypt.compare(otp,user.otp);
    if(!isValid){
      return res.status(401).json({message:"Wrong token"})
    }
    if(newPassword === confirmPassword){
     const user = await User.findOne();
     user.password = newPassword
     user.otp = undefined
     user.otpExpiry = undefined
     await user.save({validateBeforeSave:false});
      return res.status(200).json({message:"password changed!",data:user})
    }
    return res.status(400).json({message:"password doesnot match"})
  } catch (error) {
    console.error(error)
    return res.status(500).json({message:"Something went wrong while changing password"})
  }
}
export { registerUser, loginUser, logoutUser, verifyOTP,forgotPassword,createNewPassword };
