const express = require("express");
const userController = require("../controllers/user.controller");
const authenticateToken = require("../middlewares/auth");
const upload = require("../../config/multerConfig");

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
/**
 * @swagger
 * /api/users/updateUserProfilePicture/{userId}:
 *   put:
 *     summary: Updates a user's profile picture
 *     description: This endpoint updates the profile picture of a user.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *                 description: The profile picture file to upload.
 *     responses:
 *       200:
 *         description: User picture updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User picture updated
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     imageURL:
 *                       type: string
 *                       example: public/images/users/User-1.png
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.put(
  "/updateUserProfilePicture/:userId",
  [
    authenticateToken,
    (req, res, next) => {
      if (req.params.userId != req.user.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      next();
    },
    upload.single("profilePicture"),
  ],
  userController.updateUserPicture
);
module.exports = router;
