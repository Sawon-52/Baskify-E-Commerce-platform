import asyncHandler from "../middleware/asyncHandler.js";
import Category from "../models/categoryModel.js";

//@desc     create category
//@route    POST/api/categories
//@access   private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const { category } = req.body;

  if (!category) {
    res.status(400);
    throw new Error("Category Name is Required");
  }

  // Check if the category already exists
  const categoryExists = await Category.findOne({ name: category });
  console.log(categoryExists);
  if (categoryExists) {
    res.status(400);
    throw new Error("Category already exists");
  }

  // Create a new category
  const newCategory = await Category.create({ name: category });
  if (newCategory) {
    res.status(201).json({
      success: true,
      message: "Added Category",
      data: newCategory,
    });
  } else {
    res.status(400);
    throw new Error("Invalid category data");
  }
});

//@desc     Get category
//@route    get/api/categories
//@access   public
const getCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.status(200).json(categories);
});

export { createCategory, getCategory };
