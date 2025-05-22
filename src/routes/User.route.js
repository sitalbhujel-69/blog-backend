import { Router } from "express";
import { createNewPassword, forgotPassword, loginUser, logoutUser, registerUser, verifyOTP } from "../controllers/User.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const route = Router();

route.post('/register',registerUser);
route.post('/login', loginUser)
route.get('/logout',requireAuth,logoutUser)
route.post('/verify-otp',verifyOTP)
route.post('/forgot-password',forgotPassword)
route.post('/change-password',createNewPassword)


export default route 