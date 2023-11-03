const postService = require('../services/postService');

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
    return res.status(201).json({ message: 'POST_CREATED', data: postId });
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
    const user = req.user;
    const posts = await postService.getMyPosts(user);
    return res.status(200).json({ data: posts });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const postId = req.params.postId;
    const result = await postService.getUserPosts(postId);
    return res.status(200).json({ data: result });
  } catch (error) {
    console.error(error);
    res
      .status(error.statusCode || 400)
      .json({ message: error.message || '400_BAD_REQUEST' });
  }
};

const likePostById = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  await postService.likePostById(postId, userId);
  return res.status(201).json({ message: 'LIKE_SUCCESS' });
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

const getTemporaryPost = async (req, res) => {
  try {
    const result = await postService.getTemporaryPost();
    return res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

const modifyPostById = async (req, res) => {
  const { title, content } = req.body;
  const { postId } = req.params;
  const userId = req.user.id;

  const modifydata = await postService.modifyPostById(
    title,
    content,
    userId,
    postId
  );
  return res.status(201).json({ data: modifydata });
};

const deletePost = async (req, res) => {
  const { postId } = req.body;
  const userId = req.user.id;

  await postService.deletePost(postId, userId);

  res.status(204).send();
};

const addComment = async (req, res) => {
  try {
    const { userId, postId, content } = req.body;
    await postService.addComment(userId, postId, content);
    return res.status(201).json({ message: 'COMMENT_CREATED' });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

const getComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const result = await postService.getComment(postId);
    return res.status(200).json({ data: result });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message });
  }
};

const uploadPostImage = async (req, res) => {
  try {
    const postId = req.body.postId;
    const image = req.file.location;

    if (!postId) {
      return res.status(400).json({ message: 'CANT_FIND_POST' });
    }

    await postService.uploadPostImage(postId, image);

    return res.status(200).json({ message: 'IMAGE_UPLOAD_SUCCESS' });
  } catch (err) {
    res.status(400).json({
      message: 'ERROR_UPLOADING_IMAGE',
    });
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
