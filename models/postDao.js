const dataSource = require("./dataSource");

const createPosts = async (
  userId,
  title,
  content,
  postImage,
  thumbnailImage,
  boardTypeId,
  tag,
  postText,
  statusId
) => {
  try {
    return await dataSource.query(
      `INSERT INTO posts (
          user_id,
          title,
          content,
          post_image,
          thumbnail_image,
          boardType_id,
          tag,
          status_id
      ) VALUES (
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?
      )`,
      [
        userId,
        title,
        content,
        postImage,
        thumbnailImage,
        boardTypeId,
        tag,
        postText,
        statusId,
      ]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const getAllPosts = async (
  userId,
  title,
  content,
  thumbnailImage,
  statusId,
  createdAt
) => {
  try {
    return await dataSource.query(`
    SELECT 
    posts.thumbnail_image AS thumbnailImage,
    users.name AS userName,
    posts.title,
    posts.content,
    posts.status_id AS statusId,
    DATE_FORMAT(posts.created_at, '%Y.%m.%d') AS createdAt
FROM posts
INNER JOIN users ON posts.user_id = users.id;
      `);
  } catch (err) {
    const error = new Error("INVALID_DATA");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  createPosts,
  getAllPosts,
};
