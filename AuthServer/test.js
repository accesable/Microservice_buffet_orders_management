const bcrypt = require("bcryptjs");
const redisClient = require("./src/config/db/redisClient");
redisClient.setEx("key", 7 * 24 * 60 * 60 * 60, "My HAHA value");
