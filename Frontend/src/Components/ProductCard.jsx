import React from "react";

const ProductCard = ({ product }) => {
  const { name, image, description, brand, category, price, countInStock, rating, numReviews } = product;
  return (
    <div>
      <div className="card bg-base-100 w-60 min-h-96 shadow-xl">
        <figure>
          <img className="cursor-pointer hover:scale-125 transition duration-300 ease-linear" src={image} alt={name} />
        </figure>
        <div className="card-body px-4">
          <h3 className="text-sm text-secondary">{category}</h3>
          <h2 className="card-title font-semibold text-base text-primary hover:underline hover:text-mintGreen duration-150 cursor-pointer">{name}</h2>
          {/* <p className="text-secondary text-sm font-medium text-justify">{description}</p> */}
          <div>
            <p className="text-primary text-base font-semibold">${price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
