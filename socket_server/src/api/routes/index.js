const express = require("express");
const router = express.Router();
// Import individual route modules
const orderRoutes = require("./orderRoutes");
const authenticateToken = require("../middlewares/auth");
// You can import more route modules here as your application grows

// Use the individual route modules
router.use("/orders", [authenticateToken], orderRoutes);
// Use more routes here as needed

module.exports = router;
