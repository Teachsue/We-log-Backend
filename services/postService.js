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

module.exports = {
  createPosts,
};
