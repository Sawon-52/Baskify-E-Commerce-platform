import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams, useNavigate } from "react-router-dom";
import Rating from "../Components/Rating";
import { BsCart2 } from "react-icons/bs";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductDetails, createReview, getReview } from "../slices/productsApiSlice";
import Loader from "../Components/Loader";
import { addToCart } from "../slices/cartSlice";
import { toast } from "react-toastify";
import Meta from "../Components/Meta";
import { TbCurrencyTaka } from "react-icons/tb";

const ProductDetailsPage = () => {
  const [rating, setRating] = useState();
  const [comment, setComment] = useState("");
  const { id: productId } = useParams();

  //quentity state
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productInfo, isLoading, isError, reviews } = useSelector((state) => state.products);
  const userInfo = localStorage.getItem("userInfo");
  // const { userInfo } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchProductDetails(productId));
    dispatch(getReview(productId));
  }, [dispatch, productId]);

  if (isLoading) return <Loader></Loader>;
  // if (isError) return <div>Error: {isError.message}</div>;
  if (!productInfo) return <div>Product not found!</div>;

  const { name, description, image, category, brand, price, rating: productRating, numReviews, countInStock } = productInfo;

  const addToCartHandler = () => {
    dispatch(addToCart({ ...productInfo, qty }));
    navigate("/cart");
  };

  // rating and comment section
  const handleRatingChange = (event) => {
    setRating(event.target.value); // Update the selected rating
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value); // Update the comment
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload
    console.log("Rating:", rating);
    console.log("Comment:", comment);
    try {
      await dispatch(createReview({ productId, rating, comment })).unwrap();
      toast.success("Review Submitted");
      await dispatch(fetchProductDetails(productId)).unwrap();
      // await dispatch(getReview()).unwrap();
    } catch (error) {
      await dispatch(fetchProductDetails(productId)).unwrap();
      toast.error(error?.message || error.error);
    }

    // You can send the data to a server here (e.g., using fetch or Axios)
    // Reset form after submission
    setRating(0);
    setComment("");
  };

  return (
    <>
      <Meta title={name} />
      <NavLink to={"/"}>
        <div className="flex items-center text-base gap-1 mb-4">
          <IoIosArrowRoundBack />
          <p className="text-sm font-bold">Go Back</p>
        </div>
      </NavLink>

      <div className="flex flex-col md:flex-row justify-between gap-5 rounded-md border shadow-md p-3 w-full">
        <div className="w-full md:w-3/4 ">
          <img src={image} alt={name} className="w-full h-full object-cover rounded-md" />
        </div>

        <div className="w-full md:w-1/2">
          <div className=" space-y-4 rounded-lg text-sm">
            <h2 className="card-title font-semibold text-xl text-primary">{name}</h2>
            <div className="flex gap-1">
              <p>
                <span className="font-semibold">Category:</span> <span className="text-blue-500">{category}</span> <span className="mx-1 text-primary">|</span>
              </p>
              <p>
                <span className="font-semibold">Brand:</span> <span className="text-blue-500">{brand}</span>
              </p>
            </div>

            <div className="flex justify-between">
              <Rating value={productRating} />
              <div>
                <span className="text-secondary font-medium">{`${numReviews} reviews`}</span>
              </div>
            </div>

            <div className="text-sm font-semibold flex items-center text-primary">
              <p>Price: </p>
              <TbCurrencyTaka className="text-base" />
              {price} Tk
            </div>

            {countInStock > 0 ? (
              <p className="text-secondary text-sm font-semibold">
                <span className="text-primary">Status: </span>
                <span className="text-green-400">In Stock</span>
              </p>
            ) : (
              <p className="text-secondary text-sm font-semibold">
                <span className="text-primary">Status: </span>
                <span>Out of Stock</span>
              </p>
            )}

            {productInfo.countInStock > 0 && (
              <div className="flex gap-3 items-center">
                <div>
                  <p className="text-sm font-semibold ">Quantity:</p>
                </div>
                <select
                  className="select select-bordered  w-full max-w-xs"
                  value={qty}
                  onChange={(e) => {
                    setQty(Number(e.target.value));
                  }}
                >
                  {[...Array(productInfo.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1} className="">
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <Link>
              <button className="btn w-full bg-primary text-white hover:bg-mintGreen transition-colors duration-300 mt-5" disabled={productInfo.countInStock === 0} onClick={addToCartHandler}>
                <BsCart2 /> Add to Cart
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* Description  */}
      <div className="rounded-md border shadow-md px-3 py-5 my-5">
        <h2 className="font-semibold mb-2">Description</h2>
        <p className="text-secondary text-sm">{description}</p>
      </div>

      {/* Reviews Section */}
      <div className="mt-6 rounded-md border shadow-md p-3">
        <h3 className="text-base font-semibold text-gray-800 mb-2">Reviews</h3>
        {numReviews === 0 ? (
          <p className="text-center text-gray-500 my-4 text-sm">What a wonderful place! Be the first to leave a review.</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className="p-4 mb-4 rounded-md shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="text-xl">
                  <Rating value={review.rating} />
                </div>
                <span className="text-gray-500 text-sm">
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <p className="text-gray-700 font-semibold mb-1">{review.name}</p>
              <p className="text-gray-700 text-sm">{review.comment}</p>
            </div>
          ))
        )}
      </div>

      {/* rating and comment section */}
      <div className="max-w-full p-4 border  rounded-md shadow-xl mt-10">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Submit Your Review</h2>
        {userInfo ? (
          <form onSubmit={handleSubmit}>
            <label className="font-medium ">Rating</label>
            <div className="rating rating-sm flex  mb-4 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <input key={star} type="radio" name="rating-6" value={star} className={`mask mask-star-2 ${rating >= star ? "bg-orange-400" : "bg-gray-400"}`} onChange={handleRatingChange} />
              ))}
            </div>
            <label className="font-medium">Comment</label>
            <textarea value={comment} onChange={handleCommentChange} placeholder="Write your comment here..." className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-700 focus:border-transparent mb-4" rows="4"></textarea>

            <button type="submit" className=" btn  bg-primary hover:bg-primary text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
              Submit
            </button>
          </form>
        ) : (
          <p className="text-base">
            please
            <Link to="/login" className="text-blue-500 underline mx-2">
              sign in
            </Link>
            to write a review
          </p>
        )}
      </div>
    </>
  );
};

export default ProductDetailsPage;
