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

module.exports = {
  createPosts,
};
