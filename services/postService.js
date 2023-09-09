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

const getMyPosts = async (userId) => {
  const getMyPosts = await postDao.getMyPosts(userId);
  return getMyPosts;
};

const getUserPosts = async (userId) => {
  const getUserPosts = await postDao.getUserPosts(userId);
  return getUserPosts;
};

module.exports = {
  createPosts,
  getAllPosts,
  getMyPosts,
  getUserPosts,
};
