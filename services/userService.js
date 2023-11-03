const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // 2. Json 포맷을 이용하여 사용자에 대한 속성을 저장하는 Claim 기반의 Web Token웹 표준으로써 두 개체에서 JSON 객체를 사용하여 정보를 안전성있게 전달한다.
// 왜 json? = 특정언어에 종속되지 않으며, 최소한의 용량으로 데이터 전송이 가능하기 떄문이다.

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
