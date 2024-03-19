const socket = require("socket.io");
const {
  createOrder,
  addDetailToOrder,
  updateOrderDetail,
  addDetailsToOrder,
} = require("../api/services/orderService");

const waiterRoom = "waiterRoom";
const chiefRoom = "chiefRoom";

const initializeMyWebSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });
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
    // socket.on("new order", async (data) => {
    //   const { tableId, numberOfPeople } = data;
    //   const order_id = await createOrder(
    //     parseInt(tableId),
    //     parseInt(numberOfPeople)
    //   );
    //   console.log("create order from waiter: ", order_id);
    //   io.to(chiefRoom).emit("order for confirmation",  );
    // });

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
    socket.on("add details", async (details) => {
      const { orderId, listDetails } = details;
      const appendDetails = await addDetailsToOrder(listDetails, orderId);
      console.log("appendDetails", appendDetails);
      socket.emit("incomming orders", appendDetails);
      io.to(chiefRoom).emit("incomming orders", appendDetails);
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
