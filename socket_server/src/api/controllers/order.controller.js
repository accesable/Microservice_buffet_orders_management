const {
  createOrder,
  getOrders,
  addDetailToOrder,
  updateOrderDetail,
  getOrderDetailsOnStatus,
  getOrderDetails,
  addDetailsToOrder,
  getOrderById,
  updateOrderStatus,
  getOrdersByStatus,
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

exports.getOrdersByStatus = async (req, res) => {
  try {
    const orders = await getOrdersByStatus(req.params.status);
    res.json(orders);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching orders by status",
        error: error.message,
      });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    console.log("req.params.orderId", req.params.orderId);
    console.log("req.body.status", req.body.status);
    await updateOrderStatus(req.params.orderId, req.body.status);
    res.json({ message: `Order ${req.params.orderId} status updated` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating order status", error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await getOrderById(req.params.orderId);
    res.json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching order by ID", error: error.message });
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

exports.getOrderDetailsByStatus = async (req, res) => {
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
    const { tableId, numberOfPeople } = req.params;
    const order_id = await createOrder(
      parseInt(tableId),
      parseInt(numberOfPeople)
    ); // Assuming createOrder function needs order data
    res.json({ message: `Order ${order_id} created` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
};

exports.appendDetailToOrder = async (req, res) => {
  try {
    const { _id: detail_id } = await addDetailToOrder(
      req.body,
      req.params.orderId
    );
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

exports.appendDetailsToOrder = async (req, res) => {
  const { orderId } = req.params;
  const items = req.body; // This should be an array of items

  console.log("orderId", orderId);
  console.log("items", items);

  // Validate input
  if (!orderId || !Array.isArray(items) || items.length === 0) {
    return res.status(400).send({ message: "Invalid order ID or items" });
  }

  for (const item of items) {
    if (!item.itemId || !item.quantity || item.quantity < 1) {
      return res.status(400).send({ message: "Invalid item data" });
    }
  }
  try {
    // Call the addDetailsToOrder service function with the validated items and orderId
    const detailIds = await addDetailsToOrder(items, orderId);

    // If successful, send back the ids of the added order details
    res.send({
      message: "Order details added successfully",
      detailIds: detailIds,
    });
  } catch (error) {
    console.error("Error appending details to order:", error);
    // Handle any errors that occur during the process
    res.status(500).send({ message: "Failed to append details to order" });
  }
};
