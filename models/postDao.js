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

const getMyPosts = async (userId) => {
  const results = await dataSource.query(
    `
  SELECT
  id AS postId,
  thumbnail_image AS thumbnailImage,
  title,
  content,
  DATE_FORMAT(posts.created_at, '%Y.%m.%d') AS createdAt
  FROM posts
  WHERE user_id = 1`,
    [userId]
  );
  return results;
};

const getUserPosts = async (postId, userId) => {
  const results = await dataSource.query(
    `
    SELECT
    posts.id AS postId,
    boardTypes.id AS boardTypeId,
    users.name AS userName,
    DATE_FORMAT(posts.created_at, '%Y.%m.%d') AS createdAt,
    posts.content AS content
    FROM posts
    INNER JOIN users ON posts.user_id = users.id
    INNER JOIN boardTypes ON posts.boardType_id = boardTypes.id
    WHERE posts.id = 1 AND users.id = 1`,
    [postId, userId]
  );
  return results;
};

const likePostById = async (postId, userId) => {
  try {
    const existingLike = await dataSource.query(
      `SELECT * FROM post_like WHERE post_id = ? AND user_id = ?`,
      [postId, userId]
    );

    if (existingLike.length > 0) {
      await dataSource.query(
        `DELETE FROM post_like WHERE post_id = ? AND user_id = ?`,
        [postId, userId]
      );
      return { message: "LIKE_CANCEL" };
    } else {
      await dataSource.query(
        `INSERT INTO post_like (user_id, post_id) VALUES (?, ?)`,
        [userId, postId]
      );
      return { message: "LIKE" };
    }
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  createPosts,
  getAllPosts,
  getMyPosts,
  getUserPosts,
  likePostById,
};
