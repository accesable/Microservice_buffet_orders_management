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
    productId: orderDetail.productId,
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

module.exports = {
  createOrder,
  addDetailToOrder,
  getOrders,
  updateOrderDetail,
  getOrderDetailsOnStatus,
  getOrderDetails,
};
