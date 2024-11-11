import React from "react";
import products from "../products";
import { PiVanLight } from "react-icons/pi";
import ProductCard from "../Components/ProductCard";

const HomePage = () => {
  return (
    <>
      <div>
        <h2 className="text-xl font-semibold">Welcome to Baskify! Enhance Your shoping experience.</h2>
        <h1 className="text-xl my-4 text-primary font-bold">Latest Product</h1>
      </div>
      <div className="grid grid-cols-4 justify-between gap-4">
        {products.map((product) => (
          <div key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;
