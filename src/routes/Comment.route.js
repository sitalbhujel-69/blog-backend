import { Router } from "express";
import { deleteComment, editComment } from "../controllers/Comment.controller.js";

const route = Router()

route.delete('/comments/:id',deleteComment)
route.patch('/comments/:id',editComment)

export default route