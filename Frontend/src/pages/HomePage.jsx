import { useEffect } from "react";
import ProductCard from "../Components/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Components/Loader";
import { useParams } from "react-router-dom";
import Paginate from "../Components/paginate";
import { fetchProducts } from "../slices/productsApiSlice";
const HomePage = () => {
  const { pageNumber } = useParams();
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProducts(pageNumber));
  }, [pageNumber]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error: {isError.message}</div>;
  }

  return (
    <>
      <div>
        <h2 className="text-xl font-semibold">Welcome to Baskify! Enhance Your shopping experience.</h2>
        <h1 className="text-xl my-4 text-primary font-bold">Latest Product</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-stretch gap-5 ">
        {data.products?.map((product) => (
          <div key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="flex justify-center my-14">
        <Paginate pages={data.pages} page={data.page} />
      </div>
    </>
  );
};

export default HomePage;
