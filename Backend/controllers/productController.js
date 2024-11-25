import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productsModel.js";

//@desc     Fetch all products
//@route    GET/api/products
//@access   Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//@desc     Fetch a Products By ID
//@route    GET/api/products/:id
//@access   Public
const getProductsById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  }
  res.status(404);
  throw new Error("Resource not found");
});

export { getProducts, getProductsById };
