import { useEffect } from "react";
import ProductCard from "../Components/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Components/Loader";
import { Link, NavLink, useParams } from "react-router-dom";
import Paginate from "../Components/paginate";
import { fetchProducts } from "../slices/productsApiSlice";
import ProductCarousel from "../Components/ProductCarousel";
import { IoIosArrowRoundBack } from "react-icons/io";
const HomePage = () => {
  const { pageNumber, keyword } = useParams();
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProducts({ pageNumber, keyword }));
  }, [pageNumber, keyword]);

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <NavLink to={"/"}>
          <div className="flex items-center text-base gap-1 mb-4">
            <IoIosArrowRoundBack />
            <p className="text-sm font-bold">Go Back</p>
          </div>
        </NavLink>
      )}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <p>isError</p>
      ) : (
        <div>
          <div>
            <h1 className="text-xl my-4 text-primary font-bold">Latest Product</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-stretch gap-5 min-h-screen">
            {data.products?.map((product) => (
              <div key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="flex justify-center my-14">
            <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ""} />
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
