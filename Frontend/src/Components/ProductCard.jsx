import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const ProductCard = ({ product }) => {
  const { name, image, category, price, rating, numReviews } = product;
  return (
    <div>
      <div className="card bg-base-100 w-60 min-h-96 shadow-xl">
        <figure>
          <Link to={`/product/${product._id}`}>
            <img className="cursor-pointer hover:scale-125 transition duration-500 ease-linear" src={image} alt={name} />
          </Link>
        </figure>
        <div className="card-body px-4">
          <h3 className="text-sm text-secondary">{category}</h3>
          <Link to={`/product/${product._id}`}>
            <h2 className="card-title font-semibold text-sm text-primary hover:underline transition duration-150 cursor-pointer">{name}</h2>
          </Link>
          <div>
            <Rating value={rating} text={`${numReviews} reviews`} />
          </div>
          <div>
            <p className="text-secondary text-base font-semibold">${price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
