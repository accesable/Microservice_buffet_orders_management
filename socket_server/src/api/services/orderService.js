const Order = require("../../models/order");
const orderdetail = require("../../models/orderdetail");
const OrderDetail = require("../../models/orderdetail");

const createOrder = async (tableId, numberOfPeople) => {
  const order = new Order({
    created_at: Date.now(),
    end_at: null,
    orderdetails: [],
    table: tableId,
    numberOfPeople: numberOfPeople,
  });
  const { _id: order_id } = await order.save();
  return order_id;
};

const getOrdersByStatus = async (status) => {
  return Order.find({ currentStatus: status }).populate("orderdetails");
};

const updateOrderStatus = async (orderId, status) => {
  // Update the order status
  await Order.findByIdAndUpdate(orderId, { currentStatus: status });

  // Check if the status is "finished"
  if (status === "finished") {
    // Find the order details associated with the order
    const orderDetails = await OrderDetail.find({
      orderId: orderId,
      status: "declined",
    });

    // Update the status of order details to "payed"
    await Promise.all(
      orderDetails.map(async (orderDetail) => {
        orderDetail.status = "out";
        await orderDetail.save();
      })
    );
  }
};

const getOrderById = async (orderId) => {
  const order = await Order.findById(orderId);
  return order;
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
  if (orderId === undefined) {
    if (orderDetail.orderId === undefined) {
      throw new Error("No orderId found");
    }
    orderId = orderDetail.orderId;
  }
  const detail = new OrderDetail({
    itemId: orderDetail.itemId,
    quantity: orderDetail.quantity,
    unitPrice: orderDetail.unitPrice,
    totalPrice: orderDetail.totalPrice,
  });
  const addedDetail = await detail.save();
  await Order.findByIdAndUpdate(orderId, {
    $push: { orderdetails: addedDetail._id },
  });
  return addedDetail;
};

const updateOrderDetail = async (detailId, orderDetailUpdateRequest) => {
  await OrderDetail.findByIdAndUpdate(detailId, {
    status: orderDetailUpdateRequest.status,
  });
};
const addDetailsToOrder = async (orderDetails, orderId) => {
  if (orderId === undefined) {
    if (orderDetails[0].orderId === undefined) {
      throw new Error("No orderId found");
    }
    orderId = orderDetails[0].orderId;
  }
  const { table } = await getOrderById(orderId);
  try {
    // Array to hold the ids of the saved order details
    const detailIds = [];
    const redetails = [];

    // Loop through each orderDetail item in the array
    for (const orderDetail of orderDetails) {
      const detail = new OrderDetail({
        itemId: orderDetail.itemId,
        itemName: orderDetail.itemName,
        quantity: orderDetail.quantity,
        unitPrice: orderDetail.unitPrice,
        totalPrice: orderDetail.totalPrice,
        orderId: orderId,
        table: table,
      });

      // Save the OrderDetail document
      const savedDetail = await detail.save();

      // Push the saved detail's id into the detailIds array
      detailIds.push(savedDetail._id);
      redetails.push(savedDetail);
    }

    // Once all OrderDetail items are processed and saved,
    // update the Order document by pushing all detailIds into the orderdetails array
    await Order.findByIdAndUpdate(orderId, {
      $push: { orderdetails: { $each: detailIds } },
    });

    // Return the ids of the added order details
    return redetails;
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
  getOrderById,
  updateOrderStatus,
  getOrdersByStatus,
};
