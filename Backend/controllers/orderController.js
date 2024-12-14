import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

//@desc     Create new order
//@route    POST/api/orders
//@access   private
const addOrderItems = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    try {
      const sanitizedOrderItems = orderItems
        .filter((item) => item && item._id) // Filter out null, undefined, or items without _id
        .map((x) => ({ ...x, product: x._id, _id: undefined }));
        
      const order = new Order({
        orderItems: sanitizedOrderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Order creation failed", error: error.message });
    }
  }
});

//@desc     Get logged in user Order
//@route    GET/api/orders/mine
//@access   private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

//@desc     Get logged in user Order
//@route    GET/api/orders/:id
//@access   private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
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