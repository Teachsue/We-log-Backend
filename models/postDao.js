const dataSource = require('./dataSource');

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
        statusId,
      ]
    );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
  }
};

const getAllPosts = async () => {
  try {
    return await dataSource.query(
      `
      SELECT 
        posts.id AS postId,
        posts.thumbnail_image AS thumbnailImage,
        posts.title,
        posts.content,
        users.name AS userName,
        DATE_FORMAT(posts.created_at, '%Y.%m.%d') AS createdAt,
        posts.status_id AS statusId,
        COUNT(DISTINCT post_like.id) AS likeCount,
        COUNT(DISTINCT comments.id) AS commentCount
      FROM posts
        JOIN users ON posts.user_id = users.id
        LEFT JOIN post_like ON posts.id = post_like.post_id
        LEFT JOIN comments ON posts.id = comments.post_id
      WHERE posts.status_id = 1 AND posts.boardType_id <> 2
      GROUP BY posts.id, posts.thumbnail_image, posts.title, posts.content, users.name, posts.created_at, posts.status_id
      `
    );
  } catch (err) {
    const error = new Error('INVALID_DATA');
    error.statusCode = 400;
    throw error;
  }
};

const getMyPosts = async (userId) => {
  try {
    const results = await dataSource.query(
      `
      SELECT
      posts.id AS postId,
      posts.thumbnail_image AS thumbnailImage,
      posts.title,
      posts.content,
      COUNT(DISTINCT post_like.id) AS likeCount,
      DATE_FORMAT(posts.created_at, '%Y.%m.%d') AS createdAt
    FROM 
      posts
      LEFT JOIN post_like ON posts.id = post_like.post_id
    WHERE 
      posts.user_id = ?
    GROUP BY
      posts.id,
      posts.thumbnail_image,
      posts.title,
      posts.content,
      posts.created_at
      `,
      [userId]
    );
    console.log(results);
    return results;
  } catch (error) {
    console.error('Error fetching my posts:', error);
    throw error; // 적절한 에러 응답을 반환하도록 수정
  }
};

const getUserPosts = async (postId) => {
  try {
    const posts = await dataSource.query(
      `
      SELECT
      posts.id AS postId,
      b.id AS boardTypeId,
      users.name AS userName,
      DATE_FORMAT(posts.created_at, '%Y.%m.%d') AS createdAt,
      posts.content AS content,
      posts.tag AS postTag,
      (SELECT COUNT(*) FROM comments WHERE post_id = ?) AS commentCount,
      COUNT(DISTINCT post_like.id) AS likeCount
      FROM posts
      INNER JOIN users ON posts.user_id = users.id
      INNER JOIN boardTypes AS b ON posts.boardType_id = b.id
      INNER JOIN post_like ON posts.id = post_like.post_id
      WHERE posts.id = ?`,
      [postId, postId]
    );
    //console.log(posts);
    posts.forEach((post) => {
      post['postTag'] = post['postTag'].split(',');
    });

    return posts;
  } catch {
    const error = new Error('DATASOURCE_ERROR');
    error.statusCode = 400;

    throw error;
  }
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
      return { message: 'LIKE_CANCEL' };
    } else {
      await dataSource.query(
        `INSERT INTO post_like (user_id, post_id) VALUES (?, ?)`,
        [userId, postId]
      );
      return { message: 'LIKE' };
    }
  } catch (err) {
    console.log(err);
    const error = new Error('INVALID_DATA_INPUT');
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
      WHERE post_like.user_id = ?`,
      [userId]
    );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
  }
};

const getTemporaryPost = async (postId, userId) => {
  try {
    const result = await dataSource.query(
      `
      SELECT
      posts.id AS postId,
      posts.thumbnail_image AS thumbnailImage,
      posts.title AS title,
      posts.content AS content,
      DATE_FORMAT(posts.created_at, '%Y.%m.%d') AS createdAt
      FROM posts
      INNER JOIN post_status ON posts.status_id = post_status.id
      WHERE post_status.id = ? AND posts.user_id = ?`,
      [2, userId]
    );
    console.log(result);
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
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
      WHERE posts.id = ? AND user_id = ?`,
      [title, content, postId, userId]
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
    const error = new Error('MODIFYING_ERROR');
    error.statusCode = 400;
    throw error;
  }
};

const deletePost = async (postId, userId) => {
  try {
    // Disable foreign key checks
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 0');

    // Check if the post exists
    const existingPost = await dataSource.query(
      'SELECT posts.id FROM posts WHERE posts.id = ? AND posts.user_id = ?',
      [postId, userId]
    );

    if (existingPost.length === 0) {
      // If the post does not exist, throw an error
      const error = new Error('Post not found');
      error.statusCode = 404;
      throw error;
    }

    // Delete the post
    const result = await dataSource.query(
      'DELETE FROM posts WHERE id = ? AND user_id = ?',
      [postId, userId]
    );

    const deletedRows = result.affectedRows;

    if (deletedRows !== 1) {
      // If the number of deleted rows is not 1, throw an error
      const error = new Error('Unexpected number of records deleted');
      error.statusCode = 400;
      throw error;
    }

    return { message: '게시글이 성공적으로 삭제되었습니다.' };
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  } finally {
    // Enable foreign key checks again
    await dataSource.query('SET FOREIGN_KEY_CHECKS = 1');
  }
};

const addComment = async (userId, postId, content) => {
  try {
    const result = await dataSource.query(
      `
        INSERT INTO comments (
          user_id,
          post_id,
          content
        ) VALUES (
          ?,
          ?,
          ?
        )
      `,
      [userId, postId, content]
    );

    return result;
  } catch {
    const error = new Error('dataSource Error');
    error.statusCode = 400;
    throw error;
  }
};

const getComment = async (postId) => {
  try {
    const result = await dataSource.query(
      `
      SELECT
      comments.user_id AS userId,
      users.name AS userName,
      DATE_FORMAT(comments.created_at, '%Y.%m.%d') AS createdAt,
      comments.content AS content
      FROM comments
      INNER JOIN users ON comments.user_id = users.id
      WHERE comments.post_id = ?
      `,
      [postId]
    );
    return result;
  } catch {
    const error = new Error('dataSource Error');
    error.statusCode = 400;
    throw error;
  }
};

const uploadPostImage = async (postId, image) => {
  try {
    // Update post image using a prepared statement
    const updateResult = await dataSource.query(
      'UPDATE posts SET post_image = ? WHERE id = ?',
      [image, postId]
    );

    if (updateResult.affectedRows !== 1) {
      throw new Error('INVALID_MODIFICATION');
    }

    // Retrieve modified image using a prepared statement
    const modifyImageResult = await dataSource.query(
      'SELECT id, post_image AS postImage FROM posts WHERE id = ?',
      [postId]
    );

    return modifyImageResult;
  } catch (error) {
    console.error('Error uploading post image:', error);
    throw new Error('INVALID_DATA');
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
