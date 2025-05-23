import { Router } from "express";
import { deleteComment, editComment } from "../controllers/Comment.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const route = Router()

route.delete('/comments/:id',requireAuth,deleteComment)
route.patch('/comments/:id',requireAuth,editComment)

export default route