const postService = require("../services/postService");

const createPosts = async (req, res) => {
  try {
    const {
      userId,
      title,
      content,
      postImage,
      thumbnailImage,
      boardTypeId,
      tag,
      statusId,
    } = req.body;
    await postService.createPosts(
      userId,
      title,
      content,
      postImage,
      thumbnailImage,
      boardTypeId,
      tag,
      statusId
    );
    return res.status(201).json({ message: "POST_CREATED" });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const result = await postService.getAllPosts();
    return res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

const getMyPosts = async (req, res) => {
  try {
    const result = await postService.getMyPosts();
    return res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const result = await postService.getUserPosts();
    return res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

const likePostById = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  await postService.likePostById(postId, userId);
  return res.status(201).json({ message: "LIKE_SUCCESS" });
};

const getLikePostByMe = async (req, res) => {
  try {
    const result = await postService.getLikePostByMe();
    return res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

module.exports = {
  createPosts,
  getAllPosts,
  getMyPosts,
  getUserPosts,
  likePostById,
  getLikePostByMe,
};
