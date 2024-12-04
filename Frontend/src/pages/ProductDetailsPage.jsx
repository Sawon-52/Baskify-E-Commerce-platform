import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams, useNavigate } from "react-router-dom";
import Rating from "../Components/Rating";
import { BsCart2 } from "react-icons/bs";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductDetails } from "../slices/productDetailsSlice";
import Loader from "../Components/Loader";
import { addToCart } from "../slices/cartSlice";

const ProductDetailsPage = () => {
  const { id: productId } = useParams();
  //quentity state
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product, status, error } = useSelector((state) => state.productDetails);
  useEffect(() => {
    dispatch(fetchProductDetails(productId));
  }, [dispatch, productId]);

  if (status === "loading") return <Loader></Loader>;
  if (status === "failed") return <div>Error: {error}</div>;
  if (!product) return <div>Product not found!</div>;

  const { name, description, image, category, price, rating, numReviews, countInStock } = product;

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <div>
      <NavLink to={"/"}>
        <div className="flex items-center text-base gap-1 mb-4">
          <IoIosArrowRoundBack />
          <p className="text-sm font-bold">Go Back</p>
        </div>
      </NavLink>

      <div className=" grid grid-cols-1 md:grid-cols-3 grid-rows-4 gap-10 min-h-96">
        <div className=" col-span-1 md:col-span-2 row-span-4 ">
          <img src={image} alt={name} className="h-full w-full object-center object-cover rounded-xl" />
        </div>
        <div className="min-h-32 p-0 rounded-none space-y-4 row-span-4">
          <h2 className="card-title font-semibold text-xl text-primary">{name}</h2>
          <h2 className="font-normal text-sm text-secondary ">{description}</h2>
          <Rating value={rating} text={numReviews} />
          <p className="text-secondary text-sm font-semibold">${price}</p>
          <p className="text-secondary text-sm font-semibold">
            {" "}
            <span className="text-primary">Status: </span>
            {`${countInStock > 0 ? "In Stock" : "Out of Stock"}`}
          </p>
          {product.countInStock > 0 && (
            <div className="flex gap-3 items-center">
              <div>
                <p className="text-sm font-semibold ">Quantity:</p>
              </div>
              <select
                className="select select-bordered w-full max-w-xs"
                value={qty}
                onChange={(e) => {
                  setQty(Number(e.target.value));
                }}
              >
                {[...Array(product.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1} className="">
                    {x + 1}
                  </option>
                ))}
              </select>
            </div>
          )}

          <Link>
            <button className="btn w-full bg-primary text-white hover:bg-mintGreen transition-colors duration-300 my-10" disabled={product.countInStock === 0} onClick={addToCartHandler}>
              <BsCart2 /> Add to Cart
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
