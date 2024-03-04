const redis = require("redis");

// Configure Redis client connection
const redisClient = redis.createClient({
  host: "127.0.0.1",
  port: 6379,
  // include other options if necessary, like password, TLS, etc.
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

// Function to connect Redis
async function connectRedis() {
  try {
    await redisClient.connect();
    console.log("Redis client connected successfully");
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
    process.exit(1); // Exit in case of connection failure
  }
}

module.exports = { redisClient, connectRedis };
