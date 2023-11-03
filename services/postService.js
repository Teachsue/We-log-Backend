const postDao = require('../models/postDao');

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
  return await postDao.createPosts(
    userId,
    title,
    content,
    postImage,
    thumbnailImage,
    boardTypeId,
    tag,
    statusId
  );
};

const getAllPosts = async () => {
  return await postDao.getAllPosts();
};

const getMyPosts = async (user) => {
  const getMyPosts = await postDao.getMyPosts(user.id);
  return getMyPosts;
};

const getUserPosts = async (postId) => {
  return await postDao.getUserPosts(postId);
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
    console.error('getComment Error:', err);
    throw new Error('DATABASE_ERROR');
  }
};

const uploadPostImage = async (postId, image) => {
  try {
    return await postDao.uploadPostImage(postId, image);
  } catch (err) {
    throw new Error('COULD_NOT_PROCESS_REQUEST');
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
  uploadPostImage,
};
