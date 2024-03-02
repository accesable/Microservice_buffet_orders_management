const {
  createOrder,
  getOrders,
  addDetailToOrder,
  updateOrderDetail,
  getOrderDetailsOnStatus,
  getOrderDetails,
} = require("../services/orderService");

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await getOrders();
    res.json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
};

exports.getAllOrderDetails = async (req, res) => {
  try {
    const orderDetails = await getOrderDetails();
    res.json(orderDetails);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching order details", error: error.message });
  }
};

exports.getOrdersByStatus = async (req, res) => {
  try {
    const orders = await getOrderDetailsOnStatus(req.params.status);
    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching orders by status",
      error: error.message,
    });
  }
};

exports.createNewOrder = async (req, res) => {
  try {
    const order_id = await createOrder(req.body); // Assuming createOrder function needs order data
    res.json({ message: `Order ${order_id} created` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
};

exports.appendDetailToOrder = async (req, res) => {
  try {
    const detail_id = await addDetailToOrder(req.body, req.params.orderId);
    res.json({
      message: `Detail ID ${detail_id} appended to order ${req.params.orderId}`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error appending detail to order",
      error: error.message,
    });
  }
};

exports.updateOrderDetailStatus = async (req, res) => {
  try {
    await updateOrderDetail(req.params.detailId, req.body); // Assuming updateOrderDetail needs detail ID and update data
    res.json({ message: `Detail ID ${req.params.detailId} status updated` });
  } catch (error) {
    res.status(500).json({
      message: "Error updating order detail status",
      error: error.message,
    });
  }
};
