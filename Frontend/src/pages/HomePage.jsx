import React from "react";
import products from "../products";
import { PiVanLight } from "react-icons/pi";
import ProductCard from "../Components/ProductCard";

const HomePage = () => {
  return (
    <>
      {products.map((product) =>(
        <div key={product._id}>
          <ProductCard product={product} />
        </div>
      ))}
    </>
  );
};

export default HomePage;
