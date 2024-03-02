require("dotenv").config();
const express = require("express");
const path = require("path");
const initializeMyWebSocket = require("./websocket/websocket");
const bodyParser = require("body-parser");
const connectDB = require("./db/database");
const routes = require("./api/routes");
const cros = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
connectDB();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
const PORT = process.env.PORT || 8081;
const corsOptions = {
  origin: "http://localhost:5173",
};
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API with Swagger",
    version: "1.0.0",
  },
};
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ["./src/api/routes/*.js"],
};
const swaggerSpec = swaggerJsdoc(options);

app.use(express.static("public"));
// with this middleware the public folder is define within the same directory as the server.js file

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cros(corsOptions));
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", routes);

const httpServer = app.listen(PORT, () =>
  console.log("Server start Successfully at : http://localhost:" + PORT)
);

initializeMyWebSocket(httpServer);
