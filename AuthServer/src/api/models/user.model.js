const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../../config/db/database");
const bcrypt = require("bcryptjs");
const Role = require("./role.model");
// Define the User model
const User = sequelize.define(
  "users",
  {
    // Model attributes are defined here
    id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    // Other model options go here
    tableName: "users",
  }
);


module.exports = User;
