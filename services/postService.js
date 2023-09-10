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

const likePostById = async (postId, userId) => {
  return await postDao.likePostById(postId, userId);
};

const getLikePostByMe = async (postId, userId) => {
  return await postDao.getLikePostByMe(postId, userId);
};

const getTemporaryPost = async (postId, userId) => {
  return await postDao.getTemporaryPost(postId, userId);
};

const modifyPostById = async (title, content, userId, postId) => {
  return await postDao.modifyPostById(title, content, userId, postId);
};

const deletePost = async (postId, userId) => {
  return await postDao.deletePost(postId, userId);
};

const addComment = async (userId, postId, content) => {
  return await postDao.addComment(userId, postId, content);
};

const getComment = async (postId) => {
  try {
    const result = await postDao.getComment(postId);
    return result;
  } catch (err) {
    console.error("getComment Error:", err);
    throw new Error("DATABASE_ERROR");
  }
};

module.exports = {
  createPosts,
  getAllPosts,
  getMyPosts,
  getUserPosts,
  likePostById,
  getLikePostByMe,
  getTemporaryPost,
  modifyPostById,
  deletePost,
  addComment,
  getComment,
};
