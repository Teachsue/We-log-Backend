const userService = require("../services/userService");

const signUp = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    if (!name || !email || !password || !phoneNumber) {
      return res.status(400).json({ message: "SIGN_UP_ERROR" });
    }

    await userService.signUp(name, email, password, phoneNumber);

    return res.status(201).json({ message: "SIGNUP_SUCCESS" });
  } catch (error) {
    return res.status(error.statusCode || 400).json({ message: error.message });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const accessToken = await userService.signIn(email, password);

    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(error.statusCode || 400).json({ message: error.message });
  }
};

module.exports = {
  signUp,
  signIn,
};
