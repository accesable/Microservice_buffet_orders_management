require("dotenv").config();
const express = require("express");
const routes = require("./api/routes");
const sequelize = require("./config/db/database");
const { connectRedis } = require("./config/db/redisClient");
const app = express();
const port = process.env.PORT || 8086;

// Initiate Redis connection
connectRedis();
sequelize
  .sync()
  .then(() => {
    console.log("Database connected and models synced.");
  })
  .catch((error) => {
    console.error("Failed to sync database:", error);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Example app listening on: http://localhost:${port}`);
});
