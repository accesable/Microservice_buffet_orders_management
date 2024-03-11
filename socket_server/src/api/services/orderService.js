const Order = require("../../models/order");
const OrderDetail = require("../../models/orderdetail");

const createOrder = async () => {
  const order = new Order({
    created_at: Date.now(),
    end_at: null,
    orderdetails: [],
  });
  const { _id: order_id } = await order.save();
  return order_id;
};

const getOrderDetails = async () => {
  const reval = await OrderDetail.find({});
  return reval;
};
const getOrders = async () => {
  return Order.find({}).populate("orderdetails");
};

const getOrderDetailsOnStatus = async (status) => {
  return OrderDetail.find({ status: status }).sort({ createAt: -1 });
};

const addDetailToOrder = async (orderDetail, orderId) => {
  const detail = new OrderDetail({
    itemId: orderDetail.itemId,
    quantity: orderDetail.quantity,
    unitPrice: orderDetail.unitPrice,
    totalPrice: orderDetail.totalPrice,
  });
  const { _id: detail_id } = await detail.save();
  await Order.findByIdAndUpdate(orderId, {
    $push: { orderdetails: detail_id },
  });
  return detail_id;
};

const updateOrderDetail = async (detailId, orderDetailUpdateRequest) => {
  await OrderDetail.findByIdAndUpdate(detailId, {
    status: orderDetailUpdateRequest.status,
  });
};
const addDetailsToOrder = async (orderDetails, orderId) => {
  try {
    // Array to hold the ids of the saved order details
    const detailIds = [];

    // Loop through each orderDetail item in the array
    for (const orderDetail of orderDetails) {
      const detail = new OrderDetail({
        itemId: orderDetail.itemId,
        quantity: orderDetail.quantity,
        unitPrice: orderDetail.unitPrice,
        totalPrice: orderDetail.totalPrice,
      });

      // Save the OrderDetail document
      const savedDetail = await detail.save();

      // Push the saved detail's id into the detailIds array
      detailIds.push(savedDetail._id);
    }

    // Once all OrderDetail items are processed and saved,
    // update the Order document by pushing all detailIds into the orderdetails array
    await Order.findByIdAndUpdate(orderId, {
      $push: { orderdetails: { $each: detailIds } },
    });

    // Return the ids of the added order details
    return detailIds;
  } catch (error) {
    // Handle any errors that occur during the process
    throw error;
  }
};

module.exports = {
  createOrder,
  addDetailToOrder,
  getOrders,
  updateOrderDetail,
  getOrderDetailsOnStatus,
  getOrderDetails,
  addDetailsToOrder,
};
