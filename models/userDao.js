const dataSource = require("./dataSource");

const createUser = async function (name, email, hashedPassword, phoneNumber) {
  try {
    const result = await dataSource.query(
      `INSERT INTO
        users(
            name,
            email,
            password,
            phone_number
        ) VALUES (?, ?, ?, ?);
        `,
      [name, email, hashedPassword, phoneNumber]
    );
    return result;
  } catch (error) {
    const err = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw err;
  }
};

const getUserByEmail = async (email) => {
  try {
    const [result] = await dataSource.query(
      `
      SELECT 
        id, 
        name,
        email, 
        password
      FROM users
      where email = ?
      `,
      [email]
    );

    return result;
  } catch (err) {
    const error = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const [result] = await dataSource.query(
      `
        SELECT
          id,
          name,
          email,
          password
          FROM users
          WHERE id = ?
      `,
      [id]
    );

    return result;
  } catch (err) {
    const error = new Error("dataSource Error");
    error.statusCode = 400;

    throw error;
  }
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
};
