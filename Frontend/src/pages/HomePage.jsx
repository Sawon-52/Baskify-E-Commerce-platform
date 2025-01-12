import { useEffect } from "react";
import ProductCard from "../Components/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Components/Loader";
import { Link, NavLink, useParams } from "react-router-dom";
import Paginate from "../Components/paginate";
import { fetchProducts } from "../slices/productsApiSlice";
import ProductCarousel from "../Components/ProductCarousel";
import { IoIosArrowRoundBack } from "react-icons/io";
import Meta from "../Components/Meta";
const HomePage = () => {
  const dispatch = useDispatch();
  const params = useParams() || {};
  const { pageNumber = "1", keyword = "" } = params;
  const { data, isLoading, isError } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ pageNumber, keyword }));
  }, [pageNumber, keyword]);

  return (
    <>
      <Meta title={"Welcome to Baskify"}></Meta>
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
        <p>Error:{isError.message || isError.error}</p>
      ) : (
        <div>
          <div className="p-3 bg-white-50 rounded-md shadow-xl my-5 pb-8">
            <div>
              <h1 className="text-xl my-4 text-primary font-bold">Latest Product</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {data.products?.map((product) => (
                <div key={product._id}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
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
