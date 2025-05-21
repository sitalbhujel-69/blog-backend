import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { createPost, deletePost, getPostById, getPosts, updatePost } from "../controllers/Post.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { toggleLike } from "../controllers/Like.controller.js";

const route = Router();

route.post('/create-post',upload.single('photo'),requireAuth,createPost)
route.get('/get-posts',getPosts)
route.get('/get-posts/:id',getPostById)
route.patch('/update-post/:id',upload.single('photo'),requireAuth,updatePost)
route.delete('/delete-post/:id',requireAuth,deletePost)
route.post('/like-post/:postId',requireAuth,toggleLike)

export default route