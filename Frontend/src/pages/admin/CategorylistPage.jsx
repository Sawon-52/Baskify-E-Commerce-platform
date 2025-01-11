import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../Components/Modal";
import { RxCross2 } from "react-icons/rx";
const CategorylistPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState("");

  const [categories, setCategories] = useState([{ name: "Electronics" }, { name: "Men Cloth" }, { name: "Woman Cloth" }, { name: "Sports" }, { name: "Cosmetics" }, { name: "Electronics" }, { name: "Men Cloth" }, { name: "Woman Cloth" }, { name: "Sports" }, { name: "Cosmetics" }]);

  const handleAddCategory = (e) => {
    e.preventDefault();
    setModalOpen(false);
    const newCategory = { name: category };
    console.log(newCategory);
    setCategories((preCategory) => [...preCategory, newCategory]);
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

        <div className="flex  flex-wrap gap-2">
          {categories.map((category, index) => (
            <Link key={index} className="border p-2 text-sm font-medium">
              {category.name}
            </Link>
          ))}
        </div>
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
              <input type="text" placeholder="Category Name" value={category} onChange={(e) => setCategory(e.target.value)} className="input input-bordered" required />
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
