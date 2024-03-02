const socket = require("socket.io");
const {
  createOrder,
  addDetailToOrder,
  updateOrderDetail,
} = require("../api/services/orderService");

const waiterRoom = "waiterRoom";
const chiefRoom = "chiefRoom";

const initializeMyWebSocket = (server) => {
  const io = socket(server);
  io.on("connection", (socket) => {
    socket.on("join", (role) => {
      if (role === "waiter") {
        socket.join(waiterRoom);
        console.log("waiter join");
      } else if (role === "chief") {
        socket.join(chiefRoom);
        console.log("Chief join");
      }
    });

    socket.on("new order", async () => {
      const order_id = await createOrder();
      console.log("create order from waiter: ", order_id);
      io.to(chiefRoom).emit("order for confirmation", order);
    });

    /**
     * detail = {
     *  "productId" : String
     *  "quantity" : Number
     *  "unitPrice" : Number
     *  "totalPrice" : Number
     *  "orderId" : String
     * }
     */
    socket.on("add detail", (detail) => {
      console.log("Received order detail from waiter: ", detail);
      addDetailToOrder(detail);
    });
    /**
     * order = {
     *  detail_id : String
     *  status : String
     * }
     */
    socket.on("confirm order", (order) => {
      console.log("Order confirmed by chief: ", order);
      updateOrderDetail(order);
      io.to(waiterRoom).emit("order confirmed", order);
    });
  });
};
module.exports = initializeMyWebSocket;
