import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../Components/Modal";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, getCategory } from "../../slices/categoryApiSlice";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader";

const CategorylistPage = () => {
  const dispatch = useDispatch();
  const { category: newCategory } = useSelector((state) => state.category);
  const { categories, isLoading: getCategoriesLoading, isError } = useSelector((state) => state.category);
  const [isModalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState("");

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch, category]);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (category.trim() === "") {
      alert("Category Name is required!");
      return;
    }
    setModalOpen(false);
    try {
      await dispatch(createCategory({ category })).unwrap();
      toast.success(newCategory.message);
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }

    dispatch(getCategory());
  };
  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-base font-bold">All Categories </h2>
          </div>
          <div>
            <button className="btn btn-sm bg-primary text-white hover:bg-mintGreen" onClick={() => setModalOpen(true)}>
              Add Category
            </button>
          </div>
        </div>

        {getCategoriesLoading ? (
          <Loader />
        ) : (
          <div className="flex  flex-wrap gap-2">
            {categories?.map((category, index) => (
              <Link key={index} className="border p-2 text-sm font-medium">
                {category.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* modal for add category  */}
      <Modal isOpen={isModalOpen}>
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold ">Add Category</h2>
          <button className="text-xl text-bold" onClick={() => setModalOpen(false)}>
            <RxCross2 />
          </button>
        </div>

        <div className="card  w-full max-w-sm shrink-0">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Category Name</span>
              </label>
              <input type="text" required placeholder="Category Name" value={category} onChange={(e) => setCategory(e.target.value)} className="input input-bordered" />
            </div>
            <div className="form-control mt-6">
              <button className="btn  text-white bg-primary hover:bg-mintGreen" onClick={handleAddCategory}>
                Add
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default CategorylistPage;
