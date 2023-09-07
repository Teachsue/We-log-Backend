const dataSource = require("./dataSource");

const createUser = async function (name, email, passWord, phoneNumber) {
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
      [name, email, passWord, phoneNumber]
    );
    return result;
  } catch (error) {
    const err = new Error("INVALID_DATA_INPUT");
    error.statusCode = 400;
    throw err;
  }
};

module.exports = {
  createUser,
};
