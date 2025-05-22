import { Comment } from "../models/Comment.model.js";

const postComment = async (req,res)=>{
  const {postId} = req.params;
  const userId = req.user?._id
  const {textComment} = req.body;
  
  try {
    const comment = await Comment.create({textComment,
      user:userId,
      post:postId
    })
    return res.status(200).json({message:"successfully commented!",comment})
  } catch (error) {
    return res.status(500).json({message:"something went wrong while trying to comment"})
  }
}

const getComment = async (req,res)=>{
  const {postId} = req.params;

  try {
    const comments = await Comment.find({post:postId})
    if(!comments){
      return res.status(404).json({message:"post not found"})
    }
    return res.status(200).json({message:"comments fetched successfully",comments})
  } catch (error) {
    return res.status(500).json({message:"something went wrong while fetching the posts"})
  }
}

const deleteComment = async (req,res)=>{
  const {id} = req.params;
  try {
    const comments = await Comment.findByIdAndDelete(id)
    if(!comments){
      return res.status(404).json({message:"comment doesnot exists!"})
    }
    return res.status(200).json({message:"comment deleted successfully"});
  } catch (error) {
    return res.status(500).json({message:"something went wrong while deleting the comment"})
  }
}

const editComment = async (req,res)=>{
  const {id} = req.params;
  const {textComment} = req.body
  try {
    const edit =  await Comment.findByIdAndUpdate(id,{textComment},{new:true})
    if(!edit){
      return res.status(404).json({message:"Comment does not exists"})
    }
    return res.status(200).json({message:"edited successfully",edit})
  } catch (error) {
    console.error(error)
    return res.status(500).json({message:"something went wrong while editing comment!"})
  }
}
export {postComment,getComment,deleteComment,editComment}