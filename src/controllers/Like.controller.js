import { Like } from "../models/Like.model.js";
import { Notification } from "../models/notification.model.js";
import { Post } from "../models/Post.model.js";

const toggleLike = async (req, res) => {
  const { postId } = req.params;
  const userId = req.user?._id;

  try {
    const alreadyLiked = await Like.findOne({ post: postId, user: userId });
    if (alreadyLiked) {
      await alreadyLiked.deleteOne();
      const totalLikes = await Like.countDocuments({ post: postId });
      return res.status(200).json({ Message: "unliked the post", totalLikes });
    }
    await Like.create({
      post: postId,
      user: userId,
    });
    const totalLikes = await Like.countDocuments({ post: postId });
    const posts = await Post.findById(postId);
    if(!posts){
      return res.status(404).json({message:"post doesnot exists"})
    }
    if(posts.owner === userId){
      return res.status(200).json({ message: "liked the post", totalLikes });
    }
    const notification = await Notification.create({
      type:"like",
      sender:userId,
      receiver:posts.owner,
      post:postId
    })

    return res.status(200).json({ message: "liked the post", totalLikes, notification });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong while liking the post!" });
  }
};

export { toggleLike };
