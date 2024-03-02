const mongoose = require("mongoose");

const orderDetailSchema = new mongoose.Schema(
  {
    productId: String,
    quantity: Number,
    unitPrice: Number,
    totalPrice: Number,
    status: {
      type: String,
      enum: ["pending", "confirmed", "declined", "out"],
      default: "pending", // Optional: set a default status
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("OrderDetail", orderDetailSchema);
