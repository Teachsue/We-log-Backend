const postDao = require("../models/postDao");

const createPosts = async (
  userId,
  title,
  content,
  postImage,
  thumbnailImage,
  boardTypeId,
  tag,
  statusId
) => {
  const posting = await postDao.createPosts(
    userId,
    title,
    content,
    postImage,
    thumbnailImage,
    boardTypeId,
    tag,
    statusId
  );
  return posting;
};

const getAllPosts = async (req, res) => {
  const getAllPosts = await postDao.getAllPosts();
  return getAllPosts;
};
module.exports = {
  createPosts,
  getAllPosts,
};
