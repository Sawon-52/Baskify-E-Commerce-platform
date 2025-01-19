import mongoose from "mongoose";
import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
import SSLCommerzPayment from "sslcommerz-lts";

//create Unique Transection id
const tran_id = new mongoose.Types.ObjectId().toString();

const paymentCreate = asyncHandler(async (req, res) => {
  //SSlCommerz store
  const store_id = process.env.STORE_ID;
  const store_passwd = process.env.STORE_PASSWD;
  const is_live = false; //true for live, false for sandbox

  const order = await Order.findById(req.params.id);

  const data = {
    total_amount: order?.totalPrice,
    currency: "BDT",
    tran_id: tran_id, // use unique tran_id for each api call
    success_url: `${process.env.BASE_URL}/api/payments/pay/success`,
    fail_url: `${process.env.BASE_URL}/api/payments/pay/fail`,
    cancel_url: `${process.env.BASE_URL}/api/payments/pay/cancel`,
    ipn_url: `${process.env.BASE_URL}/api/payments/pay/ipn`,
    shipping_method: "Courier",
    product_name: "Combined Product",
    product_category: "Combined Category",
    product_profile: "general",
    cus_name: order?.shippingAddress?.firstName,
    cus_email: order?.shippingAddress?.emailAddress,
    cus_add1: order?.shippingAddress?.city,
    cus_add2: order?.shippingAddress?.city,
    cus_city: order?.shippingAddress?.city,
    cus_state: order?.shippingAddress?.city,
    cus_postcode: order?.shippingAddress?.zipCode,
    cus_country: order?.shippingAddress?.country,
    cus_phone: order?.shippingAddress?.phoneNumber,
    ship_name: order?.shippingAddress?.firstName,
    ship_add1: order?.shippingAddress?.city,
    ship_add2: order?.shippingAddress?.city,
    ship_city: order?.shippingAddress?.city,
    ship_state: order?.shippingAddress?.city,
    ship_postcode: order?.shippingAddress?.zipCode,
    ship_country: order?.shippingAddress?.country,
  };

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

    console.log(GatewayPageURL);
  });
});

const paymentSuccess = asyncHandler(async (req, res) => {
  const { tran_id, val_id, amount, card_type, status, store_amount } = req.body;

  const order = await Order.findOne({
    paymentResult: { $exists: true, $ne: null },
    "paymentResult.transactionId": tran_id,
  });

  if (status === "VALID" && parseFloat(order?.totalPrice) === parseFloat(amount)) {
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

    // Redirect with query parameters
    res.redirect(`${process.env.BASE_URL}/orders/${order?._id}?success=true&message=${encodeURIComponent("Payment successful!")}`);
  } else {
    res.redirect(`${process.env.BASE_URL}/orders/${order?._id}?success=false&message=${encodeURIComponent("Payment failed. Please try again.")}`);
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

  res.redirect(`${process.env.BASE_URL}/orders/${order?._id}?success=false&message=Payment canceled`);
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
