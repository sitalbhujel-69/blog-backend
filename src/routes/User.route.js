import { Router } from "express";
import { loginUser, logoutUser, registerUser, verifyOTP } from "../controllers/User.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const route = Router();

route.post('/register',registerUser);
route.post('/login', loginUser)
route.get('/logout',requireAuth,logoutUser)
route.post('/verify-otp',verifyOTP)


export default route 