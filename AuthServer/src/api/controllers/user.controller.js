const userService = require("../services/user.service");

exports.signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    await userService.createUser(username, password);
    res.status(201).json({ message: "User Created" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const { token: accessToken, userId } = await userService.authenticateUser(
      username,
      password
    );
    const refreshToken = await userService.generateRefreshToken(
      userId,
      username
    );
    if (accessToken && refreshToken) {
      await userService.saveRefreshToken(userId, refreshToken);
      res.json({ accessToken, refreshToken });
    } else {
      res.status(401).send({ message: "Authentication failed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};

exports.getUser = async (req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

exports.protectedRoute = (req, res) => {
  res.send("This route is protected");
};
