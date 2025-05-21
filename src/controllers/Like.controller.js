import { Like } from "../models/Like.model.js";

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

    return res.status(200).json({ message: "liked the post", totalLikes });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong while liking the post!" });
  }
};

export { toggleLike };
