const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  getOrdersByStatus,
  createNewOrder,
  appendDetailToOrder,
  updateOrderDetailStatus,
  getAllOrderDetails,
} = require("../controllers/order.controller");

router.get("/", getAllOrders);
// Route for fetching orders by status
router.get("/orderdetails", getAllOrderDetails);
// Route for creating a new order
router.post("/create-order", createNewOrder);
// Route for fetching orders by status
router.get("/:status", getOrdersByStatus);
// Route for appending a detail to an order
router.post("/append-detail/:orderId", appendDetailToOrder);
// Route for updating the status of an order detail
router.put("/detail-status/:detailId", updateOrderDetailStatus);

module.exports = router;

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Retrieve a list of orders
 *     description: Returns a list of orders, each with its details including product information, quantity, unit price, and status.
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: A JSON array of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The order ID
 *                     example: 65dcf3fba80f6358c9159ab0
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the order was created
 *                     example: 2024-02-26T20:26:35.616Z
 *                   end_at:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the order was completed or null if still active
 *                     example: null
 *                   orderdetails:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           description: The order detail ID
 *                           example: 65dcf46fa80f6358c9159ab2
 *                         productId:
 *                           type: string
 *                           description: The product identifier
 *                           example: kafka
 *                         quantity:
 *                           type: integer
 *                           description: The quantity of the product ordered
 *                           example: 3
 *                         unitPrice:
 *                           type: number
 *                           format: double
 *                           description: The price per unit of the product
 *                           example: 2
 *                         totalPrice:
 *                           type: number
 *                           format: double
 *                           description: The total price for the product (quantity * unit price)
 *                           example: 6
 *                         status:
 *                           type: string
 *                           description: The status of the order detail
 *                           example: confirmed
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           description: The date and time when the order detail was last updated
 *                           example: 2024-02-27T14:06:35.657Z
 *                   table:
 *                     type: integer
 *                     description: The table number associated with the order
 *                     example: 1
 *
 */
/**
 * @swagger
 * /api/orders/create-order:
 *   post:
 *     summary: create an order (or open table for customers)
 *     description: Returns a list of orders, each with its details including product information, quantity, unit price, and status.
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: A JSON array of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  message:
 *                    type: String
 *                    description: The status of the order detail
 *                    example: Order 65e03f499134ece20fdfcb2f created
 */
/**
 * @swagger
 * /api/orders/detail-status/{detailId}:
 *   put:
 *     summary: Update the status of an order detail
 *     description: >
 *       Updates the status of a specific order detail identified by its detailId.
 *       The status must be one of the following values: "pending", "confirmed", "declined", or "out".
 *     tags:
 *       - Order Details
 *     parameters:
 *       - in: path
 *         name: detailId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the order detail.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: The new status to set for the order detail.
 *                 enum: [pending, confirmed, declined, out]
 *     responses:
 *       200:
 *         description: The status update was successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message indicating the successful update.
 *                   example: "Detail ID 65dd11588f1a7cf579c1be5e status updated"
 *       400:
 *         description: Invalid request (e.g., invalid status value or detailId not found).
 */
/**
 * @swagger
 * /api/orders/orderdetails:
 *   get:
 *     summary: Retrieve a list of order details
 *     description: Fetch a list of order details with status, product ID, quantity, unit price, and total price.
 *     tags:
 *       - Order Details
 *     responses:
 *       200:
 *         description: A list of order details.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                     description: The order status.
 *                     example: pending
 *                   _id:
 *                     type: string
 *                     description: The order detail ID.
 *                     example: 65dcf3c5a80f6358c9159aad
 *                   productId:
 *                     type: string
 *                     description: The product ID associated with the order detail.
 *                     example: 23123lkls
 *                   quantity:
 *                     type: integer
 *                     description: The quantity of the product ordered.
 *                     example: 3
 *                   unitPrice:
 *                     type: number
 *                     format: float
 *                     description: The price per unit of the product.
 *                     example: 2.00
 *                   totalPrice:
 *                     type: number
 *                     format: float
 *                     description: The total price for the quantity of the product ordered.
 *                     example: 6.00
 *                   __v:
 *                     type: integer
 *                     description: Version key.
 *                     example: 0
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: The last update timestamp of the order detail.
 *                     example: '2024-02-27T14:06:35.657Z'
 */
/**
 * @swagger
 * paths:
 *   /api/orders/append-detail/{orderId}:
 *
 *     post:
 *       summary: Add detail to an order
 *       description: This endpoint allows you to add a detail to an existing order.
 *       tags: [Order Details]
 *       parameters:
 *         - in: path
 *           name: orderId
 *           required: true
 *           description: ID of the order to which the detail will be added.
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 productId:
 *                   type: string
 *                   description: ID of the product.
 *                 quantity:
 *                   type: integer
 *                   description: Quantity of the product.
 *                 unitPrice:
 *                   type: number
 *                   format: float
 *                   description: Unit price of the product.
 *                 totalPrice:
 *                   type: number
 *                   format: float
 *                   description: Total price of the order detail.
 *       responses:
 *         '200':
 *           description: Order detail added successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   detail_id:
 *                     type: string
 *                     description: ID of the added order detail.
 */