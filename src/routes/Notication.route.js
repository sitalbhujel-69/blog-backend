import { Router } from "express";
import { deleteNotification, getNotifications } from "../controllers/notification.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const route = Router();

route.get('/notifications',requireAuth,getNotifications)
route.delete('/notifications',requireAuth,deleteNotification)

export default route