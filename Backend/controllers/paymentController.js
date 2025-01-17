import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
import mongoose from "mongoose";
import SSLCommerzPayment from "sslcommerz-lts";

// Create unique transaction ID
const tran_id = new mongoose.Types.ObjectId().toString();

const paymentCreate = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  // SSLCommerz store credentials
  const store_id = process.env.STORE_ID;
  const store_passwd = process.env.STORE_PASSWD;
  const is_live = process.env.IS_LIVE; // true for live, false for sandbox

  const data = {
    total_amount: order?.totalPrice || 0,
    currency: "BDT",
    tran_id: tran_id,
    success_url: `${process.env.BASE_URL}/api/payments/pay/success`,
    fail_url: `${process.env.BASE_URL}/api/payments/pay/fail`,
    cancel_url: `${process.env.BASE_URL}/api/payments/pay/cancel`,
    ipn_url: `${process.env.BASE_URL}/api/payments/pay/ipn`,
    shipping_method: "Courier",
    product_name: "Combined Product",
    product_category: "General",
    product_profile: "general",
    cus_name: order?.shippingAddress?.firstName || "Customer",
    cus_email: order?.shippingAddress?.emailAddress || "unknown@example.com",
    cus_add1: order?.shippingAddress?.address || "Unknown Address",
    cus_city: order?.shippingAddress?.city || "Unknown City",
    cus_postcode: order?.shippingAddress?.zipCode || "0000",
    cus_country: order?.shippingAddress?.country || "Bangladesh",
    cus_phone: order?.shippingAddress?.phoneNumber || "0000000000",
    ship_name: order?.shippingAddress?.firstName || "Customer",
    ship_add1: order?.shippingAddress?.address || "Unknown Address",
    ship_city: order?.shippingAddress?.city || "Unknown City",
    ship_postcode: order?.shippingAddress?.zipCode || "0000",
    ship_country: order?.shippingAddress?.country || "Bangladesh",
  };

  // const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  // console.log(store_id, store_passwd, is_live);
  // try {
  //   const apiResponse = await sslcz.init(data);

  //   if (!apiResponse.GatewayPageURL) {
  //     console.error("GatewayPageURL not found:", apiResponse);
  //     return res.status(400).json({
  //       message: "Could not retrieve payment gateway URL",
  //       details: apiResponse,
  //     });
  //   }

  //   // Return the GatewayPageURL
  //   res.send({ url: apiResponse.GatewayPageURL });

  //   // Update the order with the transaction ID
  //   if (order) {
  //     order.paymentResult = {
  //       update_time: Date.now(),
  //       transactionId: tran_id,
  //     };
  //     await order.save();
  //   }
  // } catch (error) {
  //   console.error("SSLCommerz Payment Error:", error.message);
  //   res.status(500).json({ message: "Payment initiation failed", error: error.message });
  // }
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz.init(data).then(async (apiResponse) => {
    let GatewayPageURL = apiResponse.GatewayPageURL;
    res.send({ url: GatewayPageURL });
    //Update new order with the transaction ID (after  payment initiation)
    if (order && GatewayPageURL) {
      order.paymentResult = {
        update_time: Date.now(),
        transactionId: tran_id,
      };

      const updatedOrder = await order.save(); 
    }
  });
});

const paymentSuccess = asyncHandler(async (req, res) => {
  const { tran_id, val_id, amount, card_type, status, store_amount } = req.body;
  const order = await Order.findOne({
    paymentResult: { $exists: true, $ne: null },
    "paymentResult.transactionId": tran_id,
  });

  if (status === "VALID") {
<<<<<<< HEAD
    if (!order) {
      // res.status(404);
      // throw new Error("Order not found");
      res.redirect(`https://baskify-e-commerce-platform-wu0y.onrender.com/orders/${order?._id}?success=false&message=${encodeURIComponent("Payment failed. Order not found")}`);
=======
    // Find the order by transaction ID
    const order = await Order.findOne({
      paymentResult: { $exists: true, $ne: null },
      "paymentResult.transactionId": tran_id,
    });
    console.log(order);
    if (!order) {
      res.status(404);
      throw new Error("Order not found");
>>>>>>> ac70619ca738b4cec5f65cfb9d2361bef459e000
    }

    if (parseFloat(order.totalPrice) !== parseFloat(amount)) {
      res.redirect(`https://baskify-e-commerce-platform-wu0y.onrender.com/orders/${order?._id}?success=false&message=${encodeURIComponent("Payment failed. Amount mismatch")}`);
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: val_id,
      status,
      update_time: Date.now(),
      cardType: card_type,
      storeAmount: store_amount,
    };

    const updatedOrder = await order.save();
    // Redirect with query parameters
    res.redirect(`https://baskify-e-commerce-platform-wu0y.onrender.com/orders/${order?._id}?success=true&message=${encodeURIComponent("Payment successful!")}`);
  } else {
<<<<<<< HEAD
    res.redirect(`https://baskify-e-commerce-platform-wu0y.onrender.com/orders/${tran_id}?success=false&message=${encodeURIComponent("Payment failed. Please try again.")}`);
=======
    res.redirect(`https://baskify-e-commerce-platform-wu0y.onrender.com/?success=false&message=${encodeURIComponent("Payment failed. Please try again.")}`);
>>>>>>> ac70619ca738b4cec5f65cfb9d2361bef459e000
  }
});

const paymentFail = asyncHandler(async (req, res) => {
  const { tran_id } = req.body;

  const order = await Order.findOne({
    paymentResult: { $exists: true, $ne: null },
    "paymentResult.transactionId": tran_id,
  });

  if (!order) {
    res.status(404).json({ message: "Order not found" });
    return;
  }

  order.paymentResult.status = "FAILED";
  await order.save();

  res.redirect(`${process.env.BASE_URL}/orders/${order._id}?success=false&message=Payment failed`);
});

const paymentCancel = asyncHandler(async (req, res) => {
  const { tran_id } = req.body;

  const order = await Order.findOne({
    paymentResult: { $exists: true, $ne: null },
    "paymentResult.transactionId": tran_id,
  });

  if (!order) {
    res.status(404).json({ message: "Order not found" });
    return;
  }

  order.paymentResult.status = "CANCELED";
  await order.save();

  res.redirect(`${process.env.BASE_URL}/orders/${order._id}?success=false&message=Payment canceled`);
});

const paymentIPN = asyncHandler(async (req, res) => {
  const { tran_id, status, val_id, amount, card_type, store_amount } = req.body;

  const order = await Order.findOne({
    paymentResult: { $exists: true, $ne: null },
    "paymentResult.transactionId": tran_id,
  });

  if (!order) {
    res.status(404).json({ message: "Order not found" });
    return;
  }

  if (status === "VALID") {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: val_id,
      status,
      update_time: Date.now(),
      cardType: card_type,
      storeAmount: store_amount,
    };

    await order.save();
    res.status(200).json({ message: "Payment validated successfully" });
  } else {
    order.paymentResult.status = "FAILED";
    await order.save();
    res.status(400).json({ message: "Payment failed" });
  }
});

export { paymentCreate, paymentSuccess, paymentFail, paymentCancel, paymentIPN };
