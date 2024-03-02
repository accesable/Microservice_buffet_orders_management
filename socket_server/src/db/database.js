require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  const connectionString = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`;

  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

// Error handling
mongoose.connection.on("error", (error) => {
  console.error("Database connection error:", error);
});

module.exports = connectDB;
