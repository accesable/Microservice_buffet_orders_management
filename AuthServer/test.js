const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

jwt.verify(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoidXNlcjEiLCJ0eXAiOiJyZWZyZXNoIiwiaWF0IjoxNzA5NTQxNzY0LCJleHAiOjE3MTAxNDY1NjR9.4Xv_g0ZpnqXY8QcgsZ6WYLB3Ehl5K5hx7xYGpZ_0AJg",
  "2e0d94835e4f76eff03f6bdff49e37f3c433719ffa27e4aba8e18266ef7c2d45"
);
