const userService = require("../services/userService");

const signUp = async (req, res) => {
  try {
    const { name, email, passWord, phoneNumber } = req.body;

    if (!name || !email || !passWord || !phoneNumber) {
      return res.status(400).json({ message: "SIGN_UP_ERROR" });
    }

    await userService.signUp(name, email, passWord, phoneNumber);

    return res.status(201).json({ message: "SIGNUP_SUCCESS" });
  } catch (error) {
    return res.status(error.statusCode || 400).json({ message: error.message });
  }
};

module.exports = {
  signUp,
};
