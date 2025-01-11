import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import CartItem from "../Components/CartItem";
import CartSummary from "../Components/CartSummary";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  return (
    <div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <div className="min-h-40 md:min-h-96">
            <div role="alert" className="alert alert-info rounded-md ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-6 w-6 shrink-0 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>
                Your cart is empty
                <Link to="/" className="underline text-green ml-6">
                  Go Back
                </Link>
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-10 py-6 shadow-xl border p-4 rounded-sm">
            {/* Cart Section */}
            <div className="flex-1 rounded-lg">
             <h2 className="mb-4 font-semibold">My Products</h2>
              {/* Cart Item */}
              {cartItems.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>
            {/* Summary Section */}
            <div className="w-full md:w-1/3 ">
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
