import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTopProducts } from "../slices/productsApiSlice";
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIosNew } from "react-icons/md";
import { Link } from "react-router-dom";
import { TbCurrencyTaka } from "react-icons/tb";

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const { topProducts, isLoading, isError } = useSelector((state) => state.products);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(getTopProducts());
  }, [dispatch]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % topProducts.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + topProducts.length) % topProducts.length);
  };

  return (
    <>
      <div className="relative w-full overflow-hidden flex items-center rounded-md">
        <button onClick={handlePrev} className="absolute left-0 top-1/2 transform -translate-y-1/2  text-primary p-2 z-10">
          <MdArrowBackIosNew />
        </button>
        <div className="flex transition-transform duration-500 ease-in-out w-full" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {topProducts.map((item, index) => (
            <div key={index} className="w-full flex-shrink-0 flex flex-col md:flex-row items-center bg-gray-100">
              <div className="w-full  md:w-1/2 ">
                <img src={item.image} alt={item.name} className="w-full h-72 object-cover" />
              </div>
              <div className=" w-full md:w-1/2 p-8">
                <h2 className="text-3xl font-bold mb-4">{item.name}</h2>
                <p className=" text-xl  font-medium text-red-500 flex items-center">
                  Price: <TbCurrencyTaka /> {item.price} TK
                </p>
                <Link to={`/product/${item._id}`}>
                  <p className=" text-base font-medium text-right my-10 hover:underline">Go Explore</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <button onClick={handleNext} className="absolute right-0 top-1/2 transform -translate-y-1/2 text-primary p-2 z-10">
          <MdArrowForwardIos />
        </button>
      </div>
    </>
  );
};

export default ProductCarousel;
