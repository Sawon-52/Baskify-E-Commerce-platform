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

//@desc     create product
//@route    POST/api/products
//@access   private/admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "sample name",
    price: 0,
    user: req.user._id,
    image: "/image/sample.jpg",
    brand: "sample brand",
    category: "sample category",
    countInStock: 0,
    numReviews: 0,
    description: "sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//@desc     Delete  product
//@route    DELETE/api/products/:id
//@access   private/admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "product deleted" });
  } else {
    res.status(404);
    throw new Error("Resources not found");
  }
});

//@desc     Updated product
//@route    PUT/api/products
//@access   private/admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updateProduct);
  } else {
    res.status(404);
    throw new Error("Resources not found");
  }
});

export { getProducts, getProductsById, createProduct, updateProduct, deleteProduct };
