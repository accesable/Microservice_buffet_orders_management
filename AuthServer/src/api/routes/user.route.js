const express = require("express");
const userController = require("../controllers/user.controller");
const authenticateToken = require("../middlewares/auth");

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/getUser", authenticateToken, userController.getUser);
router.get("/protected", authenticateToken, userController.protectedRoute);

module.exports = router;
