const mongoose = require("mongoose");

const orderDetailSchema = new mongoose.Schema(
  {
    itemId: Number,
    itemName: String,
    quantity: Number,
    unitPrice: Number,
    totalPrice: Number,
    status: {
      type: String,
      enum: ["pending", "confirmed", "prepare", "in_serve", "declined", "out"],
      default: "pending", // Optional: set a default status
    },
    table: Number,
  },
  { timestamps: true }
);
module.exports = mongoose.model("OrderDetail", orderDetailSchema);
