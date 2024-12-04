import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CartSammary = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { itemsPrice, shippingPrice, taxPrice, totalPrice } = cart;
  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping')
  };
  return (
    <div className="rounded-lg text-sm shadow-lg p-5 min-h-max">
      <h2 className="text-xl font-semibold mb-4">Delivery</h2>
      <div className="border-t pt-4 font-medium">
        <div className="flex justify-between mb-2">
          <p>Subtotal</p>
          <p>${itemsPrice}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>Discount</p>
          <p>-$0.0</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>Delivery</p>
          <p>${shippingPrice}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p>Tax</p>
          <p>+${taxPrice}</p>
        </div>
        <div className="flex justify-between font-semibold text-lg">
          <p>Total</p>
          <p>${totalPrice}</p>
        </div>
      </div>

      <button className=" btn w-full mt-4 py-2 bg-primary text-white rounded-lg" onClick={checkoutHandler}>Proceed to checkout</button>
      <Link to="/">
        <button className=" btn w-full mt-2 py-2 bg-gray-200 rounded-lg">Continue shopping</button>
      </Link>
    </div>
  );
};

export default CartSammary;
