const jwt = require("jsonwebtoken");
const { userService } = require("../services");

const loginRequired = async (req, res, next) => {
  try {
    // 1) 토큰을 받아존재하는지 확인한다.
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "TOKEN_NOT_FOUND" });
    }
    // 2) 토큰을 확인하는 절차
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // 3) 유저가 여전히 존재하는가 확인한다.
    const user = await userService.getUserById(decodedToken.id);

    if (!user) {
      return res.status(404).json({ message: "USER_NOT_FOUND" });
    }

    // 4) 승인 절차
    req.user = user;
    next();
  } catch {
    const error = new Error("INVALID_ACCESS_TOKEN");
    error.statusCode = 401;

    return res.status(error.statusCode).json({ message: error.message });
  }
};

module.exports = { loginRequired };
