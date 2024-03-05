const express = require("express");
const userController = require("../controllers/user.controller");
const authenticateToken = require("../middlewares/auth");

const router = express.Router();
/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created
 *       500:
 *         description: Error creating user
 */
router.post("/signup", userController.signup);
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Authenticate a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */
router.post("/login", userController.login);
/**
 * @swagger
 * /api/users/refreshToken:
 *   post:
 *     summary: Refresh the authentication token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Authentication token refreshed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */
router.post("/refreshToken", userController.refreshToken);
router.get("/getUser", authenticateToken, userController.getUser);
router.get("/protected", authenticateToken, userController.protectedRoute);
module.exports = router;
