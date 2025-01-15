import { useEffect } from "react";
import ProductCard from "../Components/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Components/Loader";
import { Link, NavLink, useParams } from "react-router-dom";
import Paginate from "../Components/paginate";
import { fetchProducts } from "../slices/productsApiSlice";
import { getCategory } from "../slices/categoryApiSlice";
import ProductCarousel from "../Components/ProductCarousel";
import { IoIosArrowRoundBack } from "react-icons/io";
import Meta from "../Components/Meta";

const HomePage = () => {
  const dispatch = useDispatch();
  const params = useParams() || {};
  const { pageNumber = "1", keyword = "", category } = params;

  const { data, isLoading, isError } = useSelector((state) => state.products);
  const { categories, isLoading: getCategoriesLoading, isError: categoriesLoading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchProducts({ pageNumber, keyword, category }));
    dispatch(getCategory());
  }, [pageNumber, keyword, category]);

  const handleCategory = (categoryName) => {
    dispatch(fetchProducts({ pageNumber, keyword, category: categoryName }));
  };

  const handleAllProduct = () => {
    dispatch(fetchProducts());
  };

  return (
    <>
      <Meta title={"Welcome to Baskify"}></Meta>
      <div className="min-h-screen">
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

        <section className="my-16">
          <div>
            <h2 className="text-2xl my-4 text-primary font-medium">Featured Categories</h2>
          </div>

          <div>
            {getCategoriesLoading ? (
              <Loader title="Categories Loading...." />
            ) : (
              <div className="flex gap-3 flex-wrap ">
                <Link to={`/`} className="border border-primary p-3 px-4 text-sm font-semibold" onClick={handleAllProduct}>
                  All
                </Link>
                {categories?.map((category) => (
                  <Link key={category._id} to={`/category/${category.name}`} onClick={() => handleCategory(category.name)} className="border border-primary p-3 px-4 text-sm font-semibold hover:bg-mintGreen hover:text-white hover:border-white">
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        <div className="my-10">
          <div className="my-4">
            <h1 className="text-2xl  text-primary font-medium">Latest Product</h1>
          </div>
          {isLoading ? (
            <Loader title="Product Loading..." />
          ) : isError ? (
            <div className="flex justify-center items-center">
              <p className="my-10 text-red-500 font-semibold">{isError.message}</p>
            </div>
          ) : (
            <div>
              <div className="p-3 bg-white-50 rounded-md shadow-xl my-5 pb-8">
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
        </div>
      </div>
    </>
  );
};

export default HomePage;
