const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({ unauthorizedMessage: "No Token Founded" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ unauthorizedMessage: "Invalid Token" });
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
