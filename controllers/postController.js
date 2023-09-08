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
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  createPosts,
};
