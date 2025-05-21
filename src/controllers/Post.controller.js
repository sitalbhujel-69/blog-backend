import mongoose from "mongoose";
import { Post } from "../models/Post.model.js";

const createPost = async (req,res)=>{
  const {title,content} = req.body;
  const imagePath = null;
  if(req.file){
    imagePath = req.file.path
  }
  
  try {
    const post =await Post.create({
      title,
      content,
      Photo:imagePath,
      owner:req.user?._id
    })

    return res.status(201).json({message:"successfully created post",post})
  } catch (error) {
    console.error(error);
    return res.status(500).json({message:"Something went wrong!"})
  }
}

const getPosts = async (req,res)=>{
  try {
    const posts = await Post.aggregate([
      {
        $lookup:{
          from:"likes",
          localField:"_id",
          foreignField:"post",
          as:"likes"
        }
      },{
        $addFields:{
          likecount:{$size:"$likes"}
        }
      },{
        $project:{
          title:1,
          content:1,
          Photo:1,
          owner:1,
          likecount:1
        }
      }
    ])
    return res.status(200).json({message:"posts fetched successfully",posts})
  } catch (error) {
    console.error(error)
    return res.status(500).json({message:"something went wrong while fetching posts"})
  }
}

const getPostById = async (req,res)=>{
  const {id} = req.params;
  try {
    const posts = await Post.aggregate([
      {
        $match:{
          _id:new mongoose.Types.ObjectId(id)
        }
      }, 
      {
        $lookup:{
          from:"likes",
          localField:"_id",
          foreignField:"post",
          as:"likes"
        }
      },{
        $addFields:{
          likecount:{$size:"$likes"}
        }
      },{
        $project:{
          title:1,
          content:1,
          Photo:1,
          owner:1,
          likecount:1
        }
      }
    ])
    if(!posts.length){
      return res.status(404).json({message:"posts Not found"})
    }
    return res.status(200).json({message:"Post fetched successfully",posts})
  } catch (error) {
    console.error(error)
    return res.status(500).json({message:"something went wrong while fetching posts by particular id"})
  }
}

const updatePost = async (req,res)=>{
  const {id} = req.params;
   const {title,content} = req.body;
  const imagePath = null;
  if(req.file){
    imagePath = req.file.path
  }
  
  try {
    const posts = await Post.findByIdAndUpdate(id,{title,content,Photo:imagePath},{new:true})
    if(!posts){
      return res.status(404).json({message:"cant find the posts"})
    }
    return res.status(200).json({message:"successfully updated!",posts})
  } catch (error) {
        return res.status(500).json({message:"something went wrong while updating post"})

  }
}

const deletePost = async (req,res)=>{
  const {id} = req.params;
  try {
    const deletedpost = await Post.findByIdAndDelete(id);
    if(!deletedpost){
      return res.status(404).json({message:"post not found"})
    }
    return res.status(200).json({message:"successfully deleted!"})
  } catch (error) {
    return res.status(500).json({message:"something went wrong while deleting the post"})
  }
}
export {createPost,getPosts,getPostById,updatePost,deletePost}