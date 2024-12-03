import { useEffect } from "react";
import ProductCard from "../Components/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../slices/productsSlice";
const HomePage = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  console.log(products, status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  // if (status === "loading") {
  //   return <div>Loading...</div>;
  // }

  if (status === "failed") {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div>
        <h2 className="text-xl font-semibold">Welcome to Baskify! Enhance Your shopping experience.</h2>
        <h1 className="text-xl my-4 text-primary font-bold">Latest Product</h1>
        {status === "loading" ? <span className="loading loading-infinity loading-lg "></span> : ""}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-stretch gap-5 ">
        {products.map((product) => (
          <div key={product._id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;
