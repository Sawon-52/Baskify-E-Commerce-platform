import { useEffect } from "react";
import ProductCard from "../Components/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../slices/productsApiSlice";
import Loader from "../Components/Loader";
const HomePage = () => {
  const dispatch = useDispatch();
  const { allProducts, isLoading, isError } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts()).unwrap();
  }, []);

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
        {allProducts?.map((product) => (
          <div key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;
