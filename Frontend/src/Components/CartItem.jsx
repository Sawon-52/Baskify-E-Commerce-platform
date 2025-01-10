import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import { removeFromCart } from "../slices/cartSlice";
import { TbCurrencyTaka } from "react-icons/tb";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };
  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };
  return (
    <div>
      <div className="flex items-center justify-between border-b pb-4 mb-4 text-sm">
        <div className="flex items-center gap-4">
          <img src={item?.image} alt="Product" className="w-24 h-24 object-cover rounded-lg" />
          <div>
            <h3 className="font-medium">{item?.name}</h3>
            <p className="text-sm text-gray-500 flex gap-1 items-center">
              <TbCurrencyTaka className="font-medium" />
              {item?.price} Tk | <span className="text-green-600">{`${item?.countInStock > 0 ? "In Stock" : "Out of Stock"}`}</span>
            </p>
            <div className="flex items-center gap-2 mt-2">
              <h2 className="font-medium">Quantity:</h2>
              <select className="select select-bordered select-sm w-full max-w-[80px] py-0" value={item?.qty} onChange={(e) => addToCartHandler(item, Number(e.target.value))}>
                {[...Array(item?.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1} className="">
                    {x + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end justify-between h-full space-y-10">
          <div>
            <p className="font-semibold flex gap-1 items-center">
              <TbCurrencyTaka />
              {item?.price} Tk
            </p>
          </div>
          <div onClick={() => removeFromCartHandler(item?._id)}>
            <button className="text-2xl text-red-400">
              <AiFillDelete />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
