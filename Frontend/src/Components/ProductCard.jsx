import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { TbCurrencyTaka } from "react-icons/tb";

const ProductCard = ({ product }) => {
  const { name, image, category, price, rating, numReviews } = product;
  return (
    <div>
      <div className="card w-full border rounded-md">
        <figure className=" h-44">
          <Link to={`/product/${product._id}`}>
            <img className="cursor-pointer hover:scale-125 transition duration-500 ease-linear h-full" src={image} alt={name} />
          </Link>
        </figure>
        <div className="card-body px-6 py-10 md:py-6">
          <h3 className="text-sm text-secondary">{category}</h3>
          <Link to={`/product/${product._id}`}>
            <h2 className="card-title font-semibold text-sm text-primary hover:underline  hover:decoration-mintGreen transition duration-100 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap line-clamp-2">{`${name}...`}</h2>
          </Link>
          <div>
            <Rating value={rating} text={`${numReviews} `} />
          </div>
          <div>
            <p className="text-secondary text-base font-semibold flex items-center">
              <TbCurrencyTaka className="text-xl font-bold" />
              {price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
