const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userDao = require("../models/userDao");

const hashPassword = async (plaintextPassword) => {
  const saltRounds = 10;

  return await bcrypt.hash(plaintextPassword, saltRounds);
};

const getUserById = async (id) => {
  return await userDao.getUserById(id);
};

const signUp = async (name, email, password, phoneNumber) => {
  const pwValidation = new RegExp(
    "^(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[a-z\\d@$!%*?&]{8,20}"
  );

  if (!pwValidation.test(password)) {
    const err = new Error("CHECK_PASSWORD");
    err.statusCode = 400;
    throw err;
  }

  const hashedPassword = await hashPassword(password);
  const createUser = await userDao.createUser(
    name,
    email,
    hashedPassword,
    phoneNumber
  );

  return createUser;
};

const signIn = async (email, password) => {
  const user = await userDao.getUserByEmail(email);
  console.log(user);

  if (!user) {
    const error = new Error("USER_IS_NOT_VALID");
    error.statusCode = 401;

    throw error;
  }

  const isMatched = await bcrypt.compare(password, user.password);
  console.log(isMatched);
  if (!isMatched) {
    const error = new Error("WRONG_PASSWORD");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    algorithm: process.env.ALGORITHM,
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

module.exports = {
  signUp,
  signIn,
  getUserById,
};
