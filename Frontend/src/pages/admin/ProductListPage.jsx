import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, createProduct, fetchProductDetails } from "../../slices/productsApiSlice";
import Loader from "../../Components/Loader";
import { IoCreate } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ProductListPage = () => {
  const { allProducts: products, isLoading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProduct = async () => {
      await dispatch(fetchProducts()).unwrap();
    };
    fetchProduct();
  }, []);

  const handleProductDelete = (id) => {
    console.log("Delete this product-" + id);
  };

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await dispatch(createProduct()).unwrap();
        await dispatch(fetchProducts()).unwrap();
      } catch (error) {
        toast.error(error.message || error.error);
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold">Products</h1>
        <button className=" btn btn-sm  bg-primary text-white rounded-lg hover:bg-primary" onClick={createProductHandler}>
          <IoCreate /> Create Product
        </button>
      </div>
      <div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="overflow-x-auto">
            <table className="table px-0">
              {/* head */}
              <thead>
                <tr className="text-primary">
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody className="align-middle">
                {products?.map((product, index) => (
                  <tr key={index} className="font-medium">
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>$ {product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td className="flex text-xl cursor-pointer h-full">
                      <Link to={`/admin/product/${product._id}/edit`}>
                        <IoCreate className="text-green-400" />
                      </Link>

                      <Link>
                        <MdDelete className="text-red-400" onClick={() => handleProductDelete(product._id)} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductListPage;
