const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  created_at: Date,
  end_at: Date,
  orderdetails: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderDetail",
    },
  ],
});

module.exports = mongoose.model("Order", orderSchema);
