import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, createProduct, deleteProduct } from "../../slices/productsApiSlice";
import Loader from "../../Components/Loader";
import { IoCreate } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Paginate from "../../Components/Paginate";
import { TbCurrencyTaka } from "react-icons/tb";

const ProductListPage = () => {
  const params = useParams() || {};
  const { pageNumber = "1", keyword = "" } = params;

  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ pageNumber, keyword }));
  }, [pageNumber, keyword]);

  const handleProductDelete = async (id) => {
    if (window.confirm("Are you Sure?")) {
      try {
        const res = await dispatch(deleteProduct(id)).unwrap();
        toast.success(res.message);
        await dispatch(fetchProducts({ pageNumber, keyword })).unwrap();
      } catch (error) {
        toast.error(error?.message || error.error);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await dispatch(createProduct()).unwrap();
        toast.success("Successfully create product");
        await dispatch(fetchProducts({ pageNumber, keyword })).unwrap();
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
                {data.products?.map((product, index) => (
                  <tr key={index} className="font-medium">
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>
                      <div className="flex items-center gap-1 justify-center h-full">
                        <TbCurrencyTaka /> {product.price}
                      </div>
                    </td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <div className="flex text-xl cursor-pointer h-full gap-2">
                        <Link to={`/admin/product/${product._id}/edit`}>
                          <IoCreate className="text-green-400" />
                        </Link>

                        <Link>
                          <MdDelete className="text-red-400" onClick={() => handleProductDelete(product._id)} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="my-10">
        <Paginate pages={data.pages} page={data.page} isAdmin={true} keyword={keyword ? keyword : ""} />
      </div>
    </>
  );
};

export default ProductListPage;
