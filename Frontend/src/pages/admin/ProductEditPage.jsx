import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails, clearProductInfo, updateProduct, uploadProductImage } from "../../slices/productsApiSlice";
import Loader from "../../Components/Loader";
import { toast } from "react-toastify";

const ProductEditPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productInfo, isLoading } = useSelector((state) => state.products);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(fetchProductDetails(productId));
    if (productInfo) {
      setName(productInfo.name);
    }

    // Clear product info on component unmount
    return () => {
      dispatch(clearProductInfo());
    };
  }, [dispatch, productId]);

  useEffect(() => {
    if (productInfo) {
      setName(productInfo.name);
      setPrice(productInfo.price);
      setImage(productInfo.image);
      setBrand(productInfo.brand);
      setCategory(productInfo.category);
      setCountInStock(productInfo.countInStock);
      setDescription(productInfo.description);
    }
  }, [productInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    };
    const result = await dispatch(updateProduct(updatedProduct)).unwrap();
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Product Updated");
      navigate("/admin/productlist");
    }
  };
  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await dispatch(uploadProductImage(formData)).unwrap();
      toast.success(res.messages);
      setImage(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <h2 className="text-xl font-bold ">Edit Product</h2>
          <div className="flex justify-center  ">
            <div className="card w-full max-w-md">
              <form onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="label font-medium">
                    <span className="label-text">Product Name</span>
                  </label>
                  <input type="text" placeholder="Enter Product Name" className="input input-bordered input-sm" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-control">
                  <label className="label font-medium">
                    <span className="label-text">Price</span>
                  </label>
                  <input type="text" placeholder="Enter Price" className="input input-bordered input-sm" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="form-control">
                  <label className="label font-medium">
                    <span className="label-text">Image</span>
                  </label>
                  <input type="text" placeholder="Enter Image url" className="input input-bordered input-sm my-1" value={image} onChange={(e) => setImage(e.target.value)} />
                  <input type="file" className="file-input file-input-bordered file-input-xs w-full " onChange={uploadFileHandler} />
                </div>

                <div className="form-control">
                  <label className="label font-medium">
                    <span className="label-text">Brand</span>
                  </label>
                  <input type="text" placeholder="Enter Brand" className="input input-bordered input-sm" value={brand} onChange={(e) => setBrand(e.target.value)} />
                </div>
                <div className="form-control">
                  <label className="label font-medium">
                    <span className="label-text">Category</span>
                  </label>
                  <input type="text" placeholder="Enter Category" className="input input-bordered input-sm" value={category} onChange={(e) => setCategory(e.target.value)} />
                </div>
                <div className="form-control">
                  <label className="label font-medium">
                    <span className="label-text">Stock</span>
                  </label>
                  <input type="number" placeholder="Enter Stock" className="input input-bordered input-sm" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
                </div>
                <div>
                  <div className="form-control mb-4">
                    <label className="label font-medium">
                      <span className="label-text">Description</span>
                    </label>
                    <textarea placeholder="Enter Description" className="textarea textarea-bordered textarea-sm w-full text-sm " value={description} onChange={(e) => setDescription(e.target.value)} />
                  </div>
                </div>
                <div className="form-control mt-6">
                  <button className="btn  bg-primary text-white hover:bg-black">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductEditPage;
