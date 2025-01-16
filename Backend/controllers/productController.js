import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productsModel.js";

//@desc     Fetch all products
//@route    GET/api/products
//@access   Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;

  //sarching products
  const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: "i" } } : {};

  const categoryFilter = req.query.category ? { category: req.query.category } : {};

  const count = await Product.countDocuments({ ...keyword, ...categoryFilter });

  const products = await Product.find({ ...keyword, ...categoryFilter })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  if (products.length > 0) {
    // If products are found, send the response
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } else {
    // If no products are found, send a 404 status and a custom message
    res.status(404);
    throw new Error("No products found");
  }
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
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Resources not found");
  }
});

//@desc     create a new review
//@route    POST/api/products/:id/reviews
//@access   private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find((review) => review.user.toString() === req.user._id.toString());
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already review");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;
    await product.save();
    res.status(201).json({ message: "Review Added" });
  } else {
    res.status(404);
    throw new Error("Resource Not Found");
  }
});

//@desc     Fetch all reviews
//@route    GET/api/reviews
//@access   Public
const getReviews = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate("reviews");
  res.json(product.reviews);
});

//@desc     get top rated product
//@route    GET/api/products/top
//@access   Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.status(200).json(products);
});

export { getProducts, getProductsById, createProduct, updateProduct, deleteProduct, createProductReview, getReviews, getTopProducts };
