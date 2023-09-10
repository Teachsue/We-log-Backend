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

const getLikePostByMe = async (postId, userId) => {
  try {
    return await dataSource.query(
      `
      SELECT
      posts.id AS postId,
      posts.thumbnail_image AS thumbnailImage,
      posts.title AS title,
      posts.content AS content,
      DATE_FORMAT(posts.created_at, '%Y.%m.%d') AS createdAt
      FROM posts
      INNER JOIN post_like ON posts.id = post_like.post_id
      WHERE post_like.user_id = 1`,
      [userId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const getTemporaryPost = async (postId, userId) => {
  try {
    return await dataSource.query(
      `
      SELECT
      posts.id AS postId,
      posts.thumbnail_image AS thumbnailImage,
      posts.title AS title,
      posts.content AS content,
      DATE_FORMAT(posts.created_at, '%Y.%m.%d') AS createdAt
      FROM posts
      INNER JOIN post_status ON posts.status_id = post_status.id
      WHERE post_status.id = 2`,
      [userId]
    );
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const modifyPostById = async (title, content, userId, postId) => {
  try {
    await dataSource.query(
      `
      UPDATE posts
      SET title = ?,
      content = ?
      WHERE user_id = ? AND id = ?`,
      [title, content, userId, postId]
    );

    const modifyPostResult = await dataSource.query(
      `
      SELECT
      posts.title AS title,
      posts.id AS postId,
      boardTypes.id AS boardTypeId,
      users.name AS userName,
      DATE_FORMAT(posts.created_at, '%Y.%m.%d') AS createdAt,
      posts.content AS content
      FROM posts
      INNER JOIN users ON posts.user_id = users.id
      INNER JOIN boardTypes ON posts.boardType_id = boardTypes.id
      WHERE posts.id = ? AND users.id = ?`,
      [postId, userId]
    );

    return modifyPostResult;
  } catch (err) {
    const error = new Error("MODIFYING_ERROR");
    error.statusCode = 400;
    throw error;
  }
};

const deletePost = async (postId, userId) => {
  try {
    await dataSource.query(
      `
      DELETE
      FROM posts
      WHERE id = 1 AND user_id = 1`,
      [postId, userId]
    );
  } catch {
    const error = new Error("DATA_ERROR");
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
  getLikePostByMe,
  getTemporaryPost,
  modifyPostById,
  deletePost,
};
