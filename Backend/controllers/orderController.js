import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

//@desc     Create new order
//@route    POST/api/orders
//@access   private
const addOrderItems = asyncHandler(async (req, res) => {
  res.send("add order items");
});

//@desc     Get logged in user Order
//@route    GET/api/orders/mine
//@access   private
const getMyOrders = asyncHandler(async (req, res) => {
  res.send("get my orders");
});

//@desc     Get logged in user Order
//@route    GET/api/orders/:id
//@access   private
const getOrderById = asyncHandler(async (req, res) => {
  res.send("get Order by Id");
});

//@desc     update order to paid
//@route    PUT/api/orders/:id/pay
//@access   private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("update order to pay");
});

//@desc     update order to delivered
//@route    PUT/api/orders/:id/deliver
//@access   private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("update order to delivered");
});

//@desc     get all orders
//@route    GET/api/orders
//@access   private/Admin
const getOrders = asyncHandler(async (req, res) => {
  res.send("get all orders");
});

export { addOrderItems, getMyOrders, getOrderById, updateOrderToPaid, updateOrderToDelivered, getOrders };
